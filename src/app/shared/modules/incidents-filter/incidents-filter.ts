import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatButton, MatFabButton, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatSelect, MatOption } from '@angular/material/select';
import { TitleCasePipe } from '@angular/common';
import { MatInput } from '@angular/material/input';
import {
  MatDatepickerModule,
} from '@angular/material/datepicker';

type FilterData = Partial<{
  category: string[];
  severity: number;
  range: {
    from: Date;
    to: Date;
  }
}>

export type ReturnFilterData = Partial<{
  category: string[];
  severity: number;
  from: Date;
  to: Date;
}>

@Component({
  selector: 'ci-incidents-filter',
  imports: [
    MatIconModule,
    MatMenu,
    MatMenuTrigger,
    MatFormField,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    TitleCasePipe,
    MatInput,
    MatButton,
    MatLabel,
    MatDatepickerModule,
    MatSuffix,
    MatFabButton,
  ],
  templateUrl: './incidents-filter.html',
  styleUrl: './incidents-filter.scss'
})
export class IncidentsFilter {
  @ViewChild(MatMenu) menu!: MatMenu;
  @Output() filteredApply = new EventEmitter<FilterData>();
  form = new FormGroup({
    category: new FormControl<string[] | null>(null),
    severity: new FormControl<number | null>(null, [Validators.min(1), Validators.max(5)]),
    range: new FormGroup({
      from: new FormControl<Date | null>(null),
      to: new FormControl<Date | null>(null)
    }),
  })

  protected categories = [
    'accident',
    'hazard',
    'traffic',
    'roadwork',
    'weather',
    'closure',
    'other'
  ];

  onSubmit(e: any) {
    const values = this.checkValues(this.form.value as FilterData);
    if (this.form.invalid || !values) {
      return
    }

    this.filteredApply.emit(values);
    this.menu.closed.emit();
  }

  checkValues(values: FilterData) {
    const formattedValues = {
      category: values.category,
      severity: values.severity || null,
      ...values.range
    }
    return Object.fromEntries(Object.entries(formattedValues)
      .filter(([_, condition]) => !!condition));
  }

  onSeverityUpdate(e: Event) {
    const target = e.target as HTMLInputElement
    let value = Number(target.value);
    const max= Number(target.max);
    const min= Number(target.min);

    if (!value) {
      this.form.controls.severity.setValue(null);
      return
    }

    if (value > max) {
      value = max
    }

    if (value < min) {
      value = min
    }

    this.form.controls.severity.setValue(Number(value));
  }

  onClear(e: PointerEvent) {
    e.stopPropagation();
    this.form.reset();
    this.form.markAsPristine();
  }
}
