(() => {
  "use strict";

  const page = document.querySelector(".community-story-page");
  if (!page) return;

  const id = page.dataset.communityId;
  if (!id) return;

  const escapeHtml = (value) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const humanizeKey = (value) =>
    String(value ?? "")
      .replaceAll("_", " ")
      .trim();

  const extractText = (value) => {
    if (value == null) return "";

    if (typeof value === "string" ||
        typeof value === "number") {
      return String(value);
    }

    if (Array.isArray(value)) {
      return value
        .map(extractText)
        .filter(Boolean)
        .join(" · ");
    }

    if (typeof value === "object") {
      const preferred = [
        "title_ar",
        "name_ar",
        "description_ar",
        "summary_ar",
        "text_ar",
        "caption_ar",
        "description",
        "summary",
        "title",
        "text"
      ];

      for (const key of preferred) {
        if (value[key]) return extractText(value[key]);
      }

      return Object.values(value)
        .map(extractText)
        .filter(Boolean)
        .join(" — ");
    }

    return "";
  };

  async function loadJson(url) {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`تعذر تحميل البيانات: ${response.status}`);
    }

    return response.json();
  }

  function renderIntroduction(record) {
    const target =
      document.getElementById("community-story-introduction");

    if (!target) return;

    const intro = record.introduction_ar || "";

    if (intro) {
      target.innerHTML = `<p>${escapeHtml(intro)}</p>`;
      return;
    }

    target.innerHTML = `
      <p>
        تُعرض في هذه الصفحة المعلومات الموثقة المتاحة عن هذه
        التجربة، مع ربط الصور والمحطات بالمصادر التي تدعمها.
      </p>
    `;
  }

  function renderPrimary(record) {
    const target =
      document.getElementById("community-story-primary");

    if (!target) return;

    const visual = record.primary_visual;
    if (!visual?.local_path) {
      target.innerHTML = "";
      return;
    }

    const evidence = record.visual_evidence?.find(
      item => item.id === visual.evidence_id
    );

    const caption =
      evidence?.caption_ar ||
      record.name?.ar ||
      "";

    const source =
      evidence?.source_url ||
      evidence?.source_page ||
      "";

    target.innerHTML = `
      <img
        src="/${escapeHtml(visual.local_path)}"
        alt="${escapeHtml(caption)}"
      >

      <figcaption>
        ${
          caption
            ? `<p>${escapeHtml(caption)}</p>`
            : ""
        }

        ${
          source
            ? `<a
                 href="${escapeHtml(source)}"
                 target="_blank"
                 rel="noopener noreferrer"
               >الصورة: خدمة أخبار العالم البهائي</a>`
            : ""
        }
      </figcaption>
    `;
  }

  function renderDevelopments(record) {
    const target =
      document.getElementById("community-story-developments");

    if (!target) return;

    const developments = Array.isArray(record.developments)
      ? record.developments
      : [];

    if (!developments.length) {
      target.innerHTML = `
        <p class="community-story-empty">
          ستُضاف محطات موثقة أخرى مع استكمال توثيق التجربة.
        </p>
      `;
      return;
    }

    target.innerHTML = developments.map((item) => {
      const year =
        item.year ||
        item.date ||
        item.period ||
        item.date_ar ||
        "";

      const title =
        item.title_ar ||
        item.title ||
        item.name_ar ||
        "";

      const description =
        item.description_ar ||
        item.summary_ar ||
        item.description ||
        item.summary ||
        item.text_ar ||
        item.text ||
        "";

      const fallback =
        !title && !description
          ? extractText(item)
          : "";

      return `
        <article class="community-story-timeline-item${year ? "" : " community-story-timeline-item-undated"}">
          ${
            year
              ? `<div class="community-story-year">
                   ${escapeHtml(year)}
                 </div>`
              : ""
          }

          <div class="community-story-timeline-content">
            ${
              title
                ? `<h3>${escapeHtml(title)}</h3>`
                : ""
            }

            ${
              description || fallback
                ? `<p>${escapeHtml(description || fallback)}</p>`
                : ""
            }
          </div>
        </article>
      `;
    }).join("");
  }

  function renderGallery(record) {
    const target =
      document.getElementById("community-story-gallery");

    if (!target) return;

    const visuals = Array.isArray(record.visual_evidence)
      ? record.visual_evidence
      : [];

    const available = visuals.filter(
      item => item.local_path
    );

    if (!available.length) {
      target.innerHTML = `
        <p class="community-story-empty">
          ستُضاف صور موثقة أخرى إلى هذا المعرض مع استكمال
          إعداد المواد البصرية.
        </p>
      `;
      return;
    }

    target.innerHTML = available.map((item) => {
      const source =
        item.source_url ||
        item.source_page ||
        "";

      return `
        <figure class="community-story-gallery-item">
          <div class="community-story-gallery-image">
            <img
              src="/${escapeHtml(item.local_path)}"
              alt="${escapeHtml(item.caption_ar || "")}"
              loading="lazy"
            >

            ${
              source
                ? `<a
                     class="community-story-image-attribution"
                     href="${escapeHtml(source)}"
                     target="_blank"
                     rel="noopener noreferrer"
                   >الصورة: خدمة أخبار العالم البهائي</a>`
                : ""
            }
          </div>

          <figcaption>
            ${
              item.caption_ar
                ? `<p>${escapeHtml(item.caption_ar)}</p>`
                : ""
            }
          </figcaption>
        </figure>
      `;
    }).join("");
  }

  function renderSources(record) {
    const target =
      document.getElementById("community-story-sources");

    if (!target) return;

    target.innerHTML = `
      <a class="secondary-btn community-story-credits-btn" href="/credits">
        المصادر والاعتمادات ←
      </a>
    `;
  }

  async function init() {
    try {
      const record = await loadJson(
        `/data/community/communities/${id}.json`
      );

      renderPrimary(record);
      renderIntroduction(record);
      renderDevelopments(record);
      renderGallery(record);
      renderSources(record);

    } catch (error) {
      console.error(error);

      const reading =
        document.getElementById("community-story-introduction");

      if (reading) {
        reading.innerHTML = `
          <p class="community-story-empty">
            تعذر تحميل بيانات هذه التجربة في الوقت الحالي.
          </p>
        `;
      }
    }
  }

  init();
})();
