'use strict';

// окно настройки персонажа
// создание похожих персонажей
(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var wizardSetupDialog = document.querySelector('.setup');
  var wizardSetupForm = document.querySelector('.setup-wizard-form');

  var wizardCoat = wizardSetupDialog.querySelector('.wizard-coat');
  var wizardCoatInput = wizardSetupDialog.querySelector('input[name="coat-color"]');

  var wizardEyes = wizardSetupDialog.querySelector('.wizard-eyes');
  var wizardEyesInput = wizardSetupDialog.querySelector('input[name="eyes-color"]');

  var wizardFireball = wizardSetupDialog.querySelector('.setup-fireball-wrap');
  var wizardFireballInput = wizardFireball.querySelector('input');

  // начальные настройки мантии, глаз и фаербола игрока
  window.setup = {
    player: {
      colorCoat: wizardCoat.style.fill,
      colorEyes: EYES_COLORS[0],
      colorFireball: wizardFireball.style.background
    }
  };

  // отправка данных на сервер
  var uploadHandler = function () {
    wizardSetupDialog.classList.add('hidden');
  };

  var errorHandler = function (errorMessage) {
    var errorPopup = document.createElement('div');
    errorPopup.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    errorPopup.style.position = 'absolute';
    errorPopup.style.left = 0;
    errorPopup.style.right = 0;
    errorPopup.style.fontSize = '30px';

    errorPopup.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorPopup);
  };

  wizardSetupForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(wizardSetupForm), uploadHandler, errorHandler);
  });

  // загрузка данных с сервера
  var allWizards;
  var successHandler = function (wizards) {
    allWizards = wizards;
    window.sort(allWizards, window.setup.player);

    window.render(allWizards);

    window.colorize('colorFireball', wizardFireball, wizardFireballInput, FIREBALL_COLORS, allWizards);
    window.colorize('colorCoat', wizardCoat, wizardCoatInput, COAT_COLORS, allWizards);
    window.colorize('colorEyes', wizardEyes, wizardEyesInput, EYES_COLORS, allWizards);
  };

  window.backend.load(successHandler, errorHandler);
})();

// var getJSONPData = function (data) {
//   console.log(data);
// };

// var loader = document.createElement('script');
// loader.src = 'https://js.dump.academy/code-and-magick/data?callback=getJSONPData';
// document.body.appendChild(loader);
