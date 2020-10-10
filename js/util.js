'use strict';
(function() {
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
    }
  };
})();
