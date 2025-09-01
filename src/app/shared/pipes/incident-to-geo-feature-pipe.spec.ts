import { IncidentToGeoFeaturePipe } from './incident-to-geo-feature-pipe';

describe('IncidentToGeoFeaturePipe', () => {
  it('create an instance', () => {
    const pipe = new IncidentToGeoFeaturePipe();
    expect(pipe).toBeTruthy();
  });
});
