import React from 'react'
import notFound404Img from '../images/not-found-404.jpg'

const NotFound = () => {
  return (
    <div
      className="position-relative"
      style={{
        minHeight: 'calc(100vh - 70px)',
        backgroundImage: `url(${notFound404Img})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain'
      }}
    >
      {/* 
      <h2
        className="position-absolute text-secondary"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        404 | Not Found
      </h2> */}
    </div>
  )
}

export default NotFound
