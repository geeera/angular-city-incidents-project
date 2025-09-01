import { IIncident } from '../../../../core/services/incidents/incidents.service';

export function incidentToGeFeature(incident: IIncident) {
  return {
    type: 'Feature',
    properties: {
      ...incident
    },
    geometry: {
      type: 'Point',
      coordinates: [incident.location.lng, incident.location.lat]
    }
  }
}
