import React, {useState} from 'react';

const Notes = () => {
    function useLocalState(localItem) {
        const [loc, setSate] = useState(localStorage.getItem(localItem));

        function setLoc(newItem) {
            localStorage.setItem(localItem, newItem);
            setSate(newItem)
        }

        return [loc, setLoc]
    }

    const [myText, setMyText] = useLocalState('myText');
    return (
        <form onSubmit={e => e.preventDefault()}>

            <span>
                <textarea className='textArea'
                          onChange={e => setMyText(e.currentTarget.value)} type='text'
                          value={myText} placeholder='Sporządź notatkę...'/><br/>
                <button className='clear' onClick={e => setMyText(' ')}>Wyczyść notatkę</button>
            </span>
        </form>
    )
}
export default Notes;