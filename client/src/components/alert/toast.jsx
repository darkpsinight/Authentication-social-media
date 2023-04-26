import React from 'react'

const Toast = ({ msg, handleShow, bgColor }) => {
  return (
    <div
      className={`toast show position-fixed text-light ${bgColor}`}
      style={{ top: '5px', right: '5px', minWidth: '200px', zIndex: 50 }}
    >
      <div className={`toast-header text-light ${bgColor}`}>
        <strong className="mr-auto text-light">
          {msg.title}
          <button
            className="close ml-2 mb-1 text-light"
            data-dismiss="toast"
            style={{ outline: 'none' }}
            onClick={handleShow}
          >
            &times;
          </button>
        </strong>
      </div>
      <div className="toast-body">{msg.body}</div>
    </div>
  )
}

export default Toast
