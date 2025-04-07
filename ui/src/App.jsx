import { useEffect, useState } from 'react'
import './App.css'
import useWordle from './hooks/useWordle';
import Wordle from './components/Wordle';

function App() {

  const [isGameStarted, setIsGameStarted] = useState(false);
  const {startGame} = useWordle();


  useEffect(() => {
    startGame().then(res => res.status === 200 ? setIsGameStarted(true) : setIsGameStarted(false));
  }, [startGame]);


  return (
    <div id='App'>
      <header className="game-header">
        <h1>Wordle Game</h1>
      </header>        
      <Wordle isGameStarted={isGameStarted}/>
    </div>
  )
}

export default App
