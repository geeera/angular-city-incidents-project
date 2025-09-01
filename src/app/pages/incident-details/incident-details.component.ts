import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ICONS_MAP, IIncident, IncidentsService } from '../../core/services/incidents/incidents.service';
import { combineLatest, filter, map, Observable, switchMap } from 'rxjs';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'ci-incident-details',
  imports: [
    MatFabButton,
    MatIcon,
    RouterLink,
    DatePipe,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    AsyncPipe,
  ],
  templateUrl: './incident-details.component.html',
  styleUrl: './incident-details.component.scss'
})
export class IncidentDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private incidentsService = inject(IncidentsService);

  viewData$!: Observable<{
    incident: IIncident;
  }>;

  ngOnInit() {
    const incidentId$ = this.route.params.pipe(
      filter(params => params['id']),
      map(params => params['id'])
    );

    const incident$ = incidentId$.pipe(
      switchMap(incidentId => this.incidentsService.loadIncidentById$(incidentId))
    );

    this.viewData$ = combineLatest([incident$]).pipe(
      map(([incident]) => {
        return {
          incident: incident
        }
      }),
    )
  }

  protected readonly ICONS_MAP = ICONS_MAP;
}
