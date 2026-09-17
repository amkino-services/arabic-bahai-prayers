document.addEventListener("DOMContentLoaded", () => {
  const locationInput = document.getElementById("sunset-location");
  const locationButton = document.getElementById("use-current-location");
  const dateInput = document.getElementById("sunset-date");
  const result = document.getElementById("sunset-result");

  let latitude = null;
  let longitude = null;

  // Use today's local date by default.
  const today = new Date();
  const localToday =
    `${today.getFullYear()}-` +
    `${String(today.getMonth() + 1).padStart(2, "0")}-` +
    `${String(today.getDate()).padStart(2, "0")}`;

  dateInput.value = localToday;

  locationButton.addEventListener("click", () => {
    if (!navigator.geolocation) {
      result.textContent = "المتصفح لا يدعم تحديد الموقع.";
      return;
    }

    locationButton.disabled = true;
    locationButton.textContent = "جارٍ تحديد الموقع...";

    navigator.geolocation.getCurrentPosition(
      (position) => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        locationInput.value =
          `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;

        result.textContent = "تم تحديد الموقع ✓";

        locationButton.disabled = false;
        locationButton.textContent = "استخدام موقعي الحالي";
      },

      () => {
        result.textContent =
          "تعذر تحديد الموقع. يرجى السماح بالوصول إلى موقعك.";

        locationButton.disabled = false;
        locationButton.textContent = "استخدام موقعي الحالي";
      },

      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 600000
      }
    );
  });
});

/*
 * Calculate sunset using the NOAA solar-position method.
 * Returns the sunset as decimal UTC hours.
 */
function calculateSunsetUTC(dateString, latitude, longitude) {
  const [year, month, day] = dateString.split("-").map(Number);

  const date = new Date(Date.UTC(year, month - 1, day));

  const startOfYear = new Date(Date.UTC(year, 0, 0));
  const dayOfYear = Math.floor(
    (date - startOfYear) / 86400000
  );

  const longitudeHour = longitude / 15;

  // Approximate time for sunset.
  const t = dayOfYear + ((18 - longitudeHour) / 24);

  // Sun's mean anomaly.
  const M = (0.9856 * t) - 3.289;

  // Sun's true longitude.
  let L =
    M +
    (1.916 * Math.sin(M * Math.PI / 180)) +
    (0.020 * Math.sin(2 * M * Math.PI / 180)) +
    282.634;

  L = ((L % 360) + 360) % 360;

  // Sun's right ascension.
  let RA = Math.atan(
    0.91764 * Math.tan(L * Math.PI / 180)
  ) * 180 / Math.PI;

  RA = ((RA % 360) + 360) % 360;

  const Lquadrant = Math.floor(L / 90) * 90;
  const RAquadrant = Math.floor(RA / 90) * 90;

  RA = RA + (Lquadrant - RAquadrant);
  RA /= 15;

  // Sun's declination.
  const sinDec =
    0.39782 * Math.sin(L * Math.PI / 180);

  const cosDec =
    Math.cos(Math.asin(sinDec));

  // Official sunset zenith: 90°50′.
  const zenith = 90.833;

  const cosH =
    (
      Math.cos(zenith * Math.PI / 180) -
      (sinDec * Math.sin(latitude * Math.PI / 180))
    ) /
    (
      cosDec * Math.cos(latitude * Math.PI / 180)
    );

  if (cosH > 1 || cosH < -1) {
    return null;
  }

  // Sunset hour angle.
  let H =
    Math.acos(cosH) * 180 / Math.PI;

  H /= 15;

  // Local mean time.
  const T =
    H +
    RA -
    (0.06571 * t) -
    6.622;

  // Convert to UTC.
  // Keep the value unwrapped so Date.UTC() can preserve
  // a previous/next UTC calendar-day offset when necessary.
  const UT = T - longitudeHour;

  return UT;
}

// Convert decimal UTC hours into a Date object and format it
// using the browser's local timezone.
function formatSunsetLocal(dateString, utcHours, timeZone) {
  const [year, month, day] = dateString.split("-").map(Number);

  const hours = Math.floor(utcHours);
  const minutesDecimal = (utcHours - hours) * 60;
  const minutes = Math.floor(minutesDecimal);
  const seconds = Math.round((minutesDecimal - minutes) * 60);

  const sunset = new Date(
    Date.UTC(year, month - 1, day, hours, minutes, seconds)
  );

  return new Intl.DateTimeFormat("ar", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone
  }).format(sunset);
}


// Connect the calculation button.
document.addEventListener("DOMContentLoaded", () => {
  const locationInput = document.getElementById("sunset-location");
  const dateInput = document.getElementById("sunset-date");
  const calculateButton = document.getElementById("calculate-sunset");
  const result = document.getElementById("sunset-result");
  const sunriseResult = document.getElementById("sunrise-result");

  calculateButton.addEventListener("click", async () => {
    if (!dateInput.value) {
      result.textContent = "يرجى اختيار التاريخ.";
      return;
    }

    calculateButton.disabled = true;
    calculateButton.textContent = "جارٍ تحديد الموقع...";

    try {
      let latitude;
      let longitude;

      const coordinates = locationInput.value
        .split(",")
        .map(value => Number(value.trim()));

      if (
        coordinates.length === 2 &&
        Number.isFinite(coordinates[0]) &&
        Number.isFinite(coordinates[1])
      ) {
        [latitude, longitude] = coordinates;
      } else {
        result.textContent = "جارٍ البحث عن الموقع...";

        const place = await geocodeLocation(
          locationInput.value
        );

        latitude = place.latitude;
        longitude = place.longitude;
      }

      const sunriseUTC = calculateSunriseUTC(
        dateInput.value,
        latitude,
        longitude
      );

      const sunsetUTC = calculateSunsetUTC(
        dateInput.value,
        latitude,
        longitude
      );

      if (sunsetUTC === null) {
        result.textContent =
          "لا يمكن حساب الغروب لهذا الموقع في هذا التاريخ.";
        return;
      }

      const timeZone = await getTimeZone(
        latitude,
        longitude
      );

      sunriseResult.textContent = sunriseUTC === null
        ? "لا يوجد شروق"
        : formatSunsetLocal(
            dateInput.value,
            sunriseUTC,
            timeZone
          );

      result.textContent = formatSunsetLocal(
        dateInput.value,
        sunsetUTC,
        timeZone
      );

    } catch (error) {
      result.textContent = error.message;
    } finally {
      calculateButton.disabled = false;
      calculateButton.textContent = "معرفة أوقات الشروق والغروب";
    }
  });
});


/*
 * Convert a city or place name into geographic coordinates.
 * Supports Arabic and other languages through OpenStreetMap Nominatim.
 */
async function geocodeLocation(locationName) {
  const query = locationName.trim();

  if (!query) {
    throw new Error("يرجى إدخال اسم المدينة أو الموقع.");
  }

  const url =
    "https://nominatim.openstreetmap.org/search?" +
    new URLSearchParams({
      q: query,
      format: "jsonv2",
      limit: "1",
      addressdetails: "1",
      "accept-language": "ar"
    });

  const response = await fetch(url, {
    headers: {
      Accept: "application/json"
    }
  });

  if (!response.ok) {
    throw new Error("تعذر البحث عن الموقع.");
  }

  const places = await response.json();

  if (!places.length) {
    throw new Error("لم يتم العثور على الموقع.");
  }

  const place = places[0];

  return {
    latitude: Number(place.lat),
    longitude: Number(place.lon),
    name: place.display_name
  };
}


/*
 * Find the IANA timezone for geographic coordinates.
 * Example: Rabat → Africa/Casablanca
 */
async function getTimeZone(latitude, longitude) {
  const url =
    "https://api.open-meteo.com/v1/forecast?" +
    new URLSearchParams({
      latitude: String(latitude),
      longitude: String(longitude),
      timezone: "auto",
      forecast_days: "1"
    });

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("تعذر تحديد المنطقة الزمنية للموقع.");
  }

  const data = await response.json();

  if (!data.timezone) {
    throw new Error("تعذر تحديد المنطقة الزمنية للموقع.");
  }

  return data.timezone;
}

/*
 * Calculate sunrise using the same NOAA solar-position method.
 * Returns the sunrise as decimal UTC hours.
 */
function calculateSunriseUTC(dateString, latitude, longitude) {
  const [year, month, day] = dateString.split("-").map(Number);

  const date = new Date(Date.UTC(year, month - 1, day));
  const startOfYear = new Date(Date.UTC(year, 0, 0));

  const dayOfYear = Math.floor(
    (date - startOfYear) / 86400000
  );

  const longitudeHour = longitude / 15;

  // Approximate time for sunrise.
  const t = dayOfYear + ((6 - longitudeHour) / 24);

  // Sun's mean anomaly.
  const M = (0.9856 * t) - 3.289;

  // Sun's true longitude.
  let L =
    M +
    (1.916 * Math.sin(M * Math.PI / 180)) +
    (0.020 * Math.sin(2 * M * Math.PI / 180)) +
    282.634;

  L = ((L % 360) + 360) % 360;

  // Sun's right ascension.
  let RA = Math.atan(
    0.91764 * Math.tan(L * Math.PI / 180)
  ) * 180 / Math.PI;

  RA = ((RA % 360) + 360) % 360;

  const Lquadrant = Math.floor(L / 90) * 90;
  const RAquadrant = Math.floor(RA / 90) * 90;

  RA = RA + (Lquadrant - RAquadrant);
  RA /= 15;

  // Sun's declination.
  const sinDec =
    0.39782 * Math.sin(L * Math.PI / 180);

  const cosDec =
    Math.cos(Math.asin(sinDec));

  // Official sunrise zenith: 90°50′.
  const zenith = 90.833;

  const cosH =
    (
      Math.cos(zenith * Math.PI / 180) -
      (sinDec * Math.sin(latitude * Math.PI / 180))
    ) /
    (
      cosDec * Math.cos(latitude * Math.PI / 180)
    );

  // No normal sunrise for this location/date.
  if (cosH > 1 || cosH < -1) {
    return null;
  }

  // Sunrise uses the rising (negative) hour angle.
  let H =
    360 - (Math.acos(cosH) * 180 / Math.PI);

  H /= 15;

  // Local mean time.
  const T =
    H +
    RA -
    (0.06571 * t) -
    6.622;

  // Keep UTC unwrapped so Date.UTC() preserves
  // previous/next UTC calendar-day offsets.
  const UT = T - longitudeHour;

  return UT;
}
