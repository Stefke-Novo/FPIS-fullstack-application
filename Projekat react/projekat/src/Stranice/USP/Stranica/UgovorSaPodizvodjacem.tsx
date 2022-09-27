import React from "react";
import './USP.css';
import {Link,Switch,Route,useRouteMatch} from 'react-router-dom'; 
import FormaKreiranjeUSP from "../CRUD USP/Kreiranje USP/FormaKreiranjeUSP";
import FormaIzmenaUSP from "../CRUD USP/Izmena USP/FormaIzmenaUSP";
import FormaUcitavanjeUSP from "../CRUD USP/Ucitavanje USP/FormaUcitavanjeUSP";
import FormaBrisanjeUSP from "../CRUD USP/Brisanje USP/FormaBrisanjeUSP";
function UgovorSaPodizvodjacem(){
    let {path} = useRouteMatch();
    return(
        <div id="USP">
            <h1 id="USPnaslov">Ugovor sa podizvodjacem</h1>
            <div id="USPOpcije">
                <h2>Opcije</h2>
                <div>
                    <Link to={`${path}/kreiranjeUSP`}>Kreiranje ugovora sa podizvodjacem</Link>
                    <Link to={`${path}/izmenaUSP`}>Izmena ugovora sa podizvodjacem</Link>
                    <Link to={`${path}/ucitavanjeUSP`}>Ucitavanje ugovora sa podizvodjacem</Link>
                    <Link to={`${path}/brisanjeUSP`}>Brisanje ugovora sa podizvodjacem</Link>
                </div>
            </div>
            <Switch>
                <Route path={`${path}/kreiranjeUSP`} render={()=><FormaKreiranjeUSP/>}/>
                <Route path={`${path}/izmenaUSP`} render={()=><FormaIzmenaUSP/>}/>
                <Route path={`${path}/ucitavanjeUSP`} render={()=><FormaUcitavanjeUSP/>}/>
                <Route path={`${path}/brisanjeUSP`} render={()=><FormaBrisanjeUSP/>}/>
            </Switch>
        </div>
    )
}
export default UgovorSaPodizvodjacem;