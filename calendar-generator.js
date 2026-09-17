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


/*
 * Annual Bahá’í observances.
 *
 * Fixed dates follow the same rules used by the Bahá’í Events
 * Arabic application. Twin Holy Birthdays are imported from the
 * application's year-by-year calendar repository.
 */

const twinHolyBirthdayDates = {
  172: ["2015-11-13", "2015-11-14"],
  173: ["2016-11-01", "2016-11-02"],
  174: ["2017-10-21", "2017-10-22"],
  175: ["2018-11-09", "2018-11-10"],
  176: ["2019-10-29", "2019-10-30"],
  177: ["2020-10-18", "2020-10-19"],
  178: ["2021-11-06", "2021-11-07"],
  179: ["2022-10-26", "2022-10-27"],
  180: ["2023-10-16", "2023-10-17"],
  181: ["2024-11-02", "2024-11-03"],
  182: ["2025-10-22", "2025-10-23"],
  183: ["2026-11-10", "2026-11-11"],
  184: ["2027-10-30", "2027-10-31"],
  185: ["2028-10-19", "2028-10-20"],
  186: ["2029-11-07", "2029-11-08"],
  187: ["2030-10-28", "2030-10-29"],
  188: ["2031-10-17", "2031-10-18"],
  189: ["2032-11-04", "2032-11-05"],
  190: ["2033-10-24", "2033-10-25"],
  191: ["2034-11-12", "2034-11-13"],
  192: ["2035-11-01", "2035-11-02"],
  193: ["2036-10-20", "2036-10-21"],
  194: ["2037-11-08", "2037-11-09"],
  195: ["2038-10-29", "2038-10-30"],
  196: ["2039-10-19", "2039-10-20"],
  197: ["2040-11-06", "2040-11-07"],
  198: ["2041-10-26", "2041-10-27"],
  199: ["2042-10-15", "2042-10-16"],
  200: ["2043-11-03", "2043-11-04"],
  201: ["2044-10-22", "2044-10-23"],
  202: ["2045-11-10", "2045-11-11"],
  203: ["2046-10-30", "2046-10-31"],
  204: ["2047-10-20", "2047-10-21"],
  205: ["2048-11-07", "2048-11-08"],
  206: ["2049-10-28", "2049-10-29"],
  207: ["2050-10-17", "2050-10-18"],
  208: ["2051-11-05", "2051-11-06"],
  209: ["2052-10-24", "2052-10-25"],
  210: ["2053-11-11", "2053-11-12"],
  211: ["2054-11-01", "2054-11-02"],
  212: ["2055-10-21", "2055-10-22"],
  213: ["2056-11-08", "2056-11-09"],
  214: ["2057-10-29", "2057-10-30"],
  215: ["2058-10-18", "2058-10-19"],
  216: ["2059-11-06", "2059-11-07"],
  217: ["2060-10-25", "2060-10-26"],
  218: ["2061-10-14", "2061-10-15"],
  219: ["2062-11-02", "2062-11-03"],
  220: ["2063-10-23", "2063-10-24"],
  221: ["2064-11-10", "2064-11-11"]
};

const fixedBadiObservances = [
  {
    month: 1,
    day: 1,
    title: "عيد النوروز",
    type: "holy"
  },
  {
    month: 2,
    day: 13,
    title: "اليوم الأول من الرضوان",
    type: "holy"
  },
  {
    month: 3,
    day: 2,
    title: "اليوم التاسع من الرضوان",
    type: "holy"
  },
  {
    month: 3,
    day: 5,
    title: "اليوم الثاني عشر من الرضوان",
    type: "holy"
  },
  {
    month: 4,
    day: 8,
    title: "إعلان دعوة حضرة الباب",
    type: "holy"
  },
  {
    month: 4,
    day: 13,
    title: "صعود حضرة بهاءالله",
    type: "commemoration"
  },
  {
    month: 6,
    day: 17,
    title: "استشهاد حضرة الباب",
    type: "commemoration"
  },
  {
    month: 14,
    day: 4,
    title: "يوم العهد والميثاق",
    type: "commemoration"
  },
  {
    month: 14,
    day: 6,
    title: "صعود حضرة عبد البهاء",
    type: "commemoration"
  }
];

const DAY_MS = 86400000;

function utcDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function addDays(date, days) {
  return new Date(date.getTime() + (days * DAY_MS));
}

function daysBetween(a, b) {
  return Math.round((b - a) / DAY_MS);
}

function getIntercalaryDays(year) {
  const start = utcDate(nawRuzDates[year]);
  const end = utcDate(nawRuzDates[year + 1]);

  return daysBetween(start, end) - 361;
}

function formatGregorian(date) {
  return new Intl.DateTimeFormat("ar", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  }).format(date);
}

function formatShortGregorian(date) {
  return new Intl.DateTimeFormat("ar", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC"
  }).format(date);
}

const yearSelect = document.getElementById("calendar-year");
const generateButton = document.getElementById("generate-calendar");
const outputTitle = document.getElementById("calendar-output-title");
const outputRange = document.getElementById("calendar-output-range");
const monthsContainer = document.getElementById("calendar-months");
const printButton = document.getElementById("print-calendar");
const printTitle = document.getElementById("calendar-print-title");
const printRange = document.getElementById("calendar-print-range");

for (let year = 172; year <= 220; year += 1) {
  const option = document.createElement("option");

  option.value = String(year);
  option.textContent = `${year} ب.إ.`;

  if (year === 183) {
    option.selected = true;
  }

  yearSelect.appendChild(option);
}


