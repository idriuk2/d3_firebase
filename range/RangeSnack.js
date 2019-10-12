import React, { Component } from 'react';
import { StyleSheet, View, PanResponder, Animated } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
}

function getSvgDimensions(arcPath, radiusDrag, arcStart, arcEnd ) {
  const path = require("svg-path-properties")
  const properties = path.svgPathProperties(arcPath)
  const arcLength = properties.getTotalLength()
  const canvasHeight = properties.getPointAtLength(arcLength / 2).y + radiusDrag
  const canvasWidth = arcEnd.x + arcStart.x

  return { canvasWidth, canvasHeight }
}

const RADIUS = 14
const RADIUS_DRAG = 20

const ARC_CENTER_X = 170
const ARC_CENTER_Y = -240
const ARC_RADIUS = 300
const ARC_START_ANGLE = 150
const ARC_END_ANGLE = 210

const start = polarToCartesian(ARC_CENTER_X, ARC_CENTER_Y, ARC_RADIUS, ARC_END_ANGLE)
const end = polarToCartesian(ARC_CENTER_X, ARC_CENTER_Y, ARC_RADIUS, ARC_START_ANGLE)
const arcPath = `M ${start.x} ${start.y} A ${ARC_RADIUS} ${ARC_RADIUS} 0 0 0 ${end.x} ${end.y}`

const { canvasWidth, canvasHeight } = getSvgDimensions(arcPath, RADIUS_DRAG, start, end)

class Range extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dragging: false, 
      cx: start.x,
      cy: start.y,
      r: RADIUS,

      memX: false,
      memY: false,

      anim: new Animated.Value(0)
    }

    this.panResponder = {}
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
      onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminate: this.handlePanResponderEnd,
    })
  }

  handleStartShouldSetPanResponder = () => {
    return true
  }

  handlePanResponderGrant = () => {
    const { cx, cy, anim } = this.state

    this.setState({ 
      dragging: true, 
      r: RADIUS_DRAG,
      memX: cx,
      memY: cy 
    })

    Animated.spring(
      anim,
      {
        toValue: 1,
        friction: 3
      }
    ).start();
  }

  handlePanResponderMove = (e, gestureState) => {

    if (this.state.dragging) {
      const { memX, memY} = this.state

      let x = memX + gestureState.dx
      let y = memY + gestureState.dy

      const cx = x < start.x ? start.x : 
                     x > end.x ? end.x : 
                     x 

      const dX = ARC_CENTER_X - cx
      const cy = Math.sqrt(Math.pow(ARC_RADIUS, 2) - Math.pow(dX, 2)) + ARC_CENTER_Y

      this.setState({cx , cy})
    }
  }

  handlePanResponderEnd = (e, gestureState) => {
    const { anim } = this.state

    this.setState({
      dragging: false, 
      r: RADIUS
    })

    Animated.spring(
      anim,
      {
        toValue: 0,
        friction: 3
      }
    ).start();
  }

  render() {
    const { cx, cy, anim } = this.state
    const r = anim.interpolate({
      inputRange: [0, 1],
      outputRange: [RADIUS, RADIUS_DRAG]
    })

    return (
      <View style={styles.container}>
        <View
          style={[
            StyleSheet.absoluteFill,
            { alignItems: 'center', justifyContent: 'center' },
          ]}>
          <Svg 
            width={canvasWidth}
            height={canvasHeight}
          >
            <Path
              stroke="#fff" 
              strokeWidth="1" 
              strokeDasharray="5" 
              fill="transparent" 
              d={arcPath}
            />
            <AnimatedCircle 
              cx={cx} 
              cy={cy} 
              r={r} 
              fill="white"
              {...this.panResponder.panHandlers}
            />
          </Svg>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'indigo'
  }
})

export default function App() {
  return (
    <View style={styles.container}>
      <Range />
    </View>
  );
}