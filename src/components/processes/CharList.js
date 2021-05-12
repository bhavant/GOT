import { useState } from 'react';

import Modal from '../ui/Modal';
import Backdrop from '../ui/Backdrop';

import classes from './CharList.module.css';

function CharList(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [sendChar, setSendChar] = useState({});

  function moreInfoHandler() {
    setModalIsOpen(!modalIsOpen);
    if (!modalIsOpen) {
      setSendChar(this);
    } else {
      setSendChar({});
    }
    console.log(this);
  }

  if (!props.allChars || props.allChars.length === 0) {
    return <div>No Characters Found</div>
  }

  return (
    <ul className={classes.list}>
      {props.allChars.map((gotChar, idx) => {
        if (gotChar.name.length > 0) {
          return (
            <li key={idx}>
              <div className={classes.display}>
                <div className={classes.name}>{gotChar.name}
                  <button onClick={moreInfoHandler.bind(gotChar)}>More info</button>
                </div>
              </div>
            </li>
          )
        }
      }
      )}
      {modalIsOpen && (
        <Modal character={sendChar} onCancel={moreInfoHandler} />
      )}
      {modalIsOpen && <Backdrop onCancel={moreInfoHandler} />}
    </ul>
  )
}

export default CharList;