const badiMonths = [
  "بهاء",
  "جلال",
  "جمال",
  "العظمة",
  "النور",
  "الرحمة",
  "الكلمات",
  "الكمال",
  "الأسماء",
  "العزة",
  "المشيئة",
  "العلم",
  "القدرة",
  "القول",
  "المسائل",
  "الشرف",
  "السلطان",
  "الملك",
  "العلاء"
];

/*
 * Naw-Rúz correspondence from:
 * "Bahá’í Dates 172 to 221 B.E."
 * Bahá’í World Centre.
 */
const nawRuzDates = {
  172: "2015-03-21",
  173: "2016-03-20",
  174: "2017-03-20",
  175: "2018-03-21",
  176: "2019-03-21",
  177: "2020-03-20",
  178: "2021-03-20",
  179: "2022-03-21",
  180: "2023-03-21",
  181: "2024-03-20",
  182: "2025-03-20",
  183: "2026-03-21",
  184: "2027-03-21",
  185: "2028-03-20",
  186: "2029-03-20",
  187: "2030-03-20",
  188: "2031-03-21",
  189: "2032-03-20",
  190: "2033-03-20",
  191: "2034-03-20",
  192: "2035-03-21",
  193: "2036-03-20",
  194: "2037-03-20",
  195: "2038-03-20",
  196: "2039-03-21",
  197: "2040-03-20",
  198: "2041-03-20",
  199: "2042-03-20",
  200: "2043-03-21",
  201: "2044-03-20",
  202: "2045-03-20",
  203: "2046-03-20",
  204: "2047-03-21",
  205: "2048-03-20",
  206: "2049-03-20",
  207: "2050-03-20",
  208: "2051-03-21",
  209: "2052-03-20",
  210: "2053-03-20",
  211: "2054-03-20",
  212: "2055-03-21",
  213: "2056-03-20",
  214: "2057-03-20",
  215: "2058-03-20",
  216: "2059-03-20",
  217: "2060-03-20",
  218: "2061-03-20",
  219: "2062-03-20",
  220: "2063-03-20",
  221: "2064-03-20"
};

const DAY_MS = 86400000;

function utcDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function daysBetween(a, b) {
  return Math.round((b - a) / DAY_MS);
}

function getBadiYearForGregorian(date) {
  const years = Object.keys(nawRuzDates)
    .map(Number)
    .sort((a, b) => a - b);

  for (let i = years.length - 1; i >= 0; i--) {
    const year = years[i];

    if (date >= utcDate(nawRuzDates[year])) {
      return year;
    }
  }

  return null;
}

function getIntercalaryDays(year) {
  const nextNawRuz = nawRuzDates[year + 1];

  if (!nextNawRuz) {
    return null;
  }

  const start = utcDate(nawRuzDates[year]);
  const end = utcDate(nextNawRuz);

  return daysBetween(start, end) - 361;
}

function gregorianToBadi(value) {
  const date = utcDate(value);
  const year = getBadiYearForGregorian(date);

  if (!year || !nawRuzDates[year + 1]) {
    throw new Error("التاريخ خارج النطاق المتاح في الجدول المعتمد.");
  }

  const start = utcDate(nawRuzDates[year]);
  const offset = daysBetween(start, date);

  if (offset < 342) {
    const monthIndex = Math.floor(offset / 19);

    return {
      year,
      month: monthIndex + 1,
      monthName: badiMonths[monthIndex],
      day: (offset % 19) + 1
    };
  }

  const intercalaryDays = getIntercalaryDays(year);

  if (offset < 342 + intercalaryDays) {
    return {
      year,
      month: 0,
      monthName: "أيام الهاء",
      day: offset - 342 + 1
    };
  }

  return {
    year,
    month: 19,
    monthName: badiMonths[18],
    day: offset - 342 - intercalaryDays + 1
  };
}

const dateInput = document.getElementById("gregorian-date");
const convertButton = document.querySelector(".converter-button");
const result = document.querySelector(".converter-result strong");

convertButton.addEventListener("click", () => {
  if (!dateInput.value) {
    result.textContent = "يرجى اختيار تاريخ";
    return;
  }

  try {
    const badi = gregorianToBadi(dateInput.value);

    result.textContent =
      `${badi.day} ${badi.monthName} ${badi.year} ب.إ.`;
  } catch (error) {
    result.textContent = error.message;
  }
});

/* ---------- Badíʿ → Gregorian ---------- */

function addDays(date, days) {
  return new Date(date.getTime() + (days * DAY_MS));
}

function formatGregorianArabic(date) {
  return new Intl.DateTimeFormat("ar", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC"
  }).format(date);
}

function badiToGregorian(year, month, day) {
  year = Number(year);
  month = Number(month);
  day = Number(day);

  if (!nawRuzDates[year] || !nawRuzDates[year + 1]) {
    throw new Error("السنة خارج النطاق المتاح في الجدول المعتمد.");
  }

  if (!Number.isInteger(day) || day < 1) {
    throw new Error("يرجى إدخال يوم صحيح.");
  }

  const intercalaryDays = getIntercalaryDays(year);
  let offset;

  if (month === 0) {
    if (day > intercalaryDays) {
      throw new Error(`أيام الهاء في هذه السنة ${intercalaryDays} أيام.`);
    }

    offset = 342 + day - 1;

  } else if (month >= 1 && month <= 18) {
    if (day > 19) {
      throw new Error("كل شهر بهائي يحتوي على 19 يوماً.");
    }

    offset = ((month - 1) * 19) + day - 1;

  } else if (month === 19) {
    if (day > 19) {
      throw new Error("شهر العلاء يحتوي على 19 يوماً.");
    }

    offset = 342 + intercalaryDays + day - 1;

  } else {
    throw new Error("الشهر البهائي غير صحيح.");
  }

  return addDays(utcDate(nawRuzDates[year]), offset);
}


