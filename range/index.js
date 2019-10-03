class Range extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dragging: false, 
      cx: 200,
      cy: 200
    }

    this.svgRef = React.createRef()
  }

  handleMouseMove = (e) => {
    const { svgRef, state: { dragging } } = this

    if (dragging) {
      const rect = svgRef.current.getBoundingClientRect()
      let x = Math.round(e.pageX - rect.left)
      let y = Math.round(e.pageY - rect.top)

      this.setState({cx: x, cy: y})
    }
  }

  render() {
    const { cx, cy } = this.state

    return (
      <div
        className='App'
        onMouseUp={(e) => { this.setState({dragging: false}) }}
      >
        <svg
          width={400}
          height={400}
          style={{background: 'indigo'}}
          ref={this.svgRef}
          onMouseMove={this.handleMouseMove}
        >
          <circle 
            cx={cx} 
            cy={cy} 
            r={10} 
            fill="white"
            onMouseDown={(e) => { this.setState({dragging: true}) }}
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