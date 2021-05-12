import classes from './Loader.module.css';
import loadimg from '../../static/1473_200.gif';

function Loader() {
  return (<div className={classes.loaderDiv}>
    <img src={loadimg} className={classes.loader} alt="loader" />
  </div>)
}

export default Loader;