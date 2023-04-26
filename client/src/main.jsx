import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import DataProvider from './redux/store'

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
