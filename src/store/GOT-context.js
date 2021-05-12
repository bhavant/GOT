import { createContext, useState } from 'react';

const GOTContext = createContext({
  // Characters
  getChars: () => { },
  setChars: () => { },
  getCharLink: () => { },
  setCharLink: () => { },
  currentUrl: '',
  getPagLink: () => { },
  setPagLink: () => { },
  // Houses
  getHouse: () => { },
  setHouse: () => { }
});

export function GOTContextProvider(props) {
  const [characters, setCharacters] = useState([]);
  const [charLink, setCharLink] = useState('');
  const [pagLinks, setPagLinks] = useState({});
  const [houses, setHouse] = useState({});

  function getCharHandler() {
    return characters;
  }

  function setCharHandler(chars) {
    setCharacters(chars);
  }

  function getCharLinkHandler() {
    return charLink;
  }

  function setCharLinkHandler(cLink) {
    setCharLink(cLink);
  }

  function getPagLinkHandler(key) {
    if (pagLinks[key] && pagLinks[key] !== '') {
      return pagLinks[key];
    }
    return 'NOT_FOUND';
  }

  function setPagLinkHandler(pagLinkObj) {
    setPagLinks(pagLinkObj);
  }

  function setHouseHandler(link, house) {
    let linkSp = link.split('/');
    let houseNo = linkSp[linkSp.length - 1];
    setHouse((prev) => ({
      ...prev,
      [houseNo]: house
    }))
  }

  function getHouseHandler(link) {
    // split link to find the house no!
    let linkSp = link.split('/');
    let houseNo = linkSp[linkSp.length - 1];
    if (houses[houseNo]) {
      return houses[houseNo].name;
    } else {
      return 'NOT_FOUND';
    }
  }

  const context = {
    getChars: getCharHandler,
    setChars: setCharHandler,
    currentUrl: charLink,
    getCharLink: getCharLinkHandler,
    setCharLink: setCharLinkHandler,
    getPagLink: getPagLinkHandler,
    setPagLink: setPagLinkHandler,
    getHouse: getHouseHandler,
    setHouse: setHouseHandler
  };

  return (
    <GOTContext.Provider value={context}>
      {props.children}
    </GOTContext.Provider>
  );
}

export default GOTContext;
