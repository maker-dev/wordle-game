import React, { useEffect, useState } from 'react'

function Modal({isCorrect, resetSettings, startGame, setShowModal, getSolution, attempsLeft}) {
    
    const [loading, setLoading] = useState(false);
    const [solution, setSolution] = useState("");
    const turn = Math.abs(attempsLeft - 6);

    const handleRestart = () => {
        setLoading(true);        
        window.setTimeout(() => {
            startGame().then(res => {
                resetSettings();
                setSolution("");
                if (res && res.status === 200) {
                    setLoading(false);
                    setShowModal(false);
                }
            })
        }, 1000);      
    };

    useEffect(() => {
        getSolution().then(res => setSolution(res))
    }, [getSolution])


    if (!turn) return;

    return (
        <div className='modal'>
            {isCorrect ? (
                <div className="modal-content win">
                <div className="icon-container">
                    <div className="icon win-icon">🏆</div>
                </div>
                <h1>Congratulations!</h1>
                <p className="solution">{solution}</p>
                <p className="turn-info">You found the solution in <span>{turn}</span> {turn === 1 ? 'guess' : 'guesses'}</p>
                <button className="play-again" onClick={handleRestart} disabled={loading}>
                    {loading ? (
                    <>
                        <span className="spinner"></span>
                        Loading...
                    </>
                    ) : (
                    <>Play Again</>
                    )}
                </button>
                </div>
            ) : (
                <div className="modal-content lose">
                <div className="icon-container">
                    <div className="icon lose-icon">😢</div>
                </div>
                <h1>Game Over!</h1>
                <p className="solution">{solution}</p>
                <p className="turn-info">Better luck next time</p>
                <button className="play-again" onClick={handleRestart} disabled={loading}>
                    {loading ? (
                    <>
                        <span className="spinner"></span>
                        Loading...
                    </>
                    ) : (
                    <>Play Again</>
                    )}
                </button>
                </div>
            )}
        </div>
    );
}

export default Modal