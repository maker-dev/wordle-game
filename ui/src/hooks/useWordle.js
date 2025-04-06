import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function useWordle() {
    
    const [currentGuess, setCurrentGuess] = useState("");
    const [guesses, setGuesses] = useState([...Array(6)]);
    const [isCorrect, setIsCorrect] = useState(false);
    const [attempsLeft, setAttemptsLeft] = useState(6);
    const [usedKeys, setUsedKeys] = useState({});
    const [alertMessage, setAlertMessage] = useState("");

    const startGame = async () => {
        try {
            const response = await fetch(`${API_URL}/get_random_word.php`, {
                method: "GET",
                credentials: "include"
            });
            const data = await response.json();
            setAttemptsLeft(6);
            console.log(data.response);
            return {status: 200, message: data.response}
        } catch (error) {
            console.error("Error fetching word:", error);
            return null;
        }
    };

    const submitGuess = async (guess_word) => {
        try {
            const response = await fetch(`${API_URL}/submit_guess.php`, {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({guess_word})
            });
            const data = await response.json();
            if ('correct' in data) {
                setGuesses(prev => {
                    let newGuess = [...prev];
                    newGuess[Math.abs(data.attempts_left - 5)] = data.feedback;
                    return newGuess;  
                })
                setAttemptsLeft(data.attempts_left);
                setIsCorrect(data.correct);
                setUsedKeys((prevUsedKeys) => {
                    let newKeys = {...prevUsedKeys};
                    data.feedback.forEach((l) => {
                        const currentColor = newKeys[l.letter];

                        if (l.status == "green") {
                            newKeys[l.letter] = "green";
                            return;
                        }

                        if (l.status === "yellow" && currentColor !== "green") {
                            newKeys[l.letter] = "yellow";
                            return;
                        }

                        if (l.status === "gray" && currentColor !== "green" && currentColor !== "yellow") {
                            newKeys[l.letter] = "gray";
                            return;
                        }
                    })
                    return newKeys;
                })
                setCurrentGuess("");
            } else {
                setAlertMessage(data.message);
            } 
        } catch (error) {
            console.error("Error submitting word:", error);
        }
    }

    const resetSettings = () => {
        setCurrentGuess("");
        setGuesses([...Array(6)]);
        setIsCorrect(false);
        setAttemptsLeft(6);
        setUsedKeys({});
    }

    const handleKeyup = ({key}) => {

        if (key === "Enter") {
            if (currentGuess.length !== 5) {
                setAlertMessage("Too Short")
                return;
            }
            submitGuess(currentGuess);
        }

        if (key === "Backspace") {
            setCurrentGuess(prev => prev.slice(0, -1));
            return;
        }
        
        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess(prev => prev + key);
            }
        }
    }

    return {startGame, submitGuess, handleKeyup, setAlertMessage, resetSettings, currentGuess, guesses, isCorrect, attempsLeft, usedKeys, alertMessage};
}

export default useWordle;