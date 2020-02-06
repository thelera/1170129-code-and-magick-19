'use strict';

// окно настройки персонажа
// создание похожих персонажей
(function () {
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var AMOUNT_OF_WIZARDS = 4;

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarWizardsList = document.querySelector('.setup-similar-list');
  var wizardSetupDialog = document.querySelector('.setup');

  var generateNumber = function (maxNumber) {
    return Math.round(Math.random() * (maxNumber - 1));
  };

  var generateWizards = function (amountOfWizards) {
    var wizards = [];
    for (var i = 0; i < amountOfWizards; i += 1) {
      wizards.push({
        name: NAMES[generateNumber(NAMES.length)] + ' ' + LASTNAMES[generateNumber(LASTNAMES.length)],
        coatColor: COAT_COLORS[generateNumber(COAT_COLORS.length)],
        eyesColor: EYES_COLORS[generateNumber(EYES_COLORS.length)]
      });
    }

    return wizards;
  };

  var wizards = generateWizards(AMOUNT_OF_WIZARDS);

  var cloneWizard = function (wizard) {
    var newWizard = similarWizardTemplate.cloneNode(true);

    newWizard.querySelector('.setup-similar-label').textContent = wizard.name;
    newWizard.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    newWizard.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return newWizard;
  };

  var createSimilarWizardsList = function (similarWizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < similarWizards.length; i += 1) {
      fragment.appendChild(cloneWizard(similarWizards[i]));
    }

    return fragment;
  };

  similarWizardsList.appendChild(createSimilarWizardsList(wizards));

  wizardSetupDialog.querySelector('.setup-similar').classList.remove('hidden');

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
