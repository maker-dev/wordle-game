import React, { useEffect } from 'react'
import useWorlde from '../hooks/useWorlde'

function Worlde() {

    const { handleKeyup, currentGuess} = useWorlde();

    useEffect(() => {
        window.addEventListener("keyup", handleKeyup);

        return () => {
            window.removeEventListener("keyup", handleKeyup);
        }
    }, [handleKeyup])

    return (
        <>
            <div>current guess - {currentGuess}</div>
        </>
    )
}

export default Worlde