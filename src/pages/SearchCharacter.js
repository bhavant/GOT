import { useState, useRef } from 'react';
import lodash from 'lodash';

import Loader from '../components/ui/Loader';
import CharList from '../components/processes/CharList';
import classes from './SearchCharacter.module.css';

function SearchCharacter() {
  const [loadedCharacters, setLoadedCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchDone, setSearchDone] = useState(false);

  const DEBOUNCE_DELAY = 900;
  const url = 'https://www.anapioficeandfire.com/api/characters?name=';


  function api_call(name) {
    setIsLoading(true);
    fetch(url + encodeURIComponent(name))
      .then((response) => {
        return response.json();
      })
      .then(data => {
        setLoadedCharacters(data);
        setIsLoading(false);
        setSearchDone(true);
      })
  }

  const call_backend_debounce = useRef(lodash.debounce((val) => api_call(val), DEBOUNCE_DELAY)).current;

  function onChange(e) {
    let val = e.currentTarget.value;

    if (val.trim().length > 0) {
      call_backend_debounce(val);
    } else {
      setLoadedCharacters([]);
      setSearchDone(true);
    }
  };

  if (isLoading) {
    return (
      <Loader />
    );
  }

  return (
    <div>
      <div className={classes.main}>
        <input className={classes.nameInput} type="text" onChange={(event) => onChange(event)} placeholder="Enter full name" />
      </div>
      {loadedCharacters.length > 0 &&
        <CharList allChars={loadedCharacters} />
      }
      {searchDone && loadedCharacters.length === 0 &&
        <div>Character Not Found! Please check the name!!</div>}
    </div>
  );
}

export default SearchCharacter;