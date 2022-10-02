import React, { useState } from "react";
import ControllerUSP from "../../../../Controllers/ControllerUSP";
import PonudaPodizvodjaca from "../../../../Klase/PonudaPodizvodjaca";
import UgovorSaPodizvodjacem from "../../../../Klase/UgovorSaPodizvodjacem";
import { Zaposleni } from "../../../../Klase/Zaposleni";
import './FormaBrisanjeUSP.css';
function FormaBrisanjeUSP(){
    let u1:ControllerUSP = new ControllerUSP();
    let [idPretraga,setIdPretraga]=useState(0);
    let [ugovor,setUgovor]=useState(new UgovorSaPodizvodjacem(0,new Date(),new Date(),[]));
    let [zaposleni,setZaposleni]=useState(new Zaposleni(0,"","","",""));
    let [porukaPretrage,setPorukaPretrage]=useState("");
    let [ponuda,setPonuda] = useState(new PonudaPodizvodjaca(0,"",new Date(),0));
    let [odgovor,setOdgovor]=useState("");
    function pretraziUgovor(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        evt.preventDefault();
        let {poruka,ugovor,zaposleni,ponuda}=u1.pronadjiUSP(idPretraga);
        if(poruka=="Uspesno"){
            setUgovor(ugovor);
            setZaposleni(zaposleni);
            setPonuda(ponuda);
        }
        setPorukaPretrage(poruka);
    }
    function izbrisiUgovor(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        evt.preventDefault();
        console.log(u1.izbrisiUgovor(ugovor,zaposleni,ponuda));
    }
    return(
        <div id="FBUSPstranica">
            <h1 id="FBUSPnaslov">Brisanje ugovora sa podizvodjacem</h1>
            <div id="FBUSPpodela">
                <div id="FBUSPforma">
                    <h3>Pretraga ugovora sa podizvodjacem</h3>
                    <div>
                        <label htmlFor="">ID ugovora sa podizvodjacem</label>
                        <input type="number" value={idPretraga} onChange={(evt)=>setIdPretraga(+evt.target.value)}/>
                        <small >{porukaPretrage}</small>
                    </div>
                    <button onClick={(evt)=>pretraziUgovor(evt)}>Pretrazi</button>
                </div>
                <div id="FBUSPforma1">
                    <label htmlFor="">Da li zelite da izbrisete ugovor ?</label>
                    <div>
                        <button onClick={(evt)=>izbrisiUgovor(evt)}>Da</button>
                        <button>Ne</button>
                    </div>
                    <h1 id="FBUSPodgovor">{odgovor}</h1>
                </div>
            </div>
        </div>
    )
}
export default FormaBrisanjeUSP;




