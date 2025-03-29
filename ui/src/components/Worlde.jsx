import React, { useEffect } from 'react'
import useWorlde from '../hooks/useWorlde'
import Grid from './Grid';

function Worlde() {

    const { handleKeyup, currentGuess, guesses, isCorrect, attempsLeft} = useWorlde();

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
        <>
            <div>current guess - {currentGuess}</div>
            <Grid currentGuess={currentGuess} guesses={guesses} attempsLeft={attempsLeft}/>
        </>
    )
}

export default Worlde