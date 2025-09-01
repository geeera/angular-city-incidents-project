import { Pipe, PipeTransform } from '@angular/core';
import { IIncident } from '../../core/services/incidents/incidents.service';
import { incidentToGeFeature } from '../utils/geo/functions/incedent-to-ge-feature';

interface IGeoFeature {
  type: 'Feature';
  properties?: Record<string, any>;
  geometry: {
    type: 'Point',
    coordinates: [
      number,
      number
    ]
  }
}

@Pipe({
  name: 'incidentToGeoFeature'
})
export class IncidentToGeoFeaturePipe implements PipeTransform {

  transform(value: IIncident): any {
    return incidentToGeFeature(value);
  }
}
