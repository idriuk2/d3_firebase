const canvas = d3.select('.canvas')

const svg = canvas.append('svg').attr('height', 600).attr('width', 600)

svg.append('rect').attr('width', 200).attr('height', 100).attr('fill', 'blue').attr('x', 20)
svg.append('circle')
svg.append('line')