import React from 'react';
import './App.css';
import MainPage from './Stranice/MainPage';
import {Route,Switch} from 'react-router-dom';
import MainMenu from './komponente/MainMenu/MainMenu';
import PonudaPodizvodjaca from './Stranice/Ponuda podizvodjaca/Stranica/PonudaPodizvodjaca';
import Zaposleni from './Stranice/Zaposleni/Stranica/Zaposleni';
import UgovorSaPodizvodjacem from './Stranice/USP/Stranica/UgovorSaPodizvodjacem';
function App() {
  return (
    <>
      <MainMenu/>
      <Switch>
        <Route path="/" exact={true} render={()=><MainPage/>}/>
        <Route path="/ponudaPodizvodjaca" exact={false} render={()=><PonudaPodizvodjaca/>}/>
        <Route path="/zaposleni" exact={false} render={()=><Zaposleni/>}/>
        <Route path="/ugovorSaPodizvodjacem" exact={false} render={()=><UgovorSaPodizvodjacem/>}/>
      </Switch>
    </>
  );
}

export default App;
