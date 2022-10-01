import React from 'react';
import './Zaposleni.css';
import {Switch,Link,Route,useRouteMatch} from 'react-router-dom';
import FormaKreiranjeZaposlenog from '../CRUD operacije/Keriranje zaposlenog/FormaKreiranjeZaposlenog';
import FormaBrisanjeZaposlenog from '../CRUD operacije/Brisanje zaposlenog/FormaBrisanjeZaposlenog';
import FormaUcitavanjeZaposlenih from '../CRUD operacije/Ucitavanje zaposlenog/FormaUcitavanjeZaposlenih';
import FormaIzmenaZaposlenog from '../CRUD operacije/Izmena zaposlenog/FormaIzmenaZaposlenog';
function Zaposleni(){
    let {path}=useRouteMatch();
    return(
        <div id='zaposleni'>
            {/* <h1 id='zaposleniNaslov'>Zaposleni</h1>
            <div id='zaposleniOpcije'>
                <h3>Opcije</h3>
                <div>
                    <Link to={`${path}/kreiranjeZaposlnog`}>Kreiranje zaposlenog</Link>
                    <Link to={`${path}/ucitavanjeZaposlenih`}>Ucitavanje zaposlenih</Link>
                    <Link to={`${path}/izmenaZaposlenog`}>Izmena zaposlenog</Link>
                    <Link to={`${path}/brisanjeZaposlenog`}>Brisanje zaposlenog</Link>
                </div>
            </div> */}
            <Switch>
                <Route path={`${path}/kreiranjeZaposlenog`} render={()=><FormaKreiranjeZaposlenog/>}/>
                <Route path={`${path}/ucitavanjeZaposlenih`} render={()=><FormaUcitavanjeZaposlenih/>}/>
                <Route path={`${path}/izmenaZaposlenog`} render={()=><FormaIzmenaZaposlenog/>}/>
                <Route path={`${path}/brisanjeZaposlenog`} render={()=><FormaBrisanjeZaposlenog/>}/>
            </Switch>
        </div>
    )
}
export default Zaposleni;