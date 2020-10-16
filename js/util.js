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
        [a[i], a[j]] = [a[j], a[i]];
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
      let str;
      if (num > 10 && (Math.round((num % 100) / 10)) == 1) {
        str = decTwo;
      } else {
        switch (num % 10) {
          case 1:
            str = decOne;
            break;
          case 2:
          case 3:
          case 4:
            str = decThree;
            break;
        }
        str = decTwo;
      };

      return `${num} ${str}`;
    }
  };
})();
