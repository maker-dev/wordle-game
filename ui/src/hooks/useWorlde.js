import { useState } from "react";

function useWorlde() {
    
    const [currentGuess, setCurrentGuess] = useState("");

    const startGame = async () => {
        try {
            const response = await fetch("http://localhost/php/wordle-game/api/get_random_word.php");
            const data = await response.json();
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
                headers: {
                    "Content-Type": "application/json", // Tell the server it's JSON
                },
                body: JSON.stringify({guess_word})
            });
            const data = await response.json();
            console.log(data);
            return {status: 200, message: data}
        } catch (error) {
            console.error("Error submitting word:", error);
            return {status: 400, message: error.message}
        }
    }
    
    const handleKeyup = ({key}) => {

        if (key === "Enter") {
            if (currentGuess.length !== 5) {
                alert("word must be 5 chars long");
                return;
            }
            submitGuess();
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

    return {startGame, submitGuess, handleKeyup, currentGuess}
}

export default useWorlde;