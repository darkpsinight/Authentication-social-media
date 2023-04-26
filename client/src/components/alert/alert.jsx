import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loading from './loading'
import Toast from './toast'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'

const Alert = () => {
  const { alert } = useSelector((state) => state)
  const dispatch = useDispatch()

  return (
    <div>
      {alert.loading && <Loading />}
      {alert.success && (
        <Toast
          msg={{ title: 'Success', body: alert.success }}
          handleShow={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })}
          bgColor="bg-success"
        />
      )}
      {alert.error && (
        <Toast
          msg={{ title: 'Error', body: alert.error }}
          handleShow={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })}
          bgColor="bg-danger"
        />
      )}
    </div>
  )
}

export default Alert
