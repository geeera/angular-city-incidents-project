import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { map, Observable } from 'rxjs';

export interface IIncident {
  id: string;
  category: string;
  createdAt: Date
  description: string;
  iconCategory: number;
  location: {
    lat: number;
    lng: number;
  }
  severity: number;
  title: string;
}

export const ICONS_MAP: Record<number, string> = {
  1: 'warning',
  2: 'construction',
  3: 'traffic',
  4: 'block',
  5: 'report_problem',
  6: 'cloud',
  7: 'event',
  8: 'info'
};



@Injectable({
  providedIn: 'root'
})
export class IncidentsService {
  private http = inject(HttpClient);

  constructor() { }

  private parseFirestoreDoc(doc: any): IIncident {
    return {
      id: doc.name.split('/').pop(),
      title: doc.fields.title.stringValue,
      description: doc.fields.description.stringValue,
      category: doc.fields.category.stringValue,
      severity: parseInt(doc.fields.severity.integerValue, 10),
      iconCategory: parseInt(doc.fields.iconCategory.integerValue, 10),
      location: {
        lat: doc.fields.location.mapValue.fields.lat.doubleValue,
        lng: doc.fields.location.mapValue.fields.lng.doubleValue
      },
      createdAt: new Date(doc.fields.createdAt.timestampValue)
    };
  }

  listOfAllIncidents$(): Observable<IIncident[]> {
    return this.http.get(environment.firebaseCloudStoreUrl + '/incidents').pipe(
      map((collection: any) => {
        const incidents: Record<string, IIncident>[] = collection.documents;
        return incidents.map((incidentRecord) => {
          return this.parseFirestoreDoc(incidentRecord)
        });
      })
    );
  }

  loadIncidentById$(id: string): Observable<IIncident> {
    return this.http.get(`${environment.firebaseCloudStoreUrl}/incidents/${id}`).pipe(
      map(doc => {
        console.log(doc);
        return this.parseFirestoreDoc(doc);
      })
    )
  }
}
