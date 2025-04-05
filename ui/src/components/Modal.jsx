import React, { useState } from 'react'

function Modal({isCorrect, resetSettings, startGame, setShowModal}) {
    
    const [loading, setLoading] = useState(false);

    const handleRestart = () => {
        setLoading(true);        
        resetSettings();
        window.setTimeout(() => {
            startGame().then(res => {
                if (res && res.status === 200) {
                    setLoading(false);
                    setShowModal(false);
                }
            })
        }, 1000);      
    };

    return (
        <div className='modal'>
        {isCorrect ? (
            <div>
            <h1>Congratulations! 🎉</h1>
            <p className="message">You guessed the word correctly!</p>
            <p className="subtext">Great job, Wordle master!</p>
            <button className="play-again" onClick={handleRestart} disabled={loading}>
                {
                    loading && 
                    <>Loading...</>
                }
                {
                    !loading && 
                    <>Play Again</>
                }
            </button>
            </div>
        ) : (
            <div>
            <h1>Game Over!</h1>
            <p className="message">You've used all your tries.</p>
            <p className="subtext">Don't worry, you'll get it next time!</p>
            <button className="play-again" onClick={handleRestart} disabled={loading}>
                {
                    loading && 
                    <>Loading...</>
                }
                {
                    !loading && 
                    <>Play Again</>
                }
            </button>
            </div>
        )}
        </div>
    )
}

export default Modal