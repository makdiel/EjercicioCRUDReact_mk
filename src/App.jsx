import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ListaUsuarios from './componentes/ListaUsuarios';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>        
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1> React</h1>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<ListaUsuarios />} />
      </Routes>
    </BrowserRouter>      
    </>
  )
}

export default App
