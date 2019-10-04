class Range extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dragging: false, 
      cx: 44,
      cy: 194,
      r: 12
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

      this.setState({cx: x, cy: y, r: 16})
    }
  }

  handleMouseUp = () => {
    this.setState({ dragging: false, r: 12 })
  }

  handleMouseDown = () => {
    this.setState({ dragging: true, r: 16 })
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