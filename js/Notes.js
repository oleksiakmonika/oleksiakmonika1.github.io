import React, {useState} from 'react';
import {Link} from 'react-router-dom';

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
            <span className='layout'>
                <Link className='back' to='/'>Powrót do strony głownej</Link>
                <textarea className='textArea'
                          onChange={e => setMyText(e.currentTarget.value)} type='text'
                          value={myText} placeholder='Sporządź notatkę...'/>
                <button className='clear' onClick={e => setMyText(' ')}>Wyczyść</button>

            </span>
        </form>
    )
}
export default Notes;