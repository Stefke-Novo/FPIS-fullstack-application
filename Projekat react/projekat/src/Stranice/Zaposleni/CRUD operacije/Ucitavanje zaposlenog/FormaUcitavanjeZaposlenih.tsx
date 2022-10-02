import React, { useEffect, useState } from "react";
import ControllerZaposleni from "../../../../Controllers/ControllerZaposleni";
import { Zaposleni } from "../../../../Klase/Zaposleni";
import './FormaUcitavanjeZaposlenih.css';
function FormaUcitavanjeZaposlenih(){
    let z1:ControllerZaposleni = new ControllerZaposleni();
    let [zaposleni,setZaposleni]=useState([
        new Zaposleni(21321123123,"Pera","Peric","Pozicija 1","Nije u firmi"),
        new Zaposleni(93874982347,"Pera","Peric","Pozicija 1","Nije u firmi"),
        new Zaposleni(21323209480,"Pera","Peric","Pozicija 1","Nije u firmi"),
        new Zaposleni(32904802933,"Pera","Peric","Pozicija 1","Nije u firmi"),
        new Zaposleni(21321213123,"Pera","Peric","Pozicija 1","Nije u firmi")
    ]);
    useEffect(()=>{
        setZaposleni(z1.ucitajZaposlene().zaposleni);
    },[]);
    return (
        <div id="FUZstranica">
            <h1 id="FUZnaslov">Zaposleni</h1>
            <div>
                <table id="FUZtabela">
                    <thead>
                        <tr className="red">
                            <th>JMBG</th>
                            <th>Ime</th>
                            <th>Prezime</th>
                            <th>Pozicija</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {zaposleni.map((zaposlen,i)=>(
                            <tr key={zaposlen.JMBG} className={i%2==0?"red":"red"}>
                                <td>{zaposlen.JMBG}</td>
                                <td>{zaposlen.ime}</td>
                                <td>{zaposlen.prezime}</td>
                                <td>{zaposlen.pozicija}</td>
                                <td>{zaposlen.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default FormaUcitavanjeZaposlenih;