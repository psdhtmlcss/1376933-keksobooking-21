'use strict';
(function () {
  const Mouse = {
    LEFT_KEY_BUTTON: 0
  };
  const Keys = {
    ENTER_KEY: 'Enter'
  };

  window.util = {
    getRandom: function (min, max) {
      let x = Math.floor(Math.random() * (max - min) + min);
      return x;
    },

    shaffleArray: function (a) {
      let i;
      let j;
      let x;
      for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[j] = x;
      }

      return a;
    },

    isOnMousedown: function (evt, action) {
      if (evt.button === Mouse.LEFT_KEY_BUTTON) {
        evt.preventDefault();
        action();
      }
    },

    isPressEnter: function (evt, action) {
      if (evt.key === Keys.ENTER_KEY) {
        evt.preventDefault();
        action();
      }
    },

    returnDeclination: function (num, decOne, decTwo, decThree) {
      let result = '';
      let str = num.toString();
      let lastSymbol = str[str.length - 1];
      let penultimateSymbol = str[str.length - 2];

      if (num < 10) {
        if (num === 1) {
          result = `${num} ${decOne}`;
        };

        if (num > 1 && num < 5) {
          result = `${num} ${decTwo}`;
        };

        if (num > 4 || num === 0) {
          result = `${num} ${decThree}`;
        };
      } else {
        if (lastSymbol === '1' && penultimateSymbol !== '1') {
          result = `${num} ${decOne}`;
        } else if (lastSymbol > '1' && lastSymbol < '5' && penultimateSymbol !== '1') {
          result = `${num} ${decTwo}`;
        } else {
          result = `${num} ${decThree}`;
        }
      }

      return result;
    }
  };
})();
