import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  // uef -> onload
  useEffect(() => {
    fetch("http://localhost:8080/athletes")
      .then(res=>res.json())
      .then(json=>console.log(json))
  }, []);
  
  return (
    <>
    
    </>
  )
}

export default App
