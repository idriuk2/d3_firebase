const svg = d3.select('.canvas')
  .append('svg')
  .attr('width', 400)
  .attr('height', 400);

const graph = svg.append('g')
  /* .attr("transform", `translate(200, 200)`); */

const arc = graph.append('path')
  .attr('class', 'arc')
  .attr('stroke', '#fff')
  .attr('stroke-width', 1)
  .attr('stroke-dasharray', 5)
  .attr('fill', 'transparent')
  .attr('d', circlePath(200, -210, 300, 150, 210))

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