import { useState } from "react";

function useWorlde() {
    
    const [currentGuess, setCurrentGuess] = useState("");
    const [guesses, setGuesses] = useState([...Array(6)]);
    const [isCorrect, setIsCorrect] = useState(false);
    const [attempsLeft, setAttemptsLeft] = useState(6);

    const startGame = async () => {
        try {
            const response = await fetch("http://localhost/php/wordle-game/api/get_random_word.php", {
                method: "GET",
                credentials: "include"
            });
            const data = await response.json();
            setAttemptsLeft(6);
            return {status: 200, message: data.response}
        } catch (error) {
            console.error("Error fetching word:", error);
            return null;
        }
    };

    const submitGuess = async (guess_word) => {
        try {
            const response = await fetch("http://localhost/php/wordle-game/api/submit_guess.php", {
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
                setCurrentGuess("");
            } else {
                console.log("msg " + data.message);
            } 
        } catch (error) {
            console.error("Error submitting word:", error);
        }
    }
    
    const handleKeyup = ({key}) => {

        if (key === "Enter") {
            if (currentGuess.length !== 5) {
                alert("word must be 5 chars long");
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

    return {startGame, submitGuess, handleKeyup, currentGuess, guesses, isCorrect, attempsLeft};
}

export default useWorlde;