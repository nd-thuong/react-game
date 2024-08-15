import React from "react"

const Button = ({ point, top, left, getPoint, isActive = false }) => {
  const handleOnClick = (value) => {
    getPoint(value)
  }
  return (
    <button
      className={`point ${isActive ? "point-active" : ""}`}
      style={{ top: `${top}px`, left: `${left}px` }}
      onClick={() => handleOnClick(point)}>
      {point}
    </button>
  )
}

export default Button
