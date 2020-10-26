'use strict';
(function () {

  const moveMainPin = () => {
    window.form.pinMain.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      if (window.pins.map.classList.contains('map--faded') && evt.button === util.Mouse.LEFT_KEY_BUTTON) {
        window.pins.create();
      };

      let startCoordinates = {
        x: evt.clientX,
        y: evt.clientY
      };

      const onMouseMove = (moveEvt) => {
        moveEvt.preventDefault();

        let shift = {
          x: startCoordinates.x - moveEvt.clientX,
          y: startCoordinates.y - moveEvt.clientY
        };

        startCoordinates = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        window.form.pinMain.style.top = (window.form.pinMain.offsetTop - shift.y) + 'px';
        window.form.pinMain.style.left = (window.form.pinMain.offsetLeft - shift.x) + 'px';
        window.form.setCoordinates();
      };

      const onMouseUp = (upEvt) => {
        upEvt.preventDefault();

        window.form.setCoordinates();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  moveMainPin();
})();
