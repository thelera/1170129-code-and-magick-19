'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var wizardSetupWindow = document.querySelector('.setup');
wizardSetupWindow.classList.remove('hidden');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarWizardsList = document.querySelector('.setup-similar-list');

var generateNumber = function (maxNumber) {
  return Math.round(Math.random() * (maxNumber - 1));
};

var wizards = [
  {
    name: NAMES[generateNumber(NAMES.length)] + ' ' + LASTNAMES[generateNumber(LASTNAMES.length)],
    coatColor: COAT_COLORS[generateNumber(COAT_COLORS.length)],
    eyesColor: EYES_COLORS[generateNumber(EYES_COLORS.length)]
  },
  {
    name: NAMES[generateNumber(NAMES.length)] + ' ' + LASTNAMES[generateNumber(LASTNAMES.length)],
    coatColor: COAT_COLORS[generateNumber(COAT_COLORS.length)],
    eyesColor: EYES_COLORS[generateNumber(EYES_COLORS.length)]
  },
  {
    name: NAMES[generateNumber(NAMES.length)] + ' ' + LASTNAMES[generateNumber(LASTNAMES.length)],
    coatColor: COAT_COLORS[generateNumber(COAT_COLORS.length)],
    eyesColor: EYES_COLORS[generateNumber(EYES_COLORS.length)]
  },
  {
    name: NAMES[generateNumber(NAMES.length)] + ' ' + LASTNAMES[generateNumber(LASTNAMES.length)],
    coatColor: COAT_COLORS[generateNumber(COAT_COLORS.length)],
    eyesColor: EYES_COLORS[generateNumber(EYES_COLORS.length)]
  }
];

var createWizard = function (wizard) {
  var newWizard = similarWizardTemplate.cloneNode(true);

  newWizard.querySelector('.setup-similar-label').textContent = wizard.name;
  newWizard.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  newWizard.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return newWizard;
};


var createSimilarWizardsList = function (similarWizards) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < similarWizards.length; i += 1) {
    fragment.appendChild(createWizard(similarWizards[i]));
  }

  return fragment;
};

similarWizardsList.appendChild(createSimilarWizardsList(wizards));

wizardSetupWindow.querySelector('.setup-similar').classList.remove('hidden');
