import LetterValidity from "../enums/LetterValidity";

function KeyboardKey({ letter, validity, clickHandler }) {
    let styles = "text-white rounded-md p-3 sm:p-4 text-center hover:cursor-pointer select-none"; 

    const handleClick = () => {
        clickHandler(letter);
    }

    switch (validity) {
        case LetterValidity.correct:
            styles += " bg-emerald-500 hover:bg-emerald-400";
            break;

        case LetterValidity.partial:
            styles += " bg-amber-400 hover:bg-amber-300";    
            break;

        case LetterValidity.incorrect:
            styles += " bg-slate-700 hover:bg-slate-600";
            break;

        default:
            styles += " bg-slate-400 hover:bg-slate-300";
            break;
    }

    return (
        <div className={styles} onClick={handleClick}>{letter}</div>
    );
};

export default KeyboardKey;