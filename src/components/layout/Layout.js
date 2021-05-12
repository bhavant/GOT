import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';

function Layout(props) {
  return (
    <div>
      <div className={classes.fixedHeader}>
        <div className={classes.main_header}>Game Of Thrones</div>
        <MainNavigation />
      </div>
      <div className={classes.main}>{props.children}</div>
    </div>
  );
}

export default Layout;
