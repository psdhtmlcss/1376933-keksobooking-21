'use strict';
const DEBOUNCE_INTERVAL_IN_MS = 500;
const Mouse = {
  LEFT_KEY_BUTTON: 0
};
const Keys = {
  ENTER_KEY: `Enter`,
  ESCAPE_KEY: `Escape`
};

window.util = {
  Mouse,
  Keys,

  isOnMousedown: (evt, action) => {
    if (evt.button === Mouse.LEFT_KEY_BUTTON) {
      evt.preventDefault();
      action();
    }
  },

  isPressEnter: (evt, action) => {
    if (evt.key === Keys.ENTER_KEY) {
      evt.preventDefault();
      action();
    }
  },

  isPressEscape: (evt, action) => {
    if (evt.key === Keys.ESCAPE_KEY) {
      evt.preventDefault();
      action();
    }
  },

  returnDeclination: (num, nominative, genitiveSingular, genitivePlural) => {
    if (num > 10 && (Math.round((num % 100) / 10)) === 1) {
      return `${num} ${genitivePlural}`;
    } else {
      switch (num % 10) {
        case 1: return `${num} ${nominative}`;
        case 2:
        case 3:
        case 4: return `${num} ${genitiveSingular}`;
      }
      return `${num} ${genitivePlural}`;
    }
  },

  debounce: (cb) => {
    let lastTimeout = null;

    return () => {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb();
      }, DEBOUNCE_INTERVAL_IN_MS);
    };
  }
};

