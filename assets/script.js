(() => {
  const config = window.AKPRO_SITE_CONFIG || { appIsReady: false, appUrl: 'https://app.akproplus.id' };

  document.querySelectorAll('[data-login-link]').forEach((link) => {
    if (config.appIsReady) {
      link.href = config.appUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
  });

  const year = document.querySelector('[data-current-year]');
  if (year) year.textContent = String(new Date().getFullYear());

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav > a[href]').forEach((link) => {
    if (link.getAttribute('href') === `/${currentPage}`) {
      link.setAttribute('aria-current', 'page');
    }
  });

  document.querySelectorAll('.image-frame img').forEach((image) => {
    const frame = image.closest('.image-frame');
    const imagePath = image.dataset.src;
    if (!imagePath) return;

    image.addEventListener('load', () => frame.classList.add('has-image'), { once: true });
    image.addEventListener('error', () => frame.classList.add('image-missing'), { once: true });
    image.src = imagePath;
  });

  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.site-nav');
  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isExpanded));
      menuButton.setAttribute('aria-label', isExpanded ? 'Buka menu' : 'Tutup menu');
      navigation.classList.toggle('is-open', !isExpanded);
      document.body.classList.toggle('menu-open', !isExpanded);
    });

    navigation.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Buka menu');
        navigation.classList.remove('is-open');
        document.body.classList.remove('menu-open');
      });
    });
  }

})();
