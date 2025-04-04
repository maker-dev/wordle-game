import React from 'react'

function Row({guess, currentGuess}) {

  //typing case
  if (currentGuess) {
    let letters = currentGuess.split('');
    return (
      <div className='row current'>
        {
          letters.map((l, i) => (
            <div key={i} className="filled">{l}</div>
          ))
        }
        {[...Array(5 - letters.length)].map((_, i) => (
          <div key={i}></div>
        ))}
      </div>
    )
  }

  //submited case
  if (guess) {
    return (
      <div className='row past'>
        {
          guess.map((l, i) => (
            <div key={i} className={l.status}>{l.letter}</div>
          ))
        }
      </div>
    )
  }
  //empty case
  return (
    <div className='row'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default Row