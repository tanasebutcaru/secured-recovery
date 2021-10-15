import React from "react";
import { BrowserRouter as Router, HashRouter, Switch, Route, NavLink, Redirect } from "react-router-dom";
import Icon from '@mdi/react';
import { mdiLock , mdiLockOpenVariant, mdiGithub } from '@mdi/js';
import Encrypt from './pages/Encrypt';
import Decrypt from './pages/Decrypt';

function App() {
  return (
    <HashRouter>
      <header>
        <div className="app-name">Secured Recovery</div>
        <nav>
          <ul>
            <li>
              <NavLink to="/encrypt" activeClassName="is-active" exact={true}>
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
          <Redirect exact from="/" to="/encrypt" />
          <Route path="/encrypt">
            <Encrypt />
          </Route>
          <Route path="/decrypt">
            <Decrypt />
          </Route>
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
    </HashRouter>
  );
}

export default App;
