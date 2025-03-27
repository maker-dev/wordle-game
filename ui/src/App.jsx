import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch("http://localhost/php/wordle-game/api/get_random_word.php")
    .then(res => res.json())
    .then(res => setMessage(res.response));
  }, []);

  return (
    <>
      <h1>Wordlegame</h1>
      <p>{message}</p>
    </>
  )
}

export default App
