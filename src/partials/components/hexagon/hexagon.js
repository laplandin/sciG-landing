var getRandomInt = function (min, max) {
  var randomInt = Math.floor(Math.random() * (max + 1 - min)) + min;

  return randomInt;
};

var getRandomIndex = function (arrayLength) {
  var randomIndex = Math.floor(Math.random() * arrayLength);

  return randomIndex;
};

var hexagons = document.querySelectorAll(".hexagon__item");
function removeScale() {
  $(".zoomed").removeClass("zoomed");

  addRandomAnimation();
}

var addRandomAnimation = function () {
  var animatedHexagonsQuality = getRandomInt(2, 5);

  for (var i = 0; i < animatedHexagonsQuality; i++) {
    var randomHexagon = getRandomIndex(hexagons.length);
    var element = $(".hexagon__item").eq(randomHexagon);
    var hasClass = element.hasClass("zoomed");
    if (!hasClass) {
      element.addClass("zoomed");
      continue;
    }
    --i;
  }

  var timer = setTimeout(removeScale, 4500);
};

addRandomAnimation();
