export function calculateCenter(points: { lat: number, lng: number }[]) {
  const total = points.length;
  if (total === 0) return null;

  const sumLat = points.reduce((acc, p) => acc + p.lat, 0);
  const sumLng = points.reduce((acc, p) => acc + p.lng, 0);

  return {
    lat: sumLat / total,
    lng: sumLng / total
  };
}
