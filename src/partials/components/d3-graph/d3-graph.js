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
