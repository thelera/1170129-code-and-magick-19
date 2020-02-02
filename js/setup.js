'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var AMOUNT_OF_WIZARDS = 4;

var wizardSetupWindow = document.querySelector('.setup');
var wizardSetupOpenButton = document.querySelector('.setup-open');
var wizardSetupCloseButton = wizardSetupWindow.querySelector('.setup-close');
var wizardSetupUserNameInput = wizardSetupWindow.querySelector('.setup-user-name');
var wizardSetupSubmitButton = wizardSetupWindow.querySelector('.setup-submit');

console.dir(document.querySelector('.setup-wizard-form'));

// открытие/закрытие окна настройки персонажа
var wizardSetupWindowEscPressHandler = function (evt) {
  if (evt.key === 'Escape' && wizardSetupUserNameInput !== document.activeElement) {
    closeWizardSetupWindow();
  }
};

var openWizardSetupWindow = function () {
  wizardSetupWindow.classList.remove('hidden');

  document.addEventListener('keydown', wizardSetupWindowEscPressHandler);
};

var closeWizardSetupWindow = function () {
  wizardSetupWindow.classList.add('hidden');

  document.removeEventListener('keydown', wizardSetupWindowEscPressHandler);
};

wizardSetupOpenButton.addEventListener('click', function () {
  openWizardSetupWindow();
});

wizardSetupOpenButton.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openWizardSetupWindow();
  }
});

wizardSetupCloseButton.addEventListener('click', function () {
  closeWizardSetupWindow();
});

wizardSetupCloseButton.addEventListener('keydown', function (evt) {
  if(evt.key === 'Enter') {
    closeWizardSetupWindow();
  }
});

wizardSetupSubmitButton.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    
  }
});

// создание похожих персонажей
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarWizardsList = document.querySelector('.setup-similar-list');

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

wizardSetupWindow.querySelector('.setup-similar').classList.remove('hidden');