function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

function getBadiDateGregorian(year, month, day) {
  const yearStart = utcDate(nawRuzDates[year]);

  if (month >= 1 && month <= 18) {
    return addDays(
      yearStart,
      ((month - 1) * 19) + (day - 1)
    );
  }

  if (month === 19) {
    const intercalaryDays = getIntercalaryDays(year);

    return addDays(
      yearStart,
      342 + intercalaryDays + (day - 1)
    );
  }

  return null;
}

function getMonthObservances(year, month) {
  const observances = [];

  // Every regular Bahá’í month begins with a Nineteen Day Feast.
  if (month >= 1 && month <= 19) {
    observances.push({
      day: 1,
      title: `الضيافة التسع عشرية — ${badiMonths[month - 1]}`,
      type: "feast",
      gregorian: getBadiDateGregorian(year, month, 1)
    });
  }

  fixedBadiObservances
    .filter(item => item.month === month)
    .forEach(item => {
      observances.push({
        ...item,
        gregorian: getBadiDateGregorian(
          year,
          item.month,
          item.day
        )
      });
    });

  const twins = twinHolyBirthdayDates[year];

  if (twins) {
    const twinDefinitions = [
      {
        iso: twins[0],
        title: "ميلاد حضرة الباب"
      },
      {
        iso: twins[1],
        title: "ميلاد حضرة بهاءالله"
      }
    ];

    twinDefinitions.forEach(item => {
      const target = utcDate(item.iso);

      for (let day = 1; day <= 19; day += 1) {
        const candidate =
          getBadiDateGregorian(year, month, day);

        if (
          candidate &&
          isoDate(candidate) === isoDate(target)
        ) {
          observances.push({
            day,
            title: item.title,
            type: "holy",
            gregorian: target
          });

          break;
        }
      }
    });
  }

  observances.sort((a, b) => a.day - b.day);

  return observances;
}

function createObservancesMarkup(year, month) {
  const observances = getMonthObservances(year, month);

  if (!observances.length) {
    return "";
  }

  return `
    <div class="calendar-month-observances">
      ${observances.map(item => `
        <div class="calendar-observance ${item.type}">
          <span class="calendar-observance-day">
            ${item.day}
          </span>

          <span class="calendar-observance-title">
            ${item.title}
          </span>

          <span class="calendar-observance-gregorian">
            ${new Intl.DateTimeFormat("ar", {
              day: "numeric",
              month: "short",
              timeZone: "UTC"
            }).format(item.gregorian)}
          </span>
        </div>
      `).join("")}
    </div>
  `;
}

function createMonthCard(name, number, start, days, special = false, year = null) {
  const end = addDays(start, days - 1);

  const article = document.createElement("article");
  article.className =
    special
      ? "calendar-month-card intercalary"
      : "calendar-month-card";

  const label =
    special
      ? "أيام الهاء"
      : `الشهر ${number}`;

  article.innerHTML = `
    <div class="calendar-month-top">
      <span>${label}</span>
      <strong>${days}</strong>
    </div>

    <h3>${name}</h3>

    <p class="calendar-month-duration">
      ${days} ${days === 1 ? "يوم" : "أيام"}
    </p>

    ${
      !special && year !== null
        ? createObservancesMarkup(year, number)
        : ""
    }

    <div class="calendar-month-dates">
      <span>من ${formatShortGregorian(start)}</span>
      <span>إلى ${formatShortGregorian(end)}</span>
    </div>
  `;

  return article;
}

function generateCalendar() {
  const year = Number(yearSelect.value);

  if (!nawRuzDates[year] || !nawRuzDates[year + 1]) {
    return;
  }

  const start = utcDate(nawRuzDates[year]);
  const nextStart = utcDate(nawRuzDates[year + 1]);
  const finalDay = addDays(nextStart, -1);
  const intercalaryDays = getIntercalaryDays(year);

  outputTitle.textContent = `السنة ${year} ب.إ.`;

  outputRange.textContent =
    `${formatGregorian(start)} — ${formatGregorian(finalDay)}`;

  printTitle.textContent = `التقويم البهائي — السنة ${year} ب.إ.`;
  printRange.textContent =
    `${formatGregorian(start)} — ${formatGregorian(finalDay)}`;

  monthsContainer.replaceChildren();

  // Months 1–18
  for (let month = 1; month <= 18; month += 1) {
    const monthStart = addDays(
      start,
      (month - 1) * 19
    );

    monthsContainer.appendChild(
      createMonthCard(
        badiMonths[month - 1],
        month,
        monthStart,
        19,
        false,
        year
      )
    );
  }

  // Ayyám-i-Há
  const intercalaryStart = addDays(start, 342);

  monthsContainer.appendChild(
    createMonthCard(
      "أيام الهاء",
      0,
      intercalaryStart,
      intercalaryDays,
      true
    )
  );

  // Month 19 — ‘Alá’
  const alaStart = addDays(
    intercalaryStart,
    intercalaryDays
  );

  monthsContainer.appendChild(
    createMonthCard(
      badiMonths[18],
      19,
      alaStart,
      19,
      false,
      year
    )
  );
}

printButton.addEventListener("click", () => {
  window.print();
});

generateButton.addEventListener("click", () => {
  generateCalendar();

  document.getElementById("calendar-output").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

generateCalendar();
