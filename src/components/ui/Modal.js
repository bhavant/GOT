import { useState, useEffect } from 'react';

import classes from "./Modal.module.css";
import Loader from '../ui/Loader';

function Modal(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [algArr, setAlgArr] = useState([]);

  function cancelHandler() {
    props.onCancel.call({});
  }

  let char = props.character;

  function getHouse(link) {
    return fetch(link)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data.name;
      })
      .catch((err) => {
        console.log(err);
        return '';
      });
  }

  useEffect(() => {
    setIsLoading(true);
    let retArr = [];
    if (char.allegiances.length > 0) {
      for (let link of char.allegiances) {
        let name = getHouse(link);
        retArr.push(name);
      }
    } else {
      retArr.push('None');
    }
    Promise.all(retArr).then((data) => {
      // console.log(data);
      setAlgArr((prev) => {
        return prev.concat(...data);
      })
      setIsLoading(false);
    })
  }, []);

  if (isLoading) {
    return (
      <div className={classes.modal}><Loader /></div>

    );
  }

  return (
    <div className={classes.modal}>
      <div className={classes.details}>
        <div className={classes.name}>{char.name}</div>
        {char.aliases.length > 0 &&
          char.aliases[0].length > 0 &&
          <div>
            <div className={classes.alias}>Also known as:</div>
            {char.aliases.map((al, idx) => {
              return <div key={'1_' + idx} className={classes.aliasEach}>{al}</div>
            })}
          </div>
        }
        {char.gender.length > 0 && (
          <div className={classes.gender}><span>Gender</span> : <span>{char.gender}</span></div>
        )}
        {char.culture.length > 0 && (
          <div className={classes.culture}><span>Culture</span> : <span>{char.culture}</span></div>
        )}
        {char.born.length > 0 && (
          <div className={classes.born}><span>Birth Info</span> : <span>{char.born}</span></div>
        )}
        {char.died.length > 0 && (
          <div className={classes.died}><span>Death Info</span> : <span>{char.died}</span></div>
        )}
        <div className={classes.algMain}>Allegiances</div>
        {algArr.map((alg, index) => {
          return <div key={'2_' + index} className={classes.algEach}>{alg}</div>
        })}
      </div>

      <button className='btn btn--alt' onClick={cancelHandler}>
        Back To Character List
      </button>
    </div>
  );
}

export default Modal;
