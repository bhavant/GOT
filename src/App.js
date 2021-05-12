import { Route, Switch } from 'react-router-dom';

import Layout from './components/layout/Layout';
import CharacterList from './pages/CharacterList';
import SearchCharacter from './pages/SearchCharacter';

import './App.css';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <CharacterList />
        </Route>
        <Route path='/search'>
          <SearchCharacter />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
