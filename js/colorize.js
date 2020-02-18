'use strict';

// изменение цвета плаща, глаз, фаербола игрока
(function () {
  var getRandomColor = function (colors) {
    return colors[Math.round(Math.random() * (colors.length - 1))];
  };

  window.colorize = function (key, element, input, colors, wizards) {
    element.addEventListener('click', function () {
      var randomColor = getRandomColor(colors);

      if (element.tagName.toLowerCase() === 'div') {
        element.style.background = randomColor;
      } else {
        element.style.fill = randomColor;
      }

      input.value = randomColor;
      window.setup.player[key] = randomColor;
      window.sort(wizards, window.setup.player);

      window.debounce(function () {
        window.render(wizards);
      });
    });
  };
})();
