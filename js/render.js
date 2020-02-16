'use strict';

// отрисовка похожих персонажей
(function () {
  var AMOUNT_OF_WIZARDS = 4;

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similar = document.querySelector('.setup-similar');
  var similarWizardsList = document.querySelector('.setup-similar-list');

  var cloneWizard = function (wizard) {
    var newWizard = similarWizardTemplate.cloneNode(true);

    newWizard.querySelector('.setup-similar-label').textContent = wizard.name;
    newWizard.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    newWizard.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return newWizard;
  };

  window.render = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < AMOUNT_OF_WIZARDS; i += 1) {
      fragment.appendChild(cloneWizard(wizards[i]));
    }

    similarWizardsList.innerHTML = '';
    similarWizardsList.appendChild(fragment);
    similar.classList.remove('hidden');
  };
})();
