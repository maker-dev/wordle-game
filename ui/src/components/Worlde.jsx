import React, { useEffect } from 'react'
import useWorlde from '../hooks/useWorlde'
import Grid from './Grid';
import Keypad from './Keypad';

function Worlde() {

    const { handleKeyup, currentGuess, guesses, isCorrect, attempsLeft, usedKeys} = useWorlde();

    useEffect(() => {
        window.addEventListener("keyup", handleKeyup);

        return () => {
            window.removeEventListener("keyup", handleKeyup);
        }
    }, [handleKeyup])

    useEffect(() => {
        console.log(guesses);
        console.log(isCorrect);
        console.log(attempsLeft);
    }, [guesses, isCorrect, attempsLeft]);

    return (
        <div>
            <div>current guess - {currentGuess}</div>
            <Grid currentGuess={currentGuess} guesses={guesses} attempsLeft={attempsLeft}/>
            <Keypad usedKeys={usedKeys}/>
        </div>
    )
}

export default Worlde