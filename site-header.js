document.addEventListener('DOMContentLoaded', () => {
  const target = document.getElementById('global-header');
  if (!target) return;

  target.innerHTML = `
    <header class="site-header lighthouse-header global-header">

      <a
        class="brand lighthouse-brand"
        href="index.html"
        aria-label="العودة إلى الصفحة الرئيسية"
      >
        <img
          src="assets/lighthouse-mark.svg"
          alt=""
          class="lighthouse-header-logo"
        >

        <span>
          <strong>المنارة البهائية</strong>
          <small>مساحة رقمية بهائية لخدمة المجتمع</small>
        </span>
      </a>

      <button
        class="mobile-menu-toggle"
        type="button"
        aria-expanded="false"
        aria-controls="global-navigation"
        aria-label="فتح القائمة"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav
        id="global-navigation"
        class="main-nav global-nav"
        aria-label="التنقل الرئيسي"
      >

        <a href="index.html">الرئيسية</a>

        <a href="index.html#purpose">هدف المنارة البهائية</a>

        <div class="nav-dropdown">

          <button
            class="nav-dropdown-toggle"
            type="button"
            aria-expanded="false"
            aria-haspopup="true"
          >
            <span>الأقسام</span>
            <span class="dropdown-arrow" aria-hidden="true">⌄</span>
          </button>

          <div class="nav-dropdown-menu">

            <a href="prayers.html">
              <span>الأدعية والمناجاة</span>
              <small class="available-label">متاح</small>
            </a>

            <span class="nav-disabled">
              <span>المكتبة البهائية</span>
              <small>قريباً</small>
            </span>

            <span class="nav-disabled">
              <span>المكتبة الصوتية</span>
              <small>قريباً</small>
            </span>

            <span class="nav-disabled">
              <span>المناسبات والأيام المباركة</span>
              <small>قريباً</small>
            </span>

            <span class="nav-disabled">
              <span>موارد للمجتمعات</span>
              <small>قريباً</small>
            </span>

            <span class="nav-disabled">
              <span>تطبيقات المنارة</span>
              <small>قريباً</small>
            </span>

          </div>
        </div>

        <a href="index.html#community">للزوار</a>

        <a href="index.html#about">حول المشروع</a>

      </nav>

    </header>
  `;

  const mobileToggle = target.querySelector('.mobile-menu-toggle');
  const nav = target.querySelector('.global-nav');
  const dropdown = target.querySelector('.nav-dropdown');
  const dropdownToggle = target.querySelector('.nav-dropdown-toggle');

  mobileToggle.addEventListener('click', () => {
    const open = mobileToggle.getAttribute('aria-expanded') === 'true';

    mobileToggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('is-open', !open);
  });

  dropdownToggle.addEventListener('click', (event) => {
    event.stopPropagation();

    const open = dropdownToggle.getAttribute('aria-expanded') === 'true';

    dropdownToggle.setAttribute('aria-expanded', String(!open));
    dropdown.classList.toggle('is-open', !open);
  });

  document.addEventListener('click', (event) => {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove('is-open');
      dropdownToggle.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      dropdown.classList.remove('is-open');
      dropdownToggle.setAttribute('aria-expanded', 'false');

      nav.classList.remove('is-open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Highlight the current page in the shared navigation
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  if (currentPage === 'index.html') {
    const homeLink = target.querySelector('.global-nav > a[href="index.html"]');
    if (homeLink) homeLink.classList.add('nav-current');
  }

  if (currentPage === 'prayers.html') {
    const prayersLink = target.querySelector(
      '.nav-dropdown-menu a[href="prayers.html"]'
    );

    if (prayersLink) {
      prayersLink.classList.add('nav-current');
      dropdownToggle.classList.add('nav-current');
    }
  }
});
