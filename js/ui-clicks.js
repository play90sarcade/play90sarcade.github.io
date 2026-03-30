/**
 * Short UI click sound on navigation links and primary buttons (not in-game canvas).
 */
(function () {
  'use strict';

  function shouldPlay(target) {
    if (!target || !target.closest) return false;
    if (target.closest('canvas')) return false;
    /* Game pages: avoid double-beep on controls that already play sounds */
    if (target.closest('.letter-btn')) return false;
    if (target.closest('.memory-card')) return false;
    if (target.closest('.pad-btn')) return false;
    if (target.closest('#btnUp, #btnDown, #btnLeft, #btnRight, #btnRotate')) return false;
    if (target.closest('.btn-play-again')) return false;
    var el = target.closest('a[href], button, .game-card, .back-link, .logo, .site-header nav a, .site-footer nav a');
    if (!el) return false;
    if (el.tagName === 'A' && (!el.getAttribute('href') || el.getAttribute('href') === '#')) return false;
    if (el.tagName === 'BUTTON' && el.disabled) return false;
    return true;
  }

  document.addEventListener('click', function (e) {
    if (!shouldPlay(e.target)) return;
    if (typeof window.playUiClickSound === 'function') window.playUiClickSound();
  }, true);
})();
