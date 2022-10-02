import React, { useEffect, useState } from "react";
import ControllerZaposleni from "../../../../Controllers/ControllerZaposleni";
import { Zaposleni } from "../../../../Klase/Zaposleni";
import "./FormaKreiranjeZaposlenog.css";
function FormaKreiranjeZaposlenog() {
    let z1:ControllerZaposleni= new ControllerZaposleni();
    let [JMBG,setJMBG]=useState<string>("0");
    let [provera,setProvera]=useState(false);
    let [ime,setIme]=useState<string>("");
    let [prezime,setPrezime]=useState<string>("");
    let [pozicija,setPozicija]=useState<string>("");
    let [status,setStatus]=useState<string>("Nije izabrana opcija");
    let [zaposleni,setZaposleni]=useState<Zaposleni>(new Zaposleni(0,"","","",""));
    let [poruka,setPoruka]=useState<string>("");
    useEffect(()=>{
        if(provera){
            console.log(zaposleni);
            setPoruka(z1.unesiZaposlenog(zaposleni));
            setProvera(false);
        }
    },[provera]);
    function kreirajZaposlenog(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        evt.preventDefault();
        // if(+JMBG.length!==13){
        //     setPoruka("JMBG mora da ima 13 cifara");
        //     return;
        // }
        setZaposleni(new Zaposleni(+JMBG,ime,prezime,pozicija,status));
        setProvera(true);
    }
    return(
        <div id="FKZstranica">
            <div id="FKZforma">
            <h1 id="FKZnaslov">Zaposleni</h1>
                <div >
                    <label htmlFor="">JMBG</label>
                    <input type="number" value={JMBG} onChange={(evt)=>{setJMBG(evt.target.value)}} />
                </div>
                <div>
                    <label htmlFor="">Ime</label>
                    <input type="text" value={ime} onChange={(evt)=>setIme(evt.target.value)} />
                </div>
                <div>
                    <label htmlFor="">Prezime</label>
                    <input type="text" value={prezime} onChange={(evt)=>setPrezime(evt.target.value)}/>
                </div>
                <div>
                    <label htmlFor="">Pozicija</label>
                    <input type="text" value={pozicija} onChange={(evt)=>setPozicija(evt.target.value)}/>
                </div>
                <div>
                    <label htmlFor="">Status</label>
                    <select name="firma" id="firma" value={status} onChange={(evt)=>setStatus(evt.target.value)}>
                        <option value="Jeste na radnom mestu">Jeste na radnom mestu</option>
                        <option value="Nije na radnom mestu">Nije na radnom mestu</option>
                        <option value="Nije u firmi">NIje u firmi</option>
                    </select>
                </div>
                <button onClick={(evt)=>kreirajZaposlenog(evt)}>Unesi</button>
            </div>
            <h1 id="FKZporuka">{poruka}</h1>
        </div>
    )
}
export default FormaKreiranjeZaposlenog;


