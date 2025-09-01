import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef, EventEmitter,
  inject,
  Input, OnChanges,
  OnInit, Output,
  ViewChild,
} from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable, MatTableDataSource,
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { IIncident } from '../../../core/services/incidents/incidents.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, debounceTime } from 'rxjs';

@Component({
  selector: 'ci-incidents-table',
  imports: [
    MatFormField,
    MatInput,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatNoDataRow,
    MatPaginator,
    DatePipe,
    MatSortHeader,
    MatLabel
  ],
  templateUrl: './incidents-table.component.html',
  styleUrl: './incidents-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IncidentsTableComponent implements OnInit, AfterViewInit, OnChanges {
  @Input({ required: true }) public incidents!: IIncident[];
  @Output() rowClicked = new EventEmitter<{ incident: IIncident, target: EventTarget | null }>();
  private destroyRef = inject(DestroyRef);
  displayedColumns: string[] = ['id', 'title', 'category', 'severity', 'createdAt', 'latlng'];
  dataSource!: MatTableDataSource<IIncident>;
  private filter$ = new BehaviorSubject('');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.filter$.asObservable()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        debounceTime(300),
      )
      .subscribe(filterValue => {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      })
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.incidents);
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }

    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  ngOnChanges(changes: any) {
    console.log(changes);
    if (!changes?.incidents.firstChange) {
      this.dataSource.data = this.incidents;
    }
  }



  applyFilter(e: KeyboardEvent) {
    const filterValue = (e.target as HTMLInputElement).value;
    this.filter$.next(filterValue);
  }

  onRowClick(row: IIncident, e: PointerEvent) {
    this.rowClicked.emit({
      incident: row,
      target: e.target
    })
  }
}
