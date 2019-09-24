const svg = d3.select('.canvas')
  .append('svg')
  .attr('width', 400)
  .attr('height', 400);

svg.append("defs").append("path")
    .attr("id", "arc")
    .attr("d", circlePath(100, 100, 100, 0, 90));

var thing = svg.append("g")
    .attr("id", "thing")
    .style("fill", "navy");

thing.append("text")
    .style("font-size", "20px")
  .append("textPath")
    .attr("xlink:href", "#arc")
    .text("Wavy text is the gimmick for many years to come (d3)");

thing.append("use")
    .attr("xlink:href", "#arc")
    .style("stroke", "black")
    .style("fill", "none");

  function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  }

  function circlePath(x, y, radius, startAngle, endAngle) {
    var start = polarToCartesian(x, y, radius, endAngle * 0.9999);
    var end = polarToCartesian(x, y, radius, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    var d = ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y];
    return d.join(' ');
  }