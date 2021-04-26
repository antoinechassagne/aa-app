export function getLocation() {
  return new Promise((resolve, reject) => {
    if (!isGeolocationSupported()) {
      return null;
    }
    return navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => reject(error)
    );
  });
}

export function isGeolocationSupported() {
  return "geolocation" in navigator;
}
