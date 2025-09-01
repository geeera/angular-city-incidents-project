import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentsFilter } from './incidents-filter';

describe('IncidentsFilter', () => {
  let component: IncidentsFilter;
  let fixture: ComponentFixture<IncidentsFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidentsFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncidentsFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
