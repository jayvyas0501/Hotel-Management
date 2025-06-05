import React from 'react'

const Button = ({Title}) => {
  return (
    <div>
      <button className="btn btn-primary">
        {Title}
      </button>
    </div>
  )
}

export default Button
