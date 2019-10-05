const RADIUS = 12
const RADIUS_DRAG = 16

const START_X = 50
const START_Y = 200

const ARC_X = 200
const ARC_Y = -60
const ARC_RADIUS = 300

class Range extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dragging: false, 
      cx: START_X,
      cy: START_Y,
      r: RADIUS
    }

    this.svgRef = React.createRef()
    this.pathRef = React.createRef()
  }

  handleMouseMove = (e) => {
    const { svgRef, state: { dragging } } = this

    if (dragging) {
      const rect = svgRef.current.getBoundingClientRect()
      let x = Math.round(e.pageX - rect.left)
      let y = Math.round(e.pageY - rect.top)

      const rangeX = x < 50 ? 50 : 
          x > 350 ? 350 : x 

      const deltaX = ARC_X - rangeX
      const rangeY = Math.sqrt(Math.pow(ARC_RADIUS, 2) - Math.pow(deltaX, 2)) + ARC_Y

      this.setState({cx: rangeX, cy: rangeY})
    }
  }

  handleMouseUp = () => {
    this.setState({ dragging: false, r: RADIUS })
  }

  handleMouseDown = () => {
    this.setState({ dragging: true, r: RADIUS_DRAG })
    console.log('path length', this.pathRef.current.getTotalLength())
    console.log('point coordinates ', this.pathRef.current.getPointAtLength(150))
  }

  render() {
    const { cx, cy, r } = this.state

    return (
      <div
        className='App'
        onMouseUp={this.handleMouseUp}
      >
        <svg
          width={400}
          height={400}
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
            d="M 50 200 A 300 300 0 0 0 350 200">
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