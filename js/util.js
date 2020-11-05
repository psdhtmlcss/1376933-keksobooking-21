'use strict';
const DEBOUNCE_INTERVAL_IN_MS = 500;
const Mouse = {
  LEFT_KEY_BUTTON: 0
};
const Keys = {
  ENTER_KEY: `Enter`,
  ESCAPE_KEY: `Escape`
};
const TestNumbers = {
  ten: 10,
  hundred: 100
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
    if (num > TestNumbers.ten && (Math.round((num % TestNumbers.hundred) / TestNumbers.ten)) === 1) {
      return `${num} ${genitivePlural}`;
    } else {
      switch (num % TestNumbers.ten) {
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

