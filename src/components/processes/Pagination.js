import classes from './Pagination.module.css';

function Pagination(props) {

  function paginationClickedHandler(type) {
    props.paginationClicked(type);
  }

  return (
    <div className={classes.pagination}>
      <button onClick={paginationClickedHandler.bind(null, 'first')}>❮❮</button>
      <button onClick={paginationClickedHandler.bind(null, 'prev')}>❮</button>
      <button onClick={paginationClickedHandler.bind(null, 'next')}>❯</button>
      <button onClick={paginationClickedHandler.bind(null, 'last')}>❯❯</button>
    </div>
  )
}

export default Pagination;