'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var AMOUNT_OF_WIZARDS = 4;

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

var wizardSetupWindow = document.querySelector('.setup');

var generateNumber = function (maxNumber) {
  return Math.round(Math.random() * (maxNumber - 1));
};

// создание похожих персонажей
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarWizardsList = document.querySelector('.setup-similar-list');

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

// открытие/закрытие окна настройки персонажа
var wizardSetupOpenButton = document.querySelector('.setup-open');
var wizardSetupCloseButton = wizardSetupWindow.querySelector('.setup-close');
var wizardSetupUserNameInput = wizardSetupWindow.querySelector('.setup-user-name');

var wizardSetupWindowEscPressHandler = function (evt) {
  if (evt.key === ESC_KEY && wizardSetupUserNameInput !== document.activeElement) {
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
  if (evt.key === ENTER_KEY) {
    openWizardSetupWindow();
  }
});

wizardSetupCloseButton.addEventListener('click', function () {
  closeWizardSetupWindow();
});

wizardSetupCloseButton.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closeWizardSetupWindow();
  }
});

// изменение цвета мантии персонажа по нажатию
var wizardCoat = wizardSetupWindow.querySelector('.wizard-coat');

wizardCoat.addEventListener('click', function () {
  var randomCoatColor = COAT_COLORS[generateNumber(COAT_COLORS.length)];
  wizardCoat.style.fill = randomCoatColor;
  document.querySelector('input[name="coat-color"]').value = randomCoatColor;
});

// изменение цвета глаз персонажа по нажатию
var wizardEyes = wizardSetupWindow.querySelector('.wizard-eyes');

wizardEyes.addEventListener('click', function () {
  var randomEyesColor = EYES_COLORS[generateNumber(EYES_COLORS.length)];
  wizardEyes.style.fill = randomEyesColor;
  document.querySelector('input[name="eyes-color"]').value = randomEyesColor;
});

// изменение цвета фаерболов по нажатию
var wizardFireball = wizardSetupWindow.querySelector('.setup-fireball-wrap');

wizardFireball.addEventListener('click', function () {
  var randomFireballColor = FIREBALL_COLORS[generateNumber(FIREBALL_COLORS.length)];
  wizardFireball.style.background = randomFireballColor;
  wizardFireball.querySelector('input').value = randomFireballColor;
});
