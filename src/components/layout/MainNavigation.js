// import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css';
// import FavoritesContext from '../../store/favorites-context';

function MainNavigation() {
  // const favoritesCtx = useContext(FavoritesContext);

  return (
    <header className={classes.header}>
      <div className={classes.subheader}>Characters & Houses Explorer</div>
      <nav>
        <ul>
          <li>
            <NavLink to='/' exact activeClassName={classes.linkActive}>Character List</NavLink>
          </li>
          <li>
            <NavLink to='/search' activeClassName={classes.linkActive}>Name Search</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
