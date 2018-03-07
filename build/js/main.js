var svg = d3.select("#d3-graph"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    color = d3.scaleOrdinal(d3.schemeCategory10);

var a = {id: "a", fx: 50, fy: 200, fixed: true},
    b = {id: "b", fx: 200, fy: 100, fixed: true},
    c = {id: "c", fx: 350, fy: 200, fixed: true},
    d = {id: "d", fx: 380, fy: 90, fixed: true},
    e = {id: "e", fx: 250, fy: 300, fixed: true},
    f = {id: "f", fx: 360, fy: 320, fixed: true},
    j = {id: "j", fx: 280, fy: 370, fixed: true},
    h = {id: "h", fx: 120, fy: 330, fixed: true},
    i = {id: "i", fx: 30, fy: 50, fixed: true},
    nodes = [],
    links = [];


var simulation = d3.forceSimulation(nodes)
    .force("charge", d3.forceManyBody().strength(-200))
    .force("link", d3.forceLink(links).distance(100))
    .force("x", d3.forceX())
    .force("y", d3.forceY())
    .alphaTarget(1)
    .on("tick", ticked);

var g = svg.append("g"),
    link = g.append("g").attr("stroke", "#9ee0df").attr("stroke-width", 5).selectAll(".link"),
    node = g.append("g").attr("stroke", "#9ee0df").attr("stroke-width", 5).selectAll(".node");

restart();
var delay = 1500;

var _nodes = nodes.slice();
var _links = links.slice();

function loop () {
  nodes = _nodes.slice();
  links = _links.slice();
  step7();
};

function step7 () {
  restart();
  setTimeout(step0, delay);
};

function step0 () {
  nodes.push(a);
  restart();
  setTimeout(step1, delay);
};

function step1 () {
  nodes.push(b);
  links.push({source: a, target: b});
  restart();
  setTimeout(step2, delay);
};

function step2 () {
  nodes.push(c);
  links.push({source: b, target: c});
  restart();
  setTimeout(step3, delay);
};

function step3 () {
  nodes.push(d);
  nodes.push(e);
  links.push({source: b, target: e});
  links.push({source: c, target: d});
  restart();
  setTimeout(step4, delay);
};

function step4 () {
  nodes.push(f);
  nodes.push(j);
  nodes.push(h);
  nodes.push(i);
  links.push({source: c, target: f});
  links.push({source: e, target: j});
  links.push({source: e, target: h});
  links.push({source: a, target: i});
  links.push({source: e, target: c});
  restart();
  setTimeout(loop, delay);
};

step1();

function restart() {

  // Apply the general update pattern to the nodes.
  node = node.data(nodes, function(d) { return d.id;});
  node.exit().remove();
  node = node.enter().append("circle").attr("fill", function(d) { return color(d.id); }).attr("r", 10).merge(node);

  // Apply the general update pattern to the links.
  link = link.data(links, function(d) { return d.source.id + "-" + d.target.id; });
  link.exit().remove();
  link = link.enter().append("line").merge(link);

  // Update and restart the simulation.
  simulation.nodes(nodes);
  simulation.force("link").links(links);
  simulation.alpha(1).restart();
}

function ticked() {
  node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })

  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });
}

$(document).ready(function() {
	$('#fullpage').fullpage({
		//Navigation
		menu: '#menu',
		lockAnchors: false,
		anchors:['1', '2', '3', '4', '5'],
		navigation: false,
		navigationPosition: 'right',
		navigationTooltips: ['firstSlide', 'secondSlide'],
		showActiveTooltip: false,
		slidesNavigation: false,
		slidesNavPosition: 'bottom',

		//Scrolling
		css3: true,
		scrollingSpeed: 700,
		autoScrolling: true,
		fitToSection: true,
		fitToSectionDelay: 1000,
		scrollBar: false,
		easing: 'easeInOutCubic',
		easingcss3: 'ease',
		loopBottom: false,
		loopTop: false,
		loopHorizontal: true,
		continuousVertical: false,
		continuousHorizontal: false,
		scrollHorizontally: false,
		interlockedSlides: false,
		dragAndMove: false,
		offsetSections: false,
		resetSliders: false,
		fadingEffect: false,
		normalScrollElements: '#element1, .element2',
		scrollOverflow: false,
		scrollOverflowReset: false,
		scrollOverflowOptions: null,
		touchSensitivity: 15,
		normalScrollElementTouchThreshold: 5,
		bigSectionsDestination: null,

		//Accessibility
		keyboardScrolling: true,
		animateAnchor: true,
		recordHistory: true,

		//Design
		controlArrows: true,
		verticalCentered: true,
		paddingTop: '100px',
		paddingBottom: '15px',
		responsiveWidth: 0,
		responsiveHeight: 0,
		responsiveSlides: false,
		parallax: false,
		parallaxOptions: {type: 'reveal', percentage: 62, property: 'translate'},

		//Custom selectors
		sectionSelector: '.section',
		slideSelector: '.slide',

		lazyLoading: true,

		//events
		onLeave: function(index, nextIndex, direction){
      if (nextIndex === 5) {
        var i = 0;
        function addHightlight () {
          var activeItem = $("#hightlight li");

            activeItem.eq(i % 3).addClass('active');
            var timer = setTimeout(removeHightlight, 4500);
        };

        function removeHightlight () {
          $("#hightlight li.active").removeClass("active");
          i++;
          addHightlight();
        };

        addHightlight();
      }

      if (nextIndex === 6) {
        var i = 0;
        function addBold () {
          var activeItem = $(".section__column p");

            activeItem.eq(i % 3).addClass('active');
            var timer = setTimeout(removeBold, 4500);
        };

        function removeBold () {
          $(".section__column p.active").removeClass("active");
          i++;
          addBold();
        };

        addBold();
      }
    },
		afterLoad: function(anchorLink, index){},
		afterRender: function(){},
		afterResize: function(){},
		afterResponsive: function(isResponsive){},
		afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){},
		onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){}
	});
});

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

particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 100,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },

    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#9ee0df"
      },
      "polygon": {
        "nb_sides": 5
      },
    },
    "opacity": {
      "value": 0.2,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 30,
        "size_min": 0.1,
        "sync": true
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false
      },
      "onclick": {
        "enable": false
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});

$(window).on('load', function() {
   console.log('jquery + scripts builds Ok');
});
