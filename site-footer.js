document.addEventListener('DOMContentLoaded', () => {
  const currentYear = new Date().getFullYear();
  const target = document.getElementById('global-footer');
  if (!target) return;

  target.innerHTML = `
    <footer class="lighthouse-footer">

      <div class="footer-identity">
        <strong>المنارة البهائية</strong>
        <span>مساحة رقمية بهائية لخدمة المجتمع</span>
      </div>

      <div class="footer-links">
        <a href="index.html">الرئيسية</a>
        <a href="prayers.html">الأدعية والمناجاة</a>
        <a href="privacy.html">سياسة الخصوصية</a>

        <a class="footer-icon-link footer-email"
           href="mailto:contact@bahai-lighthouse.com"
           aria-label="البريد الإلكتروني"
           title="contact@bahai-lighthouse.com">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 5h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm0 2v.4l9 5.7 9-5.7V7H3zm18 10V9.8l-8.5 5.4a1 1 0 0 1-1 0L3 9.8V17h18z"/>
          </svg>
        </a>

        <div class="footer-socials" aria-label="تابع المنارة">
          <span class="footer-socials-label">تابع المنارة</span>

          <a class="footer-icon-link social-facebook"
             href="https://www.facebook.com/bahai.lighthouse/"
             target="_blank"
             rel="noopener noreferrer"
             aria-label="Facebook"
             title="Facebook">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M13.5 22v-9h3l.5-3.5h-3.5V7.3c0-1 .3-1.8 1.8-1.8H17V2.4c-.3 0-1.4-.1-2.7-.1-2.7 0-4.6 1.7-4.6 4.7v2.5H7V13h2.7v9h3.8z"/>
            </svg>
          </a>

          <a class="footer-icon-link social-instagram"
             href="https://www.instagram.com/bahai.lighthouse/"
             target="_blank"
             rel="noopener noreferrer"
             aria-label="Instagram"
             title="Instagram">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4.2"/>
              <circle cx="17.4" cy="6.6" r="1"/>
            </svg>
          </a>

          <a class="footer-icon-link social-x"
             href="https://x.com/bahailighthouse"
             target="_blank"
             rel="noopener noreferrer"
             aria-label="X"
             title="X">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.2 2H22l-8.3 9.5L23.5 22h-7.7l-6-7.8L3 22H-.8l8.9-10.2L-1.3 2h7.9l5.4 7.1L18.2 2zm-1.3 18h2.1L5.5 3.9H3.2L16.9 20z"/>
            </svg>
          </a>
        </div>

        <span class="footer-year">© ${currentYear}</span>
      </div>

    </footer>
  `;
});
