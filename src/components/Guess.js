function Guess({ word, formatArray }) {
    const wordArray = word.split("");
    
    const getValidityClass = (index) => {
        let className = "letter-card p-4 rounded-md text-center"; 
        switch (formatArray[index]) {
            case 1:
                className += " partial-letter";
                break;
            case 2:
                className += " correct-letter";  
                break;      
            default:
                break;
        }
        return className;
    };

    return (
        <li className="uppercase flex gap-2">
            {wordArray.map((letter, index) => <div className={getValidityClass(index)} key={index}>{letter}</div>)}
        </li>
    );
}

export default Guess;