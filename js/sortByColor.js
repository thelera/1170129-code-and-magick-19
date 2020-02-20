'use strict';

// сортировка волшебников
(function () {
  window.sortByColor = function (wizards, player) {
    wizards.forEach(function (wizard) {
      wizard.rank = 0;
      if (wizard.colorCoat === player.colorCoat) {
        wizard.rank += 2;
      }
      if (wizard.colorEyes === player.colorEyes) {
        wizard.rank += 1;
      }
    });
    wizards.sort(function (a, b) {
      return b.rank - a.rank;
    });
  };
})();