/* ---------- Interface switching ---------- */

const tabs = document.querySelectorAll(".converter-tab");
const converterCard = document.querySelector(".converter-card");

const gregorianInterface = converterCard.innerHTML;

const badiMonthOptions = badiMonths
  .map((name, index) =>
    `<option value="${index + 1}">${index + 1} — ${name}</option>`
  )
  .join("");

function showGregorianToBadi() {
  tabs[0].classList.add("active");
  tabs[1].classList.remove("active");

  const gregorianYears = Array.from(
    { length: 50 },
    (_, index) => 2015 + index
  );

  const gregorianMonths = [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر"
  ];

  converterCard.innerHTML = `
    <div class="badi-input-grid">

      <div>
        <label for="gregorian-year">السنة الميلادية</label>

        <select id="gregorian-year" class="converter-date-input">
          ${gregorianYears
            .map(year => `<option value="${year}">${year}</option>`)
            .join("")}
        </select>
      </div>

      <div>
        <label for="gregorian-month">الشهر</label>

        <select id="gregorian-month" class="converter-date-input">
          ${gregorianMonths
            .map((name, index) =>
              `<option value="${index + 1}">${name}</option>`
            )
            .join("")}
        </select>
      </div>

      <div>
        <label for="gregorian-day">اليوم</label>

        <select id="gregorian-day" class="converter-date-input"></select>
      </div>

    </div>

    <button class="primary-btn converter-button" type="button">
      تحويل التاريخ
    </button>

    <div class="converter-result">
      <span>التاريخ البهائي</span>
      <strong>—</strong>
    </div>
  `;

  const yearInput = document.getElementById("gregorian-year");
  const monthInput = document.getElementById("gregorian-month");
  const dayInput = document.getElementById("gregorian-day");
  const button = converterCard.querySelector(".converter-button");
  const output = converterCard.querySelector(".converter-result strong");

  yearInput.value = "2026";
  monthInput.value = "3";

  function updateGregorianDays() {
    const year = Number(yearInput.value);
    const month = Number(monthInput.value);

    const maximum = new Date(
      Date.UTC(year, month, 0)
    ).getUTCDate();

    const previousDay = Number(dayInput.value) || 1;

    dayInput.innerHTML = "";

    for (let day = 1; day <= maximum; day++) {
      const option = document.createElement("option");
      option.value = day;
      option.textContent = day;
      dayInput.appendChild(option);
    }

    dayInput.value = String(Math.min(previousDay, maximum));
  }

  yearInput.addEventListener("change", updateGregorianDays);
  monthInput.addEventListener("change", updateGregorianDays);

  updateGregorianDays();

  button.addEventListener("click", () => {
    try {
      const year = yearInput.value;
      const month = String(monthInput.value).padStart(2, "0");
      const day = String(dayInput.value).padStart(2, "0");

      const badi = gregorianToBadi(
        `${year}-${month}-${day}`
      );

      output.textContent =
        `${badi.day} ${badi.monthName} ${badi.year} ب.إ.`;

    } catch (error) {
      output.textContent = error.message;
    }
  });
}

function showBadiToGregorian() {
  tabs[1].classList.add("active");
  tabs[0].classList.remove("active");

  converterCard.innerHTML = `
    <div class="badi-input-grid">

      <div>
        <label for="badi-year">السنة البهائية</label>

        <select id="badi-year" class="converter-date-input">
          ${Object.keys(nawRuzDates)
            .map(Number)
            .filter(year => nawRuzDates[year + 1])
            .map(year => `<option value="${year}">${year}</option>`)
            .join("")}
        </select>
      </div>

      <div>
        <label for="badi-month">الشهر</label>

        <select id="badi-month" class="converter-date-input">
          ${badiMonthOptions}
          <option value="0">أيام الهاء</option>
        </select>
      </div>

      <div>
        <label for="badi-day">اليوم</label>

        <select id="badi-day" class="converter-date-input"></select>
      </div>

    </div>

    <button class="primary-btn converter-button" type="button">
      تحويل التاريخ
    </button>

    <div class="converter-result">
      <span>التاريخ الميلادي</span>
      <strong>—</strong>
    </div>
  `;

  const yearInput = document.getElementById("badi-year");
  const monthInput = document.getElementById("badi-month");
  const dayInput = document.getElementById("badi-day");
  const button = converterCard.querySelector(".converter-button");
  const output = converterCard.querySelector(".converter-result strong");

  yearInput.value = "183";

  function updateDayOptions() {
    const year = Number(yearInput.value);
    const month = Number(monthInput.value);

    const maximum =
      month === 0 ? getIntercalaryDays(year) : 19;

    dayInput.innerHTML = "";

    for (let day = 1; day <= maximum; day++) {
      const option = document.createElement("option");
      option.value = day;
      option.textContent = day;
      dayInput.appendChild(option);
    }
  }

  monthInput.addEventListener("change", updateDayOptions);
  yearInput.addEventListener("change", updateDayOptions);

  updateDayOptions();

  button.addEventListener("click", () => {
    try {
      const date = badiToGregorian(
        yearInput.value,
        monthInput.value,
        dayInput.value
      );

      output.textContent = formatGregorianArabic(date);

    } catch (error) {
      output.textContent = error.message;
    }
  });
}

tabs[0].addEventListener("click", showGregorianToBadi);
tabs[1].addEventListener("click", showBadiToGregorian);

