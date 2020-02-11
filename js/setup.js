'use strict';

// окно настройки персонажа
// создание похожих персонажей
(function () {
  var AMOUNT_OF_WIZARDS = 4;
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarWizardsList = document.querySelector('.setup-similar-list');
  var wizardSetupDialog = document.querySelector('.setup');
  var wizardSetupForm = document.querySelector('.setup-wizard-form');

  var generateNumber = function (maxNumber) {
    return Math.round(Math.random() * (maxNumber - 1));
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
  var cloneWizard = function (wizard) {
    var newWizard = similarWizardTemplate.cloneNode(true);

    newWizard.querySelector('.setup-similar-label').textContent = wizard.name;
    newWizard.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    newWizard.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return newWizard;
  };

  var loadHandler = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < AMOUNT_OF_WIZARDS; i += 1) {
      fragment.appendChild(cloneWizard(wizards[generateNumber(wizards.length)]));
    }

    similarWizardsList.appendChild(fragment);
    wizardSetupDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  window.backend.load(loadHandler, errorHandler);

  // изменение цвета мантии персонажа по нажатию
  var wizardCoat = wizardSetupDialog.querySelector('.wizard-coat');
  var wizardCoatInput = wizardSetupDialog.querySelector('input[name="coat-color"]');

  window.colorize(wizardCoat, wizardCoatInput, COAT_COLORS);

  // изменение цвета глаз персонажа по нажатию
  var wizardEyes = wizardSetupDialog.querySelector('.wizard-eyes');
  var wizardEyesInput = wizardSetupDialog.querySelector('input[name="eyes-color"]');

  window.colorize(wizardEyes, wizardEyesInput, EYES_COLORS);

  // изменение цвета фаерболов по нажатию
  var wizardFireball = wizardSetupDialog.querySelector('.setup-fireball-wrap');
  var wizardFireballInput = wizardFireball.querySelector('input');

  window.colorize(wizardFireball, wizardFireballInput, FIREBALL_COLORS);
})();

// var getJSONPData = function (data) {
//   console.log(data);
// };

// var loader = document.createElement('script');
// loader.src = 'https://js.dump.academy/code-and-magick/data?callback=getJSONPData';
// document.body.appendChild(loader);
