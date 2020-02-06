'use strict';

// перемещение окна
(function () {
  var wizardSetupDialog = document.querySelector('.setup');
  var dialogHandler = wizardSetupDialog.querySelector('.upload');

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var isDragged = false;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    // экспортируем изначальное положение окна настройки
    window.move = {
      dialogStartX: wizardSetupDialog.offsetLeft,
      dialogStartY: wizardSetupDialog.offsetTop
    };

    var mouseMoveHandle = function (moveEvt) {
      moveEvt.preventDefault();

      isDragged = true;

      var shift = {
        x: moveEvt.clientX - startCoords.x,
        y: moveEvt.clientY - startCoords.y
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      wizardSetupDialog.style.top = (wizardSetupDialog.offsetTop + shift.y) + 'px';
      wizardSetupDialog.style.left = (wizardSetupDialog.offsetLeft + shift.x) + 'px';
    };

    var mouseUpHandle = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandle);
      document.removeEventListener('mouseup', mouseUpHandle);

      if (isDragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();

          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', mouseMoveHandle);
    document.addEventListener('mouseup', mouseUpHandle);
  });
})();
