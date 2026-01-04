// Handle Bib popout toggle and prevent propagation to research-item click
document.addEventListener('click', function(e) {
  // Toggle popout on Bib link click
  const bibToggle = e.target.closest('[data-bib-toggle]');
  if (bibToggle) {
    e.preventDefault();
    e.stopPropagation();
    const id = bibToggle.getAttribute('data-bib-toggle');
    const popout = document.getElementById('bib-' + id);
    if (popout) {
      const isHidden = popout.hasAttribute('hidden');
      // Close all other popouts
      document.querySelectorAll('.bib-popout').forEach(p => p.setAttribute('hidden', ''));
      // Toggle current popout
      if (isHidden) {
        popout.removeAttribute('hidden');
      }
    }
    return;
  }

  // Copy BibTeX
  const copyBtn = e.target.closest('[data-bib-copy]');
  if (copyBtn) {
    e.preventDefault();
    e.stopPropagation();
    const id = copyBtn.getAttribute('data-bib-copy');
    const popout = document.getElementById('bib-' + id);
    if (popout) {
      const bibText = popout.querySelector('.bib-text');
      if (bibText && navigator.clipboard) {
        navigator.clipboard.writeText(bibText.textContent).then(() => {
          const originalText = copyBtn.textContent;
          copyBtn.textContent = 'Copied!';
          copyBtn.style.background = '#34a853';
          setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.background = '';
          }, 2000);
        });
      }
    }
    return;
  }

  // Close popout
  const closeBtn = e.target.closest('[data-bib-close]');
  if (closeBtn) {
    e.preventDefault();
    e.stopPropagation();
    const id = closeBtn.getAttribute('data-bib-close');
    const popout = document.getElementById('bib-' + id);
    if (popout) {
      popout.setAttribute('hidden', '');
    }
    return;
  }

  // Close popouts when clicking outside
  if (!e.target.closest('.bib-popout')) {
    document.querySelectorAll('.bib-popout').forEach(p => p.setAttribute('hidden', ''));
  }
}, true); // Use capture phase to intercept before research-item onclick

// Close popouts on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.bib-popout').forEach(p => p.setAttribute('hidden', ''));
  }
});