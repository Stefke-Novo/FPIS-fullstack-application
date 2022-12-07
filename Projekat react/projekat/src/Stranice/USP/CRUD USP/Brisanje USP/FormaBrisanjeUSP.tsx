import React, { useState } from "react";
import ControllerUSP from "../../../../Controllers/ControllerUSP";
import PonudaPodizvodjaca from "../../../../Klase/PonudaPodizvodjaca";
import UgovorSaPodizvodjacem from "../../../../Klase/UgovorSaPodizvodjacem";
import { Zaposleni } from "../../../../Klase/Zaposleni";
import './FormaBrisanjeUSP.css';
import Swal from 'sweetalert2';
// import 'sweetalert2/src/sweetalert2.scss'
function FormaBrisanjeUSP(){
    let u1:ControllerUSP = new ControllerUSP();
    let [idPretraga,setIdPretraga]=useState(0);
    let [ugovor,setUgovor]=useState(new UgovorSaPodizvodjacem(0,new Date(),new Date(),[]));
    let [zaposleni,setZaposleni]=useState(new Zaposleni(0,"","","",""));
    let [porukaPretrage,setPorukaPretrage]=useState("");
    let [ponuda,setPonuda] = useState(new PonudaPodizvodjaca(0,"",new Date(),0));
    let [odgovor,setOdgovor]=useState("");
    let [provereno,setProvereno]=useState<Boolean>(false);
    function pretraziUgovor(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        evt.preventDefault();
        let {poruka,ugovor,zaposleni,ponuda}=u1.pronadjiUSP(idPretraga);
        console.log("poruka: "+poruka);
        if(poruka=="Ugovor je uspesno pronadjen"){
            setUgovor(ugovor);
            setZaposleni(zaposleni);
            setPonuda(ponuda);
            setProvereno(true);
            console.log("Ova linija koda je odradjena");
        }
        console.log("Ova funkcija je odradjena linija 26");
        setPorukaPretrage(poruka);
        setProvereno(false);
    }
    function izbrisiUgovor(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        evt.preventDefault();
        var odg = u1.izbrisiUgovor(ugovor,zaposleni,ponuda);
        console.log(odg);
        if(odg=="Ugovor je uspesno izbrisan")
        Swal.fire({
            title: 'Success',
            text: 'Ugovor je uspesno izbrisan',
            icon: 'success'
          })
          else
          Swal.fire({
            title: 'Error!',
            text: 'Ugovor nije izbrisan',
            icon: 'error'
          })
          
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
                {provereno==false&&<div id="FBUSPforma1">
                    <label htmlFor="">Da li zelite da izbrisete ugovor ?</label>
                    <div>
                        <button onClick={(evt)=>izbrisiUgovor(evt)}>Da</button>
                        <button>Ne</button>
                    </div>
                    <h1 id="FBUSPodgovor">{odgovor}</h1>
                </div>}
            </div>
        </div>
    )
}
export default FormaBrisanjeUSP;




