import { useState, useEffect, useContext } from 'react';

import Pagination from '../components/processes/Pagination';
import CharList from '../components/processes/CharList';
import Loader from '../components/ui/Loader';
import GOTContext from '../store/GOT-context';

function CharacterList() {
  const GOTCtx = useContext(GOTContext);
  const [isLoading, setIsLoading] = useState(true);

  const baseUrl = "https://www.anapioficeandfire.com/api/characters?pageSize=50";
  const [url, setUrl] = useState(baseUrl);
  const [loadedCharacters, setLoadedCharacters] = useState([]);

  function paginationClicked(type) {
    let newURL = GOTCtx.getPagLink(type);
    if (newURL === 'NOT_FOUND') {
      return false;
    }
    GOTCtx.setCharLink('');
    setUrl(newURL);
  }

  function linksParser(links) {
    let first, next, prev, last = '';
    for (let lk of links) {
      let tpLk = lk.trim().split(';');
      switch (tpLk[1].trim()) {
        case 'rel="next"':
          next = tpLk[0].substring(1, tpLk[0].length - 1);
          break;
        case 'rel="prev"':
          prev = tpLk[0].substring(1, tpLk[0].length - 1);
          break;
        case 'rel="first"':
          first = tpLk[0].substring(1, tpLk[0].length - 1);
          break;
        case 'rel="last"':
          last = tpLk[0].substring(1, tpLk[0].length - 1);
          break;
        default:
          break;
      }
    }
    GOTCtx.setPagLink({ first, next, prev, last });
  }

  useEffect(() => {
    setIsLoading(true);
    if (GOTCtx.getCharLink() !== '') {
      setLoadedCharacters(GOTCtx.getChars());
      setIsLoading(false);
    } else {
      fetch(url)
        .then((response) => {
          if (response.ok) {
            let links = response.headers.get('link').split(',');
            if (links && links.length > 0) {
              linksParser(links);
            }
            return response.json();
          } else {
            alert("Error While loading data. Please refresh.");
          }
        })
        .then((data) => {
          // console.log(data);
          setLoadedCharacters(data);
          GOTCtx.setChars(data);
          GOTCtx.setCharLink(url);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          alert("Error While loading data. Please refresh.");
        })
    }
  }, [url]);

  if (isLoading) {
    return (
      <Loader />
    );
  }

  return (
    <div>
      {/* <h1>All Characters</h1> */}
      <Pagination paginationClicked={paginationClicked} />
      <CharList allChars={loadedCharacters} />
      <Pagination paginationClicked={paginationClicked} />
    </div>
  );

}

export default CharacterList;