'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_SHADOW_SIZE = 10;

var PADDING_TOP = 15;
var PADDING_BOTTOM = 15;
var PADDING_LEFT = 30;

var BAR_WIDTH = 40;// ширина колонки
var MAX_BAR_HEIGHT = 150;// высота гистограммы
var BAR_GAP = 50;// расстояние между колонками

var PLAYER_NAME = 'Вы';
var PLAYER_BAR_COLOR = 'rgb(255, 0, 0, 1)';

var FONT_SIZE = 16;
var FONT_STYLE = 'PT Mono';
var FONT_GAP = 5;

window.renderStatistics = function (ctx, names, times) {
  if (names.length !== times.length) {
    if (names.length > times.length) {
      names = names.slice(0, times.length);
    } else {
      times = times.slice(0, names.length);
    }
  }

  renderCloud(ctx, 'rgba(0, 0, 0, 0.7)', CLOUD_X + CLOUD_SHADOW_SIZE, CLOUD_Y + CLOUD_SHADOW_SIZE);
  renderCloud(ctx, '#ffffff', CLOUD_X, CLOUD_Y);

  ctx.fillStyle = '#000000';

  ctx.font = FONT_SIZE + 'px ' + FONT_STYLE;
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + PADDING_LEFT, CLOUD_Y + PADDING_TOP);
  ctx.fillText('Список результатов: ', CLOUD_X + PADDING_LEFT, CLOUD_Y + PADDING_TOP + FONT_GAP + FONT_SIZE);

  var maxSpeed = getMaxNumber(times);

  for (var i = 0; i < names.length; i += 1) {
    var barHeight = (MAX_BAR_HEIGHT * times[i]) / maxSpeed;// высота колонки текущего игрока

    if (names[i] === PLAYER_NAME) {
      ctx.fillStyle = PLAYER_BAR_COLOR;
    } else {
      ctx.fillStyle = 'hsl(240, ' + Math.round(Math.random() * 100) + '%, ' + Math.round(Math.random() * 100) + '%)';
    }

    ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - barHeight - PADDING_BOTTOM - FONT_SIZE - FONT_GAP, BAR_WIDTH, barHeight);
    ctx.fillStyle = '#000000';

    ctx.fillText(Math.round(times[i]), CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - barHeight - PADDING_BOTTOM - 2 * FONT_SIZE - 2 * FONT_GAP);
    ctx.fillText(names[i], CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - PADDING_BOTTOM - FONT_SIZE);
  }
};

var renderCloud = function (ctx, color, startX, startY) {
  ctx.fillStyle = color;
  ctx.strokeStyle = '#000000';
  ctx.fillRect(startX, startY, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.strokeRect(startX, startY, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxNumber = function (numbers) {
  var result = numbers[0];

  for (var i = 1; i < numbers.length; i += 1) {
    if (numbers[i] > result) {
      result = numbers[i];
    }
  }

  return result;
};
