import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import MedsTable from './MedicationsTable';

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/medications-table" component={MedsTable} />
      </Switch>
    </Router>
  );
}

export default AppRouter;