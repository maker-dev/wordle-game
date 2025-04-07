import React, { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid';
import Keypad from './Keypad';
import Modal from './Modal';
import Alert from './Alert';

function Wordle({isGameStarted}) {

    const { handleKeyup, setAlertMessage, resetSettings, startGame, getSolution, setShowAlert, showAlert, currentGuess, guesses, isCorrect, attempsLeft, usedKeys, alertMessage} = useWordle();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!isGameStarted) {
            setAlertMessage("Loading...")
            setShowAlert(true);
        } else {
            setAlertMessage("");
            setShowAlert(false);
        }
    }, [isGameStarted, setAlertMessage, setShowAlert])

    useEffect(() => {
        window.addEventListener("keyup", handleKeyup);

        if (isCorrect || attempsLeft <= 0) {
            window.setTimeout(() => {
                setShowModal(true);
            }, 1600)
            window.removeEventListener("keyup", handleKeyup);
        }

        return () => {
            window.removeEventListener("keyup", handleKeyup);
        }
    }, [handleKeyup, isCorrect, attempsLeft, alertMessage, setAlertMessage])

    return (
        <div>
            <Grid currentGuess={currentGuess} guesses={guesses} attempsLeft={attempsLeft}/>
            <Keypad usedKeys={usedKeys}/>
            {showModal && <Modal isCorrect={isCorrect} resetSettings={resetSettings} startGame={startGame} setShowModal={setShowModal} getSolution={getSolution} attempsLeft={attempsLeft}/>}
            {showAlert && <Alert message={alertMessage}/>}
        </div>
    )
}

export default Wordle;