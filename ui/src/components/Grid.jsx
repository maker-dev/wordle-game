import React from 'react'
import Row from './Row'

function Grid({currentGuess, guesses, attempsLeft}) {
  let myTurn = Math.abs(attempsLeft - 6);
  return (
    <div>
      {
        guesses.map((g, i) => {
          if (myTurn === i) {
            return <Row key={i} currentGuess={currentGuess}/>
          }
          return <Row key={i} guess={g}/>
        })
      }
    </div>
  )
}

export default Grid