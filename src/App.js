import React from "react";
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect } from "react-router-dom";
import Icon from '@mdi/react';
import { mdiLock , mdiLockOpenVariant, mdiGithub } from '@mdi/js';
import Encrypt from './pages/Encrypt';
import Decrypt from './pages/Decrypt';

function App() {
  return (
    <Router>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to="/secured-recovery" activeClassName="is-active" exact={true}>
                <Icon path={mdiLock} size={1}/>
                <span>Encrypt</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/decrypt" activeClassName="is-active" exact={true}>
                <Icon path={mdiLockOpenVariant} size={1}/>
                <span>Decrypt</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className="content">
        <Switch>
          <Route path="/decrypt">
            <Decrypt />
          </Route>
          <Route path="/secured-recovery">
            <Encrypt />
          </Route>
          <Route render={() => <Redirect to="/secured-recovery" />}/>
        </Switch>
      </main>
      <footer>
        <small className="copyright">
          <span>
            &copy; Tanase Butcaru / MIT License / Secured Recovery v{process.env.REACT_APP_VERSION}
          </span>
          <a href="https://github.com/tbutcaru/secured-recovery" target="_blank" rel="noreferrer" title="Secured Recovery on GitHub">
            <Icon path={mdiGithub} size={1}/>
          </a>
        </small>
      </footer>
    </Router>
  );
}

export default App;
