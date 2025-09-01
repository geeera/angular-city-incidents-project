import { Component, inject, OnInit } from '@angular/core';
import { MapComponent } from '../../shared/modules/map/map.component';
import { IncidentsTableComponent } from '../../shared/modules/incidents-table/incidents-table.component';
import { IIncident, IncidentsService } from '../../core/services/incidents/incidents.service';
import { BehaviorSubject, catchError, combineLatest, map, Observable, throwError } from 'rxjs';
import { calculateCenter } from '../../shared/utils/geo/functions/calc-center';
import { AsyncPipe } from '@angular/common';
import { IncidentsFilter, ReturnFilterData } from '../../shared/modules/incidents-filter/incidents-filter';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarService } from '../../core/services/snackbar/snackbar.service';

@Component({
  selector: 'ci-home',
  imports: [
    MapComponent,
    IncidentsTableComponent,
    AsyncPipe,
    IncidentsFilter,
    MatFabButton,
    MatIcon,
    MatProgressSpinner,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private incidentsService = inject(IncidentsService);
  private snackbarService = inject(SnackbarService);
  viewData$!: Observable<{
    filteredIncidents: IIncident[];
    center: [number, number];
    zoom: number;
    selectedIncident: IIncident | null
  }>;

  private filterSub$ = new BehaviorSubject<ReturnFilterData | null>(null);
  get filter$() {
    return this.filterSub$.asObservable();
  }

  private selectedIncidentSub$ = new BehaviorSubject<IIncident | null>(null);
  get selectedIncident$() {
    return this.selectedIncidentSub$.asObservable();
  }

  ngOnInit() {
    const incidents$ = this.incidentsService.listOfAllIncidents$().pipe(
      catchError((error: HttpErrorResponse) => {
        this.snackbarService.openErrorSnack(error.message || 'Loading was failed');
        return throwError(error);
      })
    );
    const filteredIncidents$ = combineLatest([incidents$, this.filter$]).pipe(
      map(([incidents, filters]) => {
        return incidents.filter((incident) => {
          if (!filters) {
            return true
          }

          const isCategoryMatched = filters?.category && filters.category.includes(incident.category.toLocaleLowerCase());
          const isSeverityMatched = !!filters?.severity && incident.severity === filters.severity;
          const isCreatedAtMore = filters?.from
            && incident.createdAt >= filters?.from;
          const isCreatedAtLess = filters?.to
            && incident.createdAt <= filters?.to;

          const mapWithConditions: Record<keyof ReturnFilterData, boolean | undefined> = {
            category: isCategoryMatched,
            severity: isSeverityMatched,
            from: isCreatedAtMore,
            to: isCreatedAtLess,
          }

          const isValid = Object.keys(filters).reduce((total, key) => {
            if (mapWithConditions.hasOwnProperty(key)) {
              return total && !!mapWithConditions[key as keyof ReturnFilterData]
            }
            return total
          }, true)

          return isValid;
        })
      })
    )

    const center$ = filteredIncidents$.pipe(
      map((incidents) => {
        const points = incidents.map(incident => incident.location);
        return calculateCenter(points)
      })
    );

    this.viewData$ = combineLatest([filteredIncidents$, center$, this.selectedIncident$]).pipe(
      map(([filteredIncidents, center, selectedIncident]) => {
        const controlledCenter: [number, number] = selectedIncident
          ? [selectedIncident.location.lng, selectedIncident.location.lat]
          : center ? [center?.lng, center?.lat] : [0, 0]
        return {
          filteredIncidents,
          center: controlledCenter,
          zoom: selectedIncident ? 20 : 15,
          selectedIncident: selectedIncident
        }
      })
    )
  }

  handleFilter(data: Partial<ReturnFilterData>) {
    this.filterSub$.next(data);
  }

  zoomToIncident(data: { incident: IIncident; target: EventTarget | null }) {
    this.selectedIncidentSub$.next(data.incident);
  }

  clearSelectedIncident() {
    this.selectedIncidentSub$.next(null);
  }
}
