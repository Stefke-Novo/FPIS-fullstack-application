import React from 'react';
import './PonudaPodizvodjaca.css';
import {useRouteMatch,Link,Switch,Route} from 'react-router-dom';
import FormaKreiranjePonude from '../CRUD operacije/FormaKreiranjePonude/FormaKreiranjePonude';
import FormaBrisanjePonude from '../CRUD operacije/FormaBrisanjePonude/FormaBrisanjePonude';
function PonudaPodizvodjaca(){
    let {path} = useRouteMatch();
    return(
        <div id='ponudaPodizvodjaca'>
            <h1 id='naslov'>Ponuda podizvodjaca</h1>
            <div id='PPOpcije'>
                <h3>Opcije:</h3>
                <div>
                    <Link to={`${path}/kreirajPonudu`}>Kreiranje</Link>
                    <Link to={`${path}/obrisiPonudu`}>Brisanje</Link>
                </div>
            </div>
            <Switch>
                <Route path={`${path}/kreirajPonudu`} exact={true} component={FormaKreiranjePonude}/>
                <Route path={`${path}/obrisiPonudu`} exact={true} component={FormaBrisanjePonude}/>
            </Switch>
        </div>
    )
}
export default PonudaPodizvodjaca;