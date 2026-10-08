(() => {
  "use strict";

  const container = document.getElementById("community-experiences");

  if (!container) return;

  const regionNames = {
    "africa": "أفريقيا",
    "asia": "آسيا",
    "europe": "أوروبا",
    "north-america": "أمريكا الشمالية",
    "south-america": "أمريكا الجنوبية",
    "oceania": "أوقيانوسيا"
  };

  const order = [
    "africa",
    "asia",
    "europe",
    "north-america",
    "south-america",
    "oceania"
  ];

  const summaries = {
    "matunda-soy":
      "الحياة التعبدية، ومشاركة الأسر والشباب، والتربية، وبناء القدرات، والوحدة، والعلاقة بين العبادة وخدمة المجتمع.",

    "battambang":
      "دور الشباب، وتنمية القدرة على الخدمة، وتربية الأطفال والشباب الناشئ، والعمل الجماعي، والعناية بالبيئة.",

    "matonge-brussels":
      "مبادرات يقودها الشباب لتعزيز الصداقة بين سكان الحي، والتواصل بين الأجيال والثقافات، والتشاور وخدمة الحي.",

    "united-states-cohesive-neighborhoods":
      "خبرات من عدة أحياء حول الصداقة عبر الاختلافات، وخدمة الشباب، والتربية الروحية والأخلاقية، والوحدة والعمل الجماعي.",

    "norte-del-cauca":
      "التربية، وبناء القدرات، والعمل الاجتماعي، والعناية بالبيئة، والعبادة والخدمة، وخبرات تطورت حول مشرق الأذكار المحلي.",

    "tanna":
      "صمود المجتمع، وخدمة الشباب، والتربية، والثقافة المحلية، والتماسك الاجتماعي، والاستجابة للكوارث، والعبادة والخدمة."
  };

  const escapeHtml = (value) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  async function loadJson(url) {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`تعذر تحميل البيانات: ${response.status}`);
    }

    return response.json();
  }

  async function renderExperiences() {
    try {
      const index = await loadJson("/data/community/index.json");

      const communities = [...index.communities].sort(
        (a, b) =>
          order.indexOf(a.continent_id) - order.indexOf(b.continent_id)
      );

      const records = await Promise.all(
        communities.map(async (entry) => {
          const record = await loadJson(
            `/data/community/${entry.data}`
          );

          return { entry, record };
        })
      );

      container.innerHTML = records.map(({ entry, record }) => {
        const region = regionNames[entry.continent_id] || "";
        const image = record.primary_visual?.local_path
          ? `/${record.primary_visual.local_path}`
          : "/assets/brand/lighthouse-logo.png";

        const evidence = record.visual_evidence?.find(
          item => item.id === record.primary_visual?.evidence_id
        );

        const caption = evidence?.caption_ar || "";
        const sourceUrl = evidence?.source_url || "";
        const summary = summaries[entry.id] || record.introduction_ar || "";

        const collectionNote =
          entry.record_type === "learning_collection"
            ? `<p class="community-collection-note">
                 هذه الخبرات من عدة مجتمعات وأحياء وليست تجربة لمكان واحد.
               </p>`
            : "";

        return `
          <article class="community-experience-card">
            <a
              class="community-experience-main-link"
              href="/community/${escapeHtml(entry.id)}.html"
              aria-label="استكشف تجربة ${escapeHtml(entry.name_ar)}"
            >
              <figure class="community-experience-media">
                <img
                  src="${escapeHtml(image)}"
                  alt="${escapeHtml(caption || `${entry.name_ar}، ${entry.country_ar}`)}"
                  loading="lazy"
                >
              </figure>

              <div class="community-experience-body">
                <div class="community-experience-meta">
                  <span>${escapeHtml(region)}</span>
                  <span aria-hidden="true">•</span>
                  <span>${escapeHtml(entry.country_ar)}</span>
                </div>

                <h3>${escapeHtml(entry.name_ar)}</h3>

                <p>${escapeHtml(summary)}</p>

                ${collectionNote}

                <span class="community-explore-link">
                  استكشف التجربة
                  <span aria-hidden="true">←</span>
                </span>
              </div>
            </a>

            <div class="community-photo-credit">
              ${
                sourceUrl
                  ? `<a
                       href="${escapeHtml(sourceUrl)}"
                       target="_blank"
                       rel="noopener noreferrer"
                       aria-label="الانتقال إلى مصدر الصورة في خدمة أخبار العالم البهائي"
                     >الصورة: خدمة أخبار العالم البهائي</a>`
                  : `<span>الصورة: خدمة أخبار العالم البهائي</span>`
              }
            </div>
          </article>
        `;
      }).join("");



    } catch (error) {
      console.error(error);

      container.innerHTML = `
        <div class="community-load-error">
          <strong>تعذر تحميل التجارب في الوقت الحالي.</strong>
          <p>يرجى إعادة تحميل الصفحة والمحاولة مرة أخرى.</p>
        </div>
      `;
    }
  }

  renderExperiences();
})();
