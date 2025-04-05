const getTheWord = (guesses, turn) => {
    let theGuess = guesses[turn - 1];
    if (!theGuess) return;
    let mergeTheGuess = theGuess.map((ele) => {
        return ele.letter;
    }).join("");
    return mergeTheGuess;
}

export default getTheWord;