import React from 'react'
//To provide a redux store to a react application, the react-redux library exposes a component called a Provider
import { Provider } from 'react-redux'
import './App.css'
import CakeContainer from '../src/components/CakeContainer'
import store from './redux/store'


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <CakeContainer />
      </div>
    </Provider>
  )
}

export default App
