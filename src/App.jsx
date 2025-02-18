import { useState } from 'react'
import MainArea from './Components/MainArea'

function App() {
  const [count, setCount] = useState(0)

  return ( 
    <>
      <MainArea/>
    </>
  )
}

export default App
