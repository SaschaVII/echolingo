import LetterValidity from "../enums/LetterValidity";
import KeyboardKey from "./KeyboardKey";

function Keyboard({ correct = [], partial = [], incorrect = [], keyClickHandler }) {
    const letters = [
        'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 
        'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 
        'z', 'x', 'c', 'v', 'b', 'n', 'm'
    ];

    const handleKeyClick = letter => {
        keyClickHandler(letter);
    }

    const mapKeyboardRows = () => {
        const rows = [
            letters.slice(0, 10),
            letters.slice(10, 19),
            letters.slice(19, letters.length)
        ];

        return rows.map((row, index) => {
            let indentation = "";
            if(index === 1) indentation ="ml-2";
            if(index === 2) indentation = "ml-8";
            return (
                <div className={`flex gap-1 sm:gap-2 ${indentation}`} key={index}>
                    {row.map((value, key) => renderKey(value, key))}
                </div>
            );
        }); 
    }; 

    const renderKey = (letter, key) => {
        let validity = undefined;
        if (incorrect.includes(letter)) validity = LetterValidity.incorrect;
        if (partial.includes(letter)) validity = LetterValidity.partial;
        if (correct.includes(letter)) validity = LetterValidity.correct;

        return <KeyboardKey key={key} letter={letter} validity={validity} clickHandler={handleKeyClick} /> 
    };
      
    return (
        <div className="flex flex-col gap-1 sm:gap-2 mt-5">
            {mapKeyboardRows()}
        </div>
    );
}

export default Keyboard;