'use strict';

// открытие/закрытие окна настройки персонажа
(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var wizardSetupDialog = document.querySelector('.setup');
  var wizardSetupOpenButton = document.querySelector('.setup-open');
  var wizardSetupCloseButton = wizardSetupDialog.querySelector('.setup-close');
  var wizardSetupUserNameInput = wizardSetupDialog.querySelector('.setup-user-name');

  var wizardSetupDialogEscPressHandler = function (evt) {
    if (evt.key === ESC_KEY && wizardSetupUserNameInput !== document.activeElement) {
      closeWizardSetupDialog();
    }
  };

  var openWizardSetupDialog = function () {
    // импортируем изначальное положение окна настройки
    if (window.move) {
      wizardSetupDialog.style.left = window.move.dialogStartX + 'px';
      wizardSetupDialog.style.top = window.move.dialogStartY + 'px';
    }

    wizardSetupDialog.classList.remove('hidden');

    document.addEventListener('keydown', wizardSetupDialogEscPressHandler);
  };

  var closeWizardSetupDialog = function () {
    wizardSetupDialog.classList.add('hidden');

    document.removeEventListener('keydown', wizardSetupDialogEscPressHandler);
  };

  wizardSetupOpenButton.addEventListener('click', function () {
    openWizardSetupDialog();
  });

  wizardSetupOpenButton.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      openWizardSetupDialog();
    }
  });

  wizardSetupCloseButton.addEventListener('click', function () {
    closeWizardSetupDialog();
  });

  wizardSetupCloseButton.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      closeWizardSetupDialog();
    }
  });
})();
