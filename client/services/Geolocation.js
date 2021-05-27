export default function () {
  return new Promise((resolve) => {
    const result = {
      supported: isGeolocationSupported(),
      enabled: true,
      error: false,
      location: null,
    };
    getCurrentGeolocation()
      .then(({ latitude, longitude }) => {
        result.location = { latitude, longitude };
      })
      .catch((error) => {
        if (error.code === 1) {
          result.enabled = false;
        } else {
          result.error = true;
        }
      })
      .finally(() => {
        resolve(result);
      });
  });
}

function getCurrentGeolocation() {
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

function isGeolocationSupported() {
  return "geolocation" in navigator;
}
