const ProgressBar = ({ progress }) => {

  const colors = [
    'rgb(76, 237, 176)',
    'rgb(247, 37, 27)',
    'rgb(228, 71, 32)',
    'rgb(153, 108, 221)',
    'rgb(165, 228, 94)',
    'rgb(28, 187, 235)',
    'rgb(140, 58, 241)',
    'rgb(230, 233, 66)',
    'rgb(254, 115, 63)',
    'rgb(155, 252, 48)'
  ]

  const randomColor = colors[Math.floor(Math.random() * colors.length)]

  return (
    <div className="outer-bar">
      <div 
        className="inner-bar"
        style={{width: `${progress}%`, backgroundColor: randomColor}}
        ></div>
    </div>
  )
}

export default ProgressBar