class Range extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dragging: false, 
      cx: 200,
      cy: 200,
      r: 12
    }

    this.svgRef = React.createRef()
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
            class="arc" 
            stroke="#fff" 
            stroke-width="1" 
            stroke-dasharray="5" 
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