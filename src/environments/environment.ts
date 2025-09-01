import { algoliasearch } from 'algoliasearch';

export const environment = {
  production: true,
  mapboxGLAccessToken: 'pk.eyJ1Ijoia2dlcmEiLCJhIjoiY21ldm9uY2tkMDJlajJsczFhYXp1dnZpMSJ9.QHppW-Di6rFHb96N5xa6vw',
  firebaseConfig: {
    cloudStoreUrl: 'https://firestore.googleapis.com/v1/projects/traffic-incidents-api/databases/(default)/documents',
    apiKey: 'AIzaSyAuUFE7MxxQPwKVCwO2tui_VgTCAPYv6iU',
    projectId: 'traffic-incidents-api'
  },
  algoliasearchConfig: {
    appId: 'B6I28GIV9E',
    searchOnlyKey: 'e3d2f7a2beaeec281fe31c4f5665491a'
  }
}
