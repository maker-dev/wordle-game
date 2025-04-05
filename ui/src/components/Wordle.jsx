import React, { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid';
import Keypad from './Keypad';
import Modal from './Modal';
import Alert from './Alert';

function Wordle() {

    const { handleKeyup, currentGuess, guesses, isCorrect, attempsLeft, usedKeys, alertMessage, setAlertMessage} = useWordle();
    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        window.addEventListener("keyup", handleKeyup);

        if (alertMessage) {
            setShowAlert(true);
            window.setTimeout(() => {
                setShowAlert(false);
                setAlertMessage("");
            }, 800);
        }

        if (isCorrect) {
            window.setTimeout(() => {
                setShowModal(true);
            }, 1600)
            window.removeEventListener("keyup", handleKeyup);
        }

        if (attempsLeft <= 0) {
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
            {showModal && <Modal isCorrect={isCorrect}/>}
            {showAlert && <Alert message={alertMessage}/>}
        </div>
    )
}

export default Wordle;