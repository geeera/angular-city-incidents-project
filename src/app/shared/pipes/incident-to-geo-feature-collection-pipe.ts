import { Pipe, PipeTransform } from '@angular/core';
import { IIncident } from '../../core/services/incidents/incidents.service';
import { incidentToGeFeature } from '../utils/geo/functions/incedent-to-ge-feature';

@Pipe({
  name: 'incidentToGeoFeatureCollection'
})
export class IncidentToGeoFeatureCollectionPipe implements PipeTransform {

  transform(values: IIncident[]): any {
    const features = values.map(value => incidentToGeFeature(value));
    return {
      type: 'FeatureCollection',
      features: features
    };
  }

}
