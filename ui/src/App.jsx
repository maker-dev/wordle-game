import { useEffect, useState } from 'react'
import './App.css'
import useWorlde from './hooks/useWorlde';
import Worlde from './components/Worlde';

function App() {

  const [isGameStarted, setIsGameStarted] = useState(false);
  const {startGame} = useWorlde();


  useEffect(() => {
    startGame().then(res => res.status === 200 ? setIsGameStarted(true) : setIsGameStarted(false));

  }, []);


  return (
    <>
      <div id='App'>
        <h1>Wordle Game</h1>
        {isGameStarted && <Worlde />}
      </div>
      
    </>
  )
}

export default App
