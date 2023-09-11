import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store/store'
import { Theme } from '@radix-ui/themes'
import { toggleTheme } from './store/reducers/themeReducer'

function App() {
  const theme = useSelector((state: RootState)=>state.theme)
  const dispatch = useDispatch()

  return (
    <Theme className={`theme-wrapper ${theme}`}>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => dispatch(toggleTheme())}>
          toggleTheme
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </Theme>
  )
}

export default App
