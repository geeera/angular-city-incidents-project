import { IncidentToGeoFeatureCollectionPipe } from './incident-to-geo-feature-collection-pipe';

describe('IncidentToGeoFeatureCollectionPipe', () => {
  it('create an instance', () => {
    const pipe = new IncidentToGeoFeatureCollectionPipe();
    expect(pipe).toBeTruthy();
  });
});
