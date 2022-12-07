import React, { useState } from "react";
import ControllerZaposleni from "../../../../Controllers/ControllerZaposleni";
import { Zaposleni } from "../../../../Klase/Zaposleni";
import './FormaIzmenaZaposlenog.css';
// import Swal from 'sweetalert2';
// import 'sweetalert2/src/sweetalert2.scss'
function FormaIzmenaZaposlenog(){
    let z1:ControllerZaposleni = new ControllerZaposleni();
    let [JMBGpretraga,setJMBGpretraga]=useState("");
    let [zaposleni,setZaposleni]=useState(new Zaposleni(0,"","","","Jeste na radnom mestu"));
    let [porukaPretrage,setPorukaPretrage]=useState("");
    let [porukaIzmene,setPorukaIzmene]=useState("");
    function pretraziZaposlenog(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        evt.preventDefault();
        setZaposleni(()=>{
            let odgovor=z1.ucitajZaposlenog(+JMBGpretraga);
            setPorukaPretrage(odgovor.poruka);
            return odgovor.zaposleni});
    }
    function izmeniZaposlenog(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        evt.preventDefault();
        console.log(zaposleni);
        setPorukaIzmene(z1.izmeniZaposlenog(zaposleni).poruka);
    }
    return(
        <div id="FIZstranica">
            <div>
                <div id="FIZpretraga">
                    <h3>Pretraga zaposlenog</h3>
                    <div>
                        <label htmlFor="">JMBG zaposlenog</label>
                        <input type="number" value={JMBGpretraga} onChange={(evt)=>setJMBGpretraga(evt.target.value)}/>
                        <small>{porukaPretrage}</small>
                    </div>
                    <button onClick={(evt)=>pretraziZaposlenog(evt)}>Pretrazi zaposlenog</button>
                </div>
                <div id="FIZforma">
                    <h3 id="FIZnaslov">Izmena zaposlenog</h3>
                    <div >
                        <label htmlFor="">JMBG</label>
                        <input type="number" value={zaposleni.JMBG} onChange={(evt)=>setZaposleni({...zaposleni,JMBG:+evt.target.value})} disabled={true}/>
                    </div>
                    <div>
                        <label htmlFor="">Ime</label>
                        <input type="text" value={zaposleni.ime} onChange={(evt)=>setZaposleni({...zaposleni,ime:evt.target.value})}/>
                    </div>
                    <div>
                        <label htmlFor="">Prezime</label>
                        <input type="text" value={zaposleni.prezime} onChange={(evt)=>setZaposleni({...zaposleni,prezime: evt.target.value})}/>
                    </div>
                    <div>
                        <label htmlFor="">Pozicija</label>
                        <input type="text" value={zaposleni.pozicija} onChange={(evt)=>setZaposleni({...zaposleni,pozicija:evt.target.value})}/>
                    </div>
                    <div>
                        <label htmlFor="">Stauts</label>
                        <select name="firma" id="firma" defaultValue={zaposleni.status} onChange={(evt)=>setZaposleni({...zaposleni,status:evt.target.value})}>
                            <option  value="Jeste na radnom mestu">Jeste na radnom mestu</option>
                            <option value="Nije na radnom mestu">Nije na radnom mestu</option>
                            <option value="Nije u firmi">NIje u firmi</option>
                        </select>
                    </div>
                    <button onClick={(evt)=>izmeniZaposlenog(evt)}>Izmeni zaposlenog</button>
                </div>
            </div>
            <h1 id="FIZporukaIzmene">{porukaIzmene}</h1>
        </div>
    )
}
export default FormaIzmenaZaposlenog;




