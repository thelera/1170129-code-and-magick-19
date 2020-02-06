'use strict';

(function () {
  var getRandomColor = function (colors) {
    return colors[Math.round(Math.random() * (colors.length - 1))];
  };

  window.colorize = function (element, input, colors) {
    element.addEventListener('click', function () {
      var randomColor = getRandomColor(colors);
      if (element.tagName.toLowerCase() === 'div') {
        element.style.background = randomColor;
      } else {
        element.style.fill = randomColor;
      }

      input.value = randomColor;
    });
  };
})();
