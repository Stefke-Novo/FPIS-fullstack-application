import React, { useEffect, useState } from 'react';
import ControllerPonudePodizvodjaca from '../../../../Controllers/ControllerPonudePodizvodjaca';
import PonudaPodizvodjaca from '../../../../Klase/PonudaPodizvodjaca';
import './FormaBrisanjePonude.css';
function FormaBrisanjePonude(){
    let p1 = new ControllerPonudePodizvodjaca();
    let [idPonude,setIdPonude]=useState("");
    let [pronadjeno,setPronadjeno]=useState(false);
    let [pporuka,setPporuka]=useState("");
    let [ponuda,setPonuda]=useState(new PonudaPodizvodjaca(0,"",new Date(),0));
    function pretraziIDPonudePodizvodjaca(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        evt.preventDefault();
        var odgovor=p1.nadjiPonudu(+idPonude);
        if(odgovor.proslo){
            setPronadjeno(true);
            console.log(odgovor.poruka.idPonude);
            setPonuda(new PonudaPodizvodjaca(+idPonude,odgovor.poruka.nazivPonude,new Date(odgovor.poruka.datumPredaje),odgovor.poruka.cena));
            setPporuka("Ponuda je pronadjena");
        }
        if(pronadjeno==true&&odgovor.proslo==false){
            setPronadjeno(false);
        }
        if(odgovor.proslo==false)
        setPporuka("Ponuda sa catim ID-jem se ne nalazi u sistemu");
    }
    function obrisiPonuduPodizvodjaca(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        evt.preventDefault();
        var odgovor=p1.obrisiPonudu(ponuda);
        console.log(odgovor);
        setPporuka(odgovor.poruka);
    }
    return(
        <div id='FBPstranica' style={{backgroundImage:"url(/iStock-490880575.jpg)"}} >
            <div id='FBPpodela'>
                <form id='FBPforma'>
                    <h3>Da li ponuda postoji u sistemu ?</h3>
                    <div>
                        <label htmlFor="">ID ponude :</label>
                        <input type="number" value={idPonude} onChange={(evt)=>setIdPonude(evt.target.value)}/>
                    </div>
                    <h4 id='FBPodgovor'>{pporuka}</h4>
                    <button className='FBPBtn' onClick={(evt)=>{pretraziIDPonudePodizvodjaca(evt)}}>Pretrazi</button>
                </form>
                {pronadjeno&&(<div id='FBPforma1'>
                    <h2>Da li zelite da obrisete ponudu ?</h2>
                    <div id='FBPforma1Div'>
                        <label>ID ponude: {ponuda.idPonude}</label>
                        <label>Naziv ponude: {ponuda.nazivPonude}</label>
                        <label>Datum predaje: {ponuda.datumPredaje.toDateString()}</label>
                        <label>Cena: {ponuda.cena}</label>
                    </div>
                    <div>
                        <button className='FBPBtn' onClick={(evt)=>obrisiPonuduPodizvodjaca(evt)}>Da</button>
                        <button className='FBPBtn'>Ne</button>
                    </div>
                </div>)}
            </div>
        </div>
    )
}
export default FormaBrisanjePonude;


