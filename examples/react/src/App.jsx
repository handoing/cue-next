import React, { useState, useEffect, useRef } from 'react'
import logo from './logo.svg'
import './App.css'
import Count from './Count.es.js'

function useCueComponent(CueComponent) {
  const container = useRef(null)
  useEffect(() => {
    container.current.appendChild(CueComponent())
  })
  return container
}

function App() {
  const [count, setCount] = useState(0)
  const countContainer = useCueComponent(Count)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
        <div ref={countContainer}></div>
      </header>
    </div>
  )
}

export default App