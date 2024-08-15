import { useRef, useState } from "react"
import "./App.css"
import Button from "./Button"

const getRandomPosition = (width, height) => {
  const x = Math.floor(Math.random() * width)
  const y = Math.floor(Math.random() * height)
  return { x, y }
}

function App() {
  const [points, setPoint] = useState()
  const [time, setTime] = useState({ seconds: 0, milliseconds: 0 })
  const [arrPoint, setArrPoint] = useState([])
  const [pointClick, setPointClick] = useState([])
  const [isGameOver, setIsGameOver] = useState(false)
  const [text, setText] = useState({
    value: `let's play`,
    color: "black",
  })
  const [textPlay, setTextPlay] = useState("Start")
  const intervalRef = useRef(null)

  const startTimer = () => {
    const startTime = Date.now()
    stopTimer()
    intervalRef.current = setInterval(() => {
      setTime(() => {
        const elapsedTime = Date.now() - startTime

        const seconds = Math.floor(elapsedTime / 1000)
        const milliseconds = elapsedTime % 1000
        return { seconds, milliseconds }
      })
    }, 1)
  }

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const onChangeInput = (e) => {
    if (Number(e.target.value) >= 0) {
      setPoint(Number(e.target.value))
    }
  }

  const onBlur = (e) => {
    if (Number(e.target.value) === NaN) {
      window.alert("The input point must be a number")
    }
  }

  const handlePlay = () => {
    if (points >= 0) {
      startTimer()
      setText({
        value: `let's play`,
        color: "black",
      })
      setPointClick([])
      setIsGameOver(false)
      const arr = Array.from({ length: points }).map((_, index) => {
        const { x, y } = getRandomPosition(600 - 50, 650 - 50)
        return { top: y, left: x, point: index + 1, isActive: false }
      })
      if (arr.length) {
        setTextPlay("Restart")
      }
      setArrPoint(arr)
    }
  }

  const handleButtonClick = (point) => {
    setArrPoint((prev) =>
      prev.map((el) => {
        if (el.point === point) {
          return { ...el, isActive: true }
        }
        return el
      })
    )
    if (isGameOver) {
      return
    }
    setTimeout(() => {
      const arr = [...pointClick, point]
      setPointClick(arr)
      arr.forEach((el, index) => {
        if (index === 0 && el !== 1) {
          setText({
            value: "game over",
            color: "red",
          })
          setIsGameOver(true)
          stopTimer()
        }
        if (index > 0) {
          const after = arr[index - 1]
          if (el - after !== 1) {
            setText({
              value: "game over",
              color: "red",
            })
            setIsGameOver(true)
            stopTimer()
          }
        }
      })
      const newArr = arrPoint.filter((el) => el.point !== point)
      setArrPoint(newArr)
      if (newArr.length === 0) {
        stopTimer()
        setText({
          value: "all cleared",
          color: "green",
        })
      }
    }, 500)
  }

  return (
    <div className="App">
      <div className="main">
        <h1 style={{ color: text?.color }}>{text.value}</h1>
        <div className="main-info">
          <p>Points</p>
          <input value={points} onChange={onChangeInput} onBlur={onBlur} />
        </div>
        <div className="main-info">
          <p>Time</p>
          <p>{Number(time.seconds + time.milliseconds / 1000).toFixed(2)}</p>
        </div>
        <button className="play" onClick={handlePlay}>
          {textPlay}
        </button>
        <div className="main-point">
          {arrPoint.length > 0 ? (
            arrPoint.map((el) => (
              <Button
                point={el?.point}
                top={el?.top}
                left={el?.left}
                key={el?.point}
                getPoint={handleButtonClick}
                isActive={el?.isActive}
              />
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
