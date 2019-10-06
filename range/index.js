const RADIUS = 12
const RADIUS_DRAG = 16

const ARC_CENTER_X = 170
const ARC_CENTER_Y = -240
const ARC_RADIUS = 300
const ARC_START_ANGLE = 150
const ARC_END_ANGLE = 210

const start = polarToCartesian(ARC_CENTER_X, ARC_CENTER_Y, ARC_RADIUS, ARC_END_ANGLE)
const end = polarToCartesian(ARC_CENTER_X, ARC_CENTER_Y, ARC_RADIUS, ARC_START_ANGLE)
const arcPath = `M ${start.x} ${start.y} A ${ARC_RADIUS} ${ARC_RADIUS} 0 0 0 ${end.x} ${end.y}`

class Range extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      canvasWidth: 0,
      canvasHeight: 0,
      dragging: false, 
      cx: start.x,
      cy: start.y,
      r: RADIUS
    }

    this.svgRef = React.createRef()
    this.pathRef = React.createRef()
  }

  componentDidMount() {
    const arcLength = this.pathRef.current.getTotalLength()
    const canvasHeight = this.pathRef.current.getPointAtLength(arcLength / 2).y + RADIUS_DRAG
    const canvasWidth = end.x + start.x

    this.setState({canvasWidth, canvasHeight})
  }

  handleMouseMove = (e) => {
    const { svgRef, state: { dragging } } = this

    if (dragging) {
      const rect = svgRef.current.getBoundingClientRect()
      let x = Math.round(e.pageX - rect.left)
      let y = Math.round(e.pageY - rect.top)

      const cx = x < start.x ? start.x : 
                     x > end.x ? end.x : 
                     x 

      const dX = ARC_CENTER_X - cx
      const cy = Math.sqrt(Math.pow(ARC_RADIUS, 2) - Math.pow(dX, 2)) + ARC_CENTER_Y

      this.setState({cx , cy})
    }
  }

  handleMouseUp = () => {
    this.setState({ dragging: false, r: RADIUS })
  }

  handleMouseDown = () => {
    this.setState({ dragging: true, r: RADIUS_DRAG })
  }

  render() {
    const { canvasWidth, canvasHeight, cx, cy, r } = this.state

    return (
      <div
        className='App'
        onMouseUp={this.handleMouseUp}
      >
        <svg
          width={canvasWidth}
          height={canvasHeight}
          style={{background: 'indigo'}}
          ref={this.svgRef}
          onMouseMove={this.handleMouseMove}
        >
          <path
            ref={this.pathRef} 
            className="arc" 
            stroke="#fff" 
            strokeWidth="1" 
            strokeDasharray="5" 
            fill="transparent" 
            d={arcPath}>
          </path>
          <circle 
            cx={cx} 
            cy={cy} 
            r={r} 
            fill="white"
            onMouseDown={this.handleMouseDown}
          ></circle>
        </svg>
      </div>
    )
  }
  
}

ReactDOM.render(
  <Range />,
  document.getElementById('root')
);

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}