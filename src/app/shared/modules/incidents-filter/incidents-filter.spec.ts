import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentsFilter } from './incidents-filter';
import { provideNativeDateAdapter } from '@angular/material/core';

describe('IncidentsFilter', () => {
  let component: IncidentsFilter;
  let fixture: ComponentFixture<IncidentsFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidentsFilter],
      providers: [provideNativeDateAdapter()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncidentsFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not allow severity less than 1 or greater than 5', () => {
    const severity = component.form.get('severity');

    severity?.setValue(0);
    expect(severity?.valid).toBeFalse();

    severity?.setValue(6);
    expect(severity?.valid).toBeFalse();

    severity?.setValue(3);
    expect(severity?.valid).toBeTrue();
  });

  it('should filter out empty values', () => {
    const values = {
      category: ['accident'],
      severity: null,
      range: { from: null, to: null }
    };
    const filtered = component.checkValues(values as any);
    expect(filtered).toEqual({ category: ['accident'] });
  });

  it('should emit filteredApply when form is valid', () => {
    spyOn(component.filteredApply, 'emit');

    component.form.setValue({
      category: ['hazard'],
      severity: 3,
      range: { from: null, to: null }
    });

    component.onSubmit(new Event('submit'));
    expect(component.filteredApply.emit).toHaveBeenCalledWith({
      category: ['hazard'],
      severity: 3
    });
  });

  it('should clamp severity value between min and max', () => {
    const input = { target: { value: '7', min: '1', max: '5' } } as unknown as Event;
    component.onSeverityUpdate(input);
    expect(component.form.controls.severity.value).toBe(5);

    const inputLow = { target: { value: '-1', min: '1', max: '5' } } as unknown as Event;
    component.onSeverityUpdate(inputLow);
    expect(component.form.controls.severity.value).toBe(1);
  });

  it('should reset the form onClear', () => {
    component.form.setValue({
      category: ['hazard'],
      severity: 2,
      range: {
        from: new Date(),
        to: new Date()
      }
    })

    const event = new PointerEvent('click');
    component.onClear(event);

    expect(component.form.pristine).toBeTrue();
    expect(component.form.value.category).toBeNull();
    expect(component.form.value.severity).toBeNull();
  });
});
