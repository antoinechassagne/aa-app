export function getCurrentGeolocation() {
  return new Promise((resolve, reject) => {
    if (!isGeolocationSupported()) {
      return null;
    }
    return navigator.geolocation.getCurrentPosition(
      (position) => {
        if (position && position.coords && position.coords.latitude && position.coords.longitude) {
          resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        } else {
          reject();
        }
      },
      (error) => reject(error),
      {
        enableHighAccuracy: true,
      }
    );
  });
}

export function isGeolocationSupported() {
  return "geolocation" in navigator;
}
