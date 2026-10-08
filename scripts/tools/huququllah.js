(() => {
  "use strict";

  const countrySelect = document.getElementById("huququllah-country");

  /* ===== Worldwide country and currency data ===== */

  const countryCurrencyData = {
    AD:"EUR", AE:"AED", AF:"AFN", AG:"XCD", AI:"XCD",
    AL:"ALL", AM:"AMD", AO:"AOA", AQ:null, AR:"ARS",
    AS:"USD", AT:"EUR", AU:"AUD", AW:"AWG", AX:"EUR",
    AZ:"AZN",

    BA:"BAM", BB:"BBD", BD:"BDT", BE:"EUR", BF:"XOF",
    BG:"EUR", BH:"BHD", BI:"BIF", BJ:"XOF", BL:"EUR",
    BM:"BMD", BN:"BND", BO:"BOB", BQ:"USD", BR:"BRL",
    BS:"BSD", BT:"BTN", BV:"NOK", BW:"BWP", BY:"BYN",
    BZ:"BZD",

    CA:"CAD", CC:"AUD", CD:"CDF", CF:"XAF", CG:"XAF",
    CH:"CHF", CI:"XOF", CK:"NZD", CL:"CLP", CM:"XAF",
    CN:"CNY", CO:"COP", CR:"CRC", CU:"CUP", CV:"CVE",
    CW:"XCG", CX:"AUD", CY:"EUR", CZ:"CZK",

    DE:"EUR", DJ:"DJF", DK:"DKK", DM:"XCD", DO:"DOP",
    DZ:"DZD",

    EC:"USD", EE:"EUR", EG:"EGP", EH:"MAD", ER:"ERN",
    ES:"EUR", ET:"ETB",

    FI:"EUR", FJ:"FJD", FK:"FKP", FM:"USD", FO:"DKK",
    FR:"EUR",

    GA:"XAF", GB:"GBP", GD:"XCD", GE:"GEL", GF:"EUR",
    GG:"GBP", GH:"GHS", GI:"GIP", GL:"DKK", GM:"GMD",
    GN:"GNF", GP:"EUR", GQ:"XAF", GR:"EUR", GS:"GBP",
    GT:"GTQ", GU:"USD", GW:"XOF", GY:"GYD",

    HK:"HKD", HM:"AUD", HN:"HNL", HR:"EUR", HT:"HTG",
    HU:"HUF",

    ID:"IDR", IE:"EUR", IL:"ILS", IM:"GBP", IN:"INR",
    IO:"USD", IQ:"IQD", IR:"IRR", IS:"ISK", IT:"EUR",

    JE:"GBP", JM:"JMD", JO:"JOD", JP:"JPY",

    KE:"KES", KG:"KGS", KH:"KHR", KI:"AUD", KM:"KMF",
    KN:"XCD", KP:"KPW", KR:"KRW", KW:"KWD", KY:"KYD",
    KZ:"KZT",

    LA:"LAK", LB:"LBP", LC:"XCD", LI:"CHF", LK:"LKR",
    LR:"LRD", LS:"LSL", LT:"EUR", LU:"EUR", LV:"EUR",
    LY:"LYD",

    MA:"MAD", MC:"EUR", MD:"MDL", ME:"EUR", MF:"EUR",
    MG:"MGA", MH:"USD", MK:"MKD", ML:"XOF", MM:"MMK",
    MN:"MNT", MO:"MOP", MP:"USD", MQ:"EUR", MR:"MRU",
    MS:"XCD", MT:"EUR", MU:"MUR", MV:"MVR", MW:"MWK",
    MX:"MXN", MY:"MYR", MZ:"MZN",

    NA:"NAD", NC:"XPF", NE:"XOF", NF:"AUD", NG:"NGN",
    NI:"NIO", NL:"EUR", NO:"NOK", NP:"NPR", NR:"AUD",
    NU:"NZD", NZ:"NZD",

    OM:"OMR",

    PA:"PAB", PE:"PEN", PF:"XPF", PG:"PGK", PH:"PHP",
    PK:"PKR", PL:"PLN", PM:"EUR", PN:"NZD", PR:"USD",
    PS:"ILS", PT:"EUR", PW:"USD", PY:"PYG",

    QA:"QAR",

    RE:"EUR", RO:"RON", RS:"RSD", RU:"RUB", RW:"RWF",

    SA:"SAR", SB:"SBD", SC:"SCR", SD:"SDG", SE:"SEK",
    SG:"SGD", SH:"SHP", SI:"EUR", SJ:"NOK", SK:"EUR",
    SL:"SLE", SM:"EUR", SN:"XOF", SO:"SOS", SR:"SRD",
    SS:"SSP", ST:"STN", SV:"USD", SX:"XCG", SY:"SYP",
    SZ:"SZL",

    TC:"USD", TD:"XAF", TF:"EUR", TG:"XOF", TH:"THB",
    TJ:"TJS", TK:"NZD", TL:"USD", TM:"TMT", TN:"TND",
    TO:"TOP", TR:"TRY", TT:"TTD", TV:"AUD", TW:"TWD",
    TZ:"TZS",

    UA:"UAH", UG:"UGX", UM:"USD", US:"USD", UY:"UYU",
    UZ:"UZS",

    VA:"EUR", VC:"XCD", VE:"VES", VG:"USD", VI:"USD",
    VN:"VND", VU:"VUV",

    WF:"XPF", WS:"WST",

    YE:"YER", YT:"EUR",

    ZA:"ZAR", ZM:"ZMW", ZW:"ZWG"
  };


  function populateCountrySelect() {
    /*
     * Arabic country/territory names are supplied by the
     * browser's internationalization data rather than being
     * duplicated manually in this project.
     */
    let displayNames = null;

    if (typeof Intl.DisplayNames === "function") {
      displayNames = new Intl.DisplayNames(
        ["ar"],
        { type: "region" }
      );
    }

    const entries = Object.entries(countryCurrencyData)
      /*
       * This calculator requires a usable currency.
       * Exclude regions that do not have a currency mapping,
       * such as Antarctica.
       */
      .filter(([, currency]) => Boolean(currency))
      .map(([code, currency]) => {
        let name = code;

        if (displayNames) {
          try {
            name = displayNames.of(code) || code;
          } catch {
            name = code;
          }
        }

        return {
          code,
          currency,
          name
        };
      })
      .sort((a, b) =>
        a.name.localeCompare(b.name, "ar")
      );


    /*
     * Keep the existing placeholder.
     */
    countrySelect.replaceChildren();

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "اختر البلد أو المنطقة";

    countrySelect.appendChild(placeholder);


    entries.forEach(({ code, currency, name }) => {
      const option = document.createElement("option");

      option.value = code;
      option.textContent = name;

      if (currency) {
        option.dataset.currency = currency;
      }

      countrySelect.appendChild(option);
    });
  }


  const currencySelect = document.getElementById("huququllah-currency");

  /* ===== Currency selector from worldwide dataset ===== */

  function populateCurrencySelect() {
    /*
     * Build the currency selector directly from the currencies
     * referenced by countryCurrencyData.
     *
     * This prevents the country list and currency list from
     * getting out of sync.
     */
    const currencyCodes = [
      ...new Set(
        Object.values(countryCurrencyData).filter(Boolean)
      )
    ];

    let currencyNames = null;

    if (typeof Intl.DisplayNames === "function") {
      try {
        currencyNames = new Intl.DisplayNames(
          ["ar"],
          { type: "currency" }
        );
      } catch {
        currencyNames = null;
      }
    }

    const currencies = currencyCodes
      .map(code => {
        let name = code;

        if (currencyNames) {
          try {
            name = currencyNames.of(code) || code;
          } catch {
            name = code;
          }
        }

        return {
          code,
          name
        };
      })
      .sort((a, b) =>
        a.name.localeCompare(b.name, "ar")
      );


    currencySelect.replaceChildren();

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "اختر العملة";

    currencySelect.appendChild(placeholder);


    currencies.forEach(({ code, name }) => {
      const option = document.createElement("option");

      option.value = code;

      /*
       * Example:
       * MAD — درهم مغربي
       * USD — دولار أمريكي
       */
      option.textContent = `${code} — ${name}`;

      currencySelect.appendChild(option);
    });
  }


  const summary = document.getElementById("huququllah-currency-summary");
  const selectedCurrency = document.getElementById(
    "huququllah-selected-currency"
  );
  const selectedCountry = document.getElementById(
    "huququllah-selected-country"
  );
  const continueButton = document.getElementById("huququllah-continue");

  if (
    !countrySelect ||
    !currencySelect ||
    !summary ||
    !selectedCurrency ||
    !selectedCountry ||
    !continueButton
  ) {
    return;
  }

  function getSelectedCountryOption() {
    return countrySelect.options[countrySelect.selectedIndex];
  }

  function getSelectedCurrencyOption() {
    return currencySelect.options[currencySelect.selectedIndex];
  }

  function updateSummary() {
    const currency = currencySelect.value;
    const country = countrySelect.value;

    if (!currency) {
      summary.hidden = true;
      continueButton.disabled = true;
      return;
    }

    const currencyOption = getSelectedCurrencyOption();
    const countryOption = getSelectedCountryOption();

    selectedCurrency.textContent = currencyOption.textContent.trim();

    if (country && countryOption) {
      selectedCountry.textContent =
        `البلد المختار: ${countryOption.textContent.trim()}`;
    } else {
      selectedCountry.textContent =
        "تم اختيار العملة مباشرة دون تحديد بلد.";
    }

    summary.hidden = false;
    continueButton.disabled = false;
  }

    populateCurrencySelect();
  populateCountrySelect();

countrySelect.addEventListener("change", () => {
    const option = getSelectedCountryOption();

    if (!option || !option.value) {
      updateSummary();
      return;
    }

    const suggestedCurrency = option.dataset.currency;

    if (suggestedCurrency) {
      currencySelect.value = suggestedCurrency;
    }

    updateSummary();
  });

  currencySelect.addEventListener("change", updateSummary);

  const calculatorForm =
    document.getElementById("huququllah-calculator");

  const thresholdStep =
    document.getElementById("huququllah-threshold-step");

  const goldPriceInput =
    document.getElementById("huququllah-gold-price");

  const goldCurrency =
    document.getElementById("huququllah-gold-currency");

  const thresholdResult =
    document.getElementById("huququllah-threshold-result");

  const thresholdValue =
    document.getElementById("huququllah-threshold-value");

  const backCurrencyButton =
    document.getElementById("huququllah-back-currency");

  const continueFinancesButton =
    document.getElementById("huququllah-continue-finances");


  function formatMoney(value, currency) {
    try {
      return new Intl.NumberFormat("ar", {
        style: "currency",
        currency,
        maximumFractionDigits: 2
      }).format(value);
    } catch {
      return `${value.toFixed(2)} ${currency}`;
    }
  }


  function updateThreshold() {
    const price = Number(goldPriceInput.value);
    const currency = currencySelect.value;

    goldCurrency.textContent = currency || "—";

    if (!currency || !Number.isFinite(price) || price <= 0) {
      thresholdResult.hidden = true;
      continueFinancesButton.disabled = true;
      return;
    }

    const threshold = price * 69.2;

    thresholdValue.textContent =
      formatMoney(threshold, currency);

    thresholdResult.hidden = false;
    continueFinancesButton.disabled = false;
  }


  continueButton.addEventListener("click", () => {
    if (!currencySelect.value) {
      return;
    }

    calculatorForm.hidden = true;
    thresholdStep.hidden = false;

    goldCurrency.textContent = currencySelect.value;

    thresholdStep.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });


  backCurrencyButton.addEventListener("click", () => {
    thresholdStep.hidden = true;
    calculatorForm.hidden = false;

    calculatorForm.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });


  goldPriceInput.addEventListener("input", updateThreshold);


  currencySelect.addEventListener("change", () => {
    updateSummary();

    if (!thresholdStep.hidden) {
      updateThreshold();
    }
  });


  const financeStep =
    document.getElementById("huququllah-finance-step");

  const calculationTypeInputs =
    document.querySelectorAll(
      'input[name="huququllah-calculation-type"]'
    );

  const initialFields =
    document.getElementById("huququllah-initial-fields");

  const increaseFields =
    document.getElementById("huququllah-increase-fields");

  const assessableAssets =
    document.getElementById("huququllah-assessable-assets");

  const initialDeductions =
    document.getElementById("huququllah-initial-deductions");

  const newIncrease =
    document.getElementById("huququllah-new-increase");

  const increaseDeductions =
    document.getElementById("huququllah-increase-deductions");

  const financePreview =
    document.getElementById("huququllah-finance-preview");

  const previewGross =
    document.getElementById("huququllah-preview-gross");

  const previewDeductions =
    document.getElementById("huququllah-preview-deductions");

  const previewNet =
    document.getElementById("huququllah-preview-net");

  const previewThreshold =
    document.getElementById("huququllah-preview-threshold");

  const thresholdMessage =
    document.getElementById("huququllah-threshold-message");

  const backThresholdButton =
    document.getElementById("huququllah-back-threshold");

  const calculateFinalButton =
    document.getElementById("huququllah-calculate-final");


  function selectedCalculationType() {
    const checked = document.querySelector(
      'input[name="huququllah-calculation-type"]:checked'
    );

    return checked ? checked.value : "";
  }


  function currentThreshold() {
    const price = Number(goldPriceInput.value);

    if (!Number.isFinite(price) || price <= 0) {
      return 0;
    }

    return price * 69.2;
  }


  function updateDynamicCurrencies() {
    document
      .querySelectorAll(".huququllah-dynamic-currency")
      .forEach((element) => {
        element.textContent = currencySelect.value || "—";
      });
  }


  function updateFinancePreview() {
    const type = selectedCalculationType();
    const currency = currencySelect.value;
    const threshold = currentThreshold();

    if (!type || !currency || threshold <= 0) {
      financePreview.hidden = true;
      calculateFinalButton.disabled = true;
      return;
    }

    let gross = 0;
    let deductions = 0;

    if (type === "initial") {
      gross = Number(assessableAssets.value);
      deductions = Number(initialDeductions.value || 0);
    } else {
      gross = Number(newIncrease.value);
      deductions = Number(increaseDeductions.value || 0);
    }

    if (!Number.isFinite(gross) || gross < 0) {
      financePreview.hidden = true;
      calculateFinalButton.disabled = true;
      return;
    }

    if (!Number.isFinite(deductions) || deductions < 0) {
      deductions = 0;
    }

    const net = Math.max(0, gross - deductions);

    previewGross.textContent =
      formatMoney(gross, currency);

    previewDeductions.textContent =
      formatMoney(deductions, currency);

    previewNet.textContent =
      formatMoney(net, currency);

    previewThreshold.textContent =
      formatMoney(threshold, currency);

    if (net < threshold) {
      thresholdMessage.textContent =
        "الصافي المدخل أقل من قيمة النصاب المعروضة.";
    } else {
      thresholdMessage.textContent =
        "الصافي المدخل بلغ قيمة النصاب أو تجاوزها. " +
        "سيتم تطبيق قواعد الحساب الموثقة في مرحلة النتيجة.";
    }

    financePreview.hidden = false;
    calculateFinalButton.disabled = false;
  }


  calculationTypeInputs.forEach((input) => {
    input.addEventListener("change", () => {
      const type = selectedCalculationType();

      initialFields.hidden = type !== "initial";
      increaseFields.hidden = type !== "increase";

      updateDynamicCurrencies();
      updateFinancePreview();
    });
  });


  [
    assessableAssets,
    initialDeductions,
    newIncrease,
    increaseDeductions
  ].forEach((input) => {
    input.addEventListener("input", updateFinancePreview);
  });


  continueFinancesButton.addEventListener("click", () => {
    if (currentThreshold() <= 0) {
      return;
    }

    thresholdStep.hidden = true;
    financeStep.hidden = false;

    updateDynamicCurrencies();

    financeStep.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });


  backThresholdButton.addEventListener("click", () => {
    financeStep.hidden = true;
    thresholdStep.hidden = false;

    thresholdStep.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });


  const resultStep =
    document.getElementById("huququllah-result-step");

  const finalAmount =
    document.getElementById("huququllah-final-amount");

  const resultNet =
    document.getElementById("huququllah-result-net");

  const resultThreshold =
    document.getElementById("huququllah-result-threshold");

  const resultUnits =
    document.getElementById("huququllah-result-units");

  const resultBasis =
    document.getElementById("huququllah-result-basis");

  const resultRemainder =
    document.getElementById("huququllah-result-remainder");

  const calculationExplanation =
    document.getElementById("huququllah-calculation-explanation");

  const backFinancesButton =
    document.getElementById("huququllah-back-finances");

  const startOverButton =
    document.getElementById("huququllah-start-over");


  function getFinanceValues() {
    const type = selectedCalculationType();

    let gross = 0;
    let deductions = 0;

    if (type === "initial") {
      gross = Number(assessableAssets.value);
      deductions = Number(initialDeductions.value || 0);
    } else if (type === "increase") {
      gross = Number(newIncrease.value);
      deductions = Number(increaseDeductions.value || 0);
    }

    if (!Number.isFinite(gross) || gross < 0) {
      gross = 0;
    }

    if (!Number.isFinite(deductions) || deductions < 0) {
      deductions = 0;
    }

    return {
      type,
      gross,
      deductions,
      net: Math.max(0, gross - deductions)
    };
  }


  calculateFinalButton.addEventListener("click", () => {
    const currency = currencySelect.value;
    const threshold = currentThreshold();
    const values = getFinanceValues();

    if (
      !currency ||
      !values.type ||
      threshold <= 0
    ) {
      return;
    }

    /*
      Huququ'llah is calculated on complete units of the
      threshold (19 mithqals of gold).

      Any remainder below another complete unit is carried
      outside the current calculation.
    */
    const wholeUnits =
      Math.floor((values.net + Number.EPSILON) / threshold);

    const assessableBasis =
      wholeUnits * threshold;

    const remainder =
      Math.max(0, values.net - assessableBasis);

    const huququllah =
      assessableBasis * 0.19;


    resultNet.textContent =
      formatMoney(values.net, currency);

    resultThreshold.textContent =
      formatMoney(threshold, currency);

    resultUnits.textContent =
      new Intl.NumberFormat("ar").format(wholeUnits);

    resultBasis.textContent =
      formatMoney(assessableBasis, currency);

    resultRemainder.textContent =
      formatMoney(remainder, currency);

    finalAmount.textContent =
      formatMoney(huququllah, currency);


    if (wholeUnits === 0) {
      calculationExplanation.innerHTML = `
        <strong>لم تكتمل وحدة نصاب بعد</strong>
        <p>
          الصافي الذي أدخلته أقل من قيمة النصاب الحالية،
          ولذلك لا توجد وحدة كاملة تدخل في هذا الحساب.
        </p>
      `;
    } else {
      const typeText =
        values.type === "initial"
          ? "الحساب الأول"
          : "الزيادة اللاحقة";

      calculationExplanation.innerHTML = `
        <strong>كيف حُسبت النتيجة؟</strong>

        <p>
          نوع الحساب: <b>${typeText}</b>.
          بلغ الصافي بعد الخصومات
          <b>${formatMoney(values.net, currency)}</b>.
        </p>

        <p>
          قيمة وحدة النصاب هي
          <b>${formatMoney(threshold, currency)}</b>،
          ويوجد في الصافي
          <b>${new Intl.NumberFormat("ar").format(wholeUnits)}</b>
          من الوحدات الكاملة.
        </p>

        <p>
          لذلك بلغ المبلغ الداخل في هذه العملية الحسابية
          <b>${formatMoney(assessableBasis, currency)}</b>،
          و19٪ منه تساوي
          <b>${formatMoney(huququllah, currency)}</b>.
        </p>

        <p>
          أما الباقي البالغ
          <b>${formatMoney(remainder, currency)}</b>
          فلم يُعامل كوحدة كاملة في هذه العملية الحسابية.
        </p>
      `;
    }


    financeStep.hidden = true;
    resultStep.hidden = false;

    resultStep.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });


  backFinancesButton.addEventListener("click", () => {
    resultStep.hidden = true;
    financeStep.hidden = false;

    financeStep.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });


  startOverButton.addEventListener("click", () => {
    resultStep.hidden = true;

    calculationTypeInputs.forEach((input) => {
      input.checked = false;
    });

    assessableAssets.value = "";
    initialDeductions.value = "0";

    newIncrease.value = "";
    increaseDeductions.value = "0";

    initialFields.hidden = true;
    increaseFields.hidden = true;
    financePreview.hidden = true;

    thresholdStep.hidden = true;
    form.hidden = false;

    form.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });
})();
