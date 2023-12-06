import { useEffect, useState, useRef } from 'react';
import LetterValidity from './enums/LetterValidity';
import Guess from './components/Guess';
import validWords from './5_letter_list.json';
import commonWords from './common_words.json';
import EchoLingoTitle from './components/EchoLingoTitle';
import Keyboard from './components/Keyboard';

function App() {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [actualWord, setActualWord] = useState('');
  const [keyboardLetters, setKeyboardLetters] = useState({
    'correct':[],
    'partial':[],
    'incorrect':[]
  });

  const tries = 6;

  useEffect(() => {
    // pick random word from common_words.json
    const randomIndex = Math.floor(Math.random() * commonWords.length);
    const randomWord = commonWords[randomIndex];
    setActualWord(() => {
      console.log("psst... it's " + randomWord);
      return randomWord;
    });

    // focus input
    inputRef.current?.focus();
  }, []);

  const wordIsValid = word => {
    const result = validWords.some(x => x === word);
    return result;
  }

  const handleInputChange = (e) => {
    if (e.target.value === "" || e.target.value.match(/^[a-zA-Z]+$/)?.length > 0) {
      setInputValue(e.target.value.toLowerCase());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = checkWord(inputValue);
    if (result) {
      const newGuess = [inputValue, result];
      setGuesses(current => [...current, newGuess]);
      updateKeyboard(newGuess);
      setInputValue("");
    }
  };

  const updateKeyboard = guess => {
    const correct = keyboardLetters.correct;
    const partial = keyboardLetters.partial;
    const incorrect = keyboardLetters.incorrect;

    // guess: [wordLetters, resultArray]
    const letters = guess[0];
    const results = guess[1];
    
    for (let letterIndex = 0; letterIndex < letters.length; letterIndex++) {
      const letter = letters[letterIndex];
      if (results[letterIndex] === LetterValidity.correct && !correct.includes(letter)) {
        correct.push(letter);
        if(partial.includes(letter)) partial.splice(partial.indexOf(letter));
      };
      if (results[letterIndex] === LetterValidity.partial && !partial.includes(letter)) partial.push(letter);
      if (results[letterIndex] === LetterValidity.incorrect && !incorrect.includes(letter)) incorrect.push(letter);
    }

    setKeyboardLetters(current => {
      return {...current,
        'correct': correct,
        'partial': partial,
        'incorrect': incorrect
      };
    });
  }

  const handleTryAgain = () => {
    document.location.reload();
  }

  const showGuesses = () => {
    if (guesses.length <= 0) return;
    return guesses.map((guess, index) => <Guess word={guess[0]} formatArray={guess[1]} key={index} />);
  }

  const checkWord = word => {
    word = word.toLowerCase();
    const result = new Array(actualWord.length).fill(0);
    if (actualWord.length !== word.length) {
      console.error("Input was of wrong length");
      return;
    };

    if (!wordIsValid(word)) {
      alert("word doesn't exist");
      return;
    };

    for (let i = 0; i < actualWord.length; i++) {
      if (actualWord[i] === word[i]) {
        result[i] = LetterValidity.correct;
        continue;
      }

      if (actualWord.includes(word[i])) {
        result[i] = LetterValidity.partial;
      }
    }
    return result;
  };

  const handleKeyClick = letter => {
    setInputValue(current => {
      if (current.length >= 5) return current;
      return current + letter;
    });
  };

  if (guesses.length > 0 && guesses[guesses.length - 1][0] === actualWord) {
    return (
      <div className='h-screen flex items-center justify-center flex-col gap-5 bg-green-200'>
        <div className='mb-5 text-6xl animate-bounce'>
          <Guess word={guesses[guesses.length - 1][0]} formatArray={guesses[guesses.length - 1][1]} />
        </div>
        <h1 className='text-green-500 text-4xl'>CONGRATULATIONS, YOU WON!!!</h1>
        <button
          className='text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-3xl px-10 py-5'
          onClick={handleTryAgain}>
          Try Again
        </button>
      </div>
    );
  };

  if (guesses.length >= tries) return (
    <div className='h-screen flex items-center justify-center flex-col gap-5 bg-red-200'>
      <h1 className='text-red-500 text-7xl'>GAME OVER</h1>
      <p className='text-red-700 -mt-4 text-lg'>Bummer! The word you were loooking for was <span className='font-bold text-xl text-red-500'>{actualWord.toUpperCase()}</span>.</p>
      <button
        className='text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-3xl px-10 py-5'
        onClick={handleTryAgain}>
        Try Again
      </button>
    </div>
  );

  return (
    <>
      <EchoLingoTitle />
      <div className="mt-10 flex items-center justify-center flex-col gap-5">
      <p className='text-2xl opacity-75'>{tries - guesses.length} guesses left</p>
        <ol className='text-3xl flex flex-col gap-4'>
          {(guesses) && showGuesses()}
        </ol>
        <form className='flex gap-4' onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            minLength="5"
            maxLength="5"
            value={inputValue}
            onChange={handleInputChange}
            className='bg-gray-50 border border-gray-300 uppercase text-gray-900 text-3xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-44 p-2.5 px-5' />
          <button
            type='submit'
            disabled={!inputValue}
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
            SUBMIT
          </button>
        </form>
        <Keyboard
          correct={keyboardLetters.correct}
          partial={keyboardLetters.partial}
          incorrect={keyboardLetters.incorrect}
          keyClickHandler={handleKeyClick} />
      </div>
    </>
  );
}

export default App;
