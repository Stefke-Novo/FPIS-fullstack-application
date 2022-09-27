import React, { useState } from 'react';
import ControllerZaposleni from '../../../../Controllers/ControllerZaposleni';
import { Zaposleni } from '../../../../Klase/Zaposleni';
import './FormaBrisanjeZaposlenog.css';
function FormaBrisanjeZaposlenog(){
    let z1:ControllerZaposleni = new ControllerZaposleni();
    let [JMBGpretrage,setJMBGpretrage]=useState(0);
    let [porukaPretrage,setPorukaPretrage]=useState("");
    let [zaposleni,setZaposleni]=useState(new Zaposleni(0,"","","",""));
    let [porukaBrisanja, setPorukaBrisanja] = useState("");
    function pretraziJMBG(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        evt.preventDefault();
        let odgovor=z1.ucitajZaposlenog(JMBGpretrage);
        setPorukaPretrage(odgovor.poruka);
        setZaposleni(odgovor.zaposleni);
    }
    function izbrisiZaposlenog(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        evt.preventDefault();
        let odgovor=z1.izbrisiZaposlenog(zaposleni);
        console.log(odgovor);
        setPorukaBrisanja(odgovor);

    }
    return(
        <div>
            <h1 id='FBZnaslov'>Brisanje zaposlenog</h1>
            <div id="FBZpretraga">
                <h3>Pretraga zaposlenog</h3>
                <div>
                    <label htmlFor="">JMBG zaposlenog</label>
                    <input type="number" value={JMBGpretrage} onChange={(evt)=>setJMBGpretrage(+evt.target.value)} />
                    <small>{porukaPretrage}</small>
                </div>
                <button onClick={(evt)=>{pretraziJMBG(evt)}}>Pretrazi zaposlenog</button>
            </div>
            {zaposleni.JMBG>0&&(
                <div id='FBZforma2'>
                    <label htmlFor="">Da li zelite da izbrisete zaposlenog</label>
                    <div>
                        <button onClick={(evt)=>izbrisiZaposlenog(evt)}>Da</button>
                        <button>Ne</button>
                    </div>
                </div>
            )}
            <h1 id='FBZporukaBrisanja'>{porukaBrisanja}</h1>
        </div>
    )
}
export default FormaBrisanjeZaposlenog;




