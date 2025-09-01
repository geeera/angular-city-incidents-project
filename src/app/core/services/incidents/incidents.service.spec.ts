import { TestBed } from '@angular/core/testing';

import { IIncident, IncidentsService } from './incidents.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';

describe('IncidentsService', () => {
  let service: IncidentsService;
  let httpMock: HttpTestingController;

  const firestoreDocMock = {
    name: 'projects/demo/databases/(default)/documents/incidents/123',
    fields: {
      title: { stringValue: 'Accident on street' },
      description: { stringValue: 'Car crash with road block' },
      category: { stringValue: 'Accident' },
      severity: { integerValue: '2' },
      iconCategory: { integerValue: '1' },
      createdAt: { timestampValue: '2025-08-30T10:00:00Z' },
      location: {
        mapValue: {
          fields: {
            lat: { doubleValue: 50.45 },
            lng: { doubleValue: 30.52 }
          }
        }
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IncidentsService]
    });
    service = TestBed.inject(IncidentsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should parse Firestore document correctly', () => {
    const result = (service as any).parseFirestoreDoc(firestoreDocMock);
    expect(result).toEqual({
      id: '123',
      title: 'Accident on street',
      description: 'Car crash with road block',
      category: 'Accident',
      severity: 2,
      iconCategory: 1,
      createdAt: new Date('2025-08-30T10:00:00Z'),
      location: { lat: 50.45, lng: 30.52 }
    } as IIncident);
  });

  it('should fetch all incidents and call initAlgoliaSearch', (done) => {
    service.listOfAllIncidents$().subscribe((incidents) => {
      expect(incidents.length).toBe(1);
      expect(incidents[0].id).toBe('123');
      done();
    });

    const req = httpMock.expectOne(environment.firebaseConfig.cloudStoreUrl + '/incidents');
    expect(req.request.method).toBe('GET');
    req.flush({ documents: [firestoreDocMock] });
  });

  it('should fetch incident by ID', (done) => {
    service.loadIncidentById$('123').subscribe((incident) => {
      expect(incident.id).toBe('123');
      expect(incident.title).toBe('Accident on street');
      done();
    });

    const req = httpMock.expectOne(`${environment.firebaseConfig.cloudStoreUrl}/incidents/123`);
    expect(req.request.method).toBe('GET');
    req.flush(firestoreDocMock);
  });
});
