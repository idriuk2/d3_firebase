const Range = () => {

  return (
    <svg
      width={400}
      height={400}
      style={{background: 'indigo'}}
    >
      <circle cx={200} cy={200} r={10} fill="white"></circle>
    </svg>
  )
}

ReactDOM.render(
  <Range />,
  document.getElementById('root')
);