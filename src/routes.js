import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import Media from './pages/Media';
import Acumulado from './pages/Acumulado';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/media" component={Media} />
        <Route path="/acumulado" component={Acumulado} />
      </Switch>
    </BrowserRouter>
  );
}
