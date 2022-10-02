import React, { SyntheticEvent, useEffect, useState } from 'react';
import PonudaPodizvodjaca from '../../../../Klase/PonudaPodizvodjaca';
import ControllerPonudePodizvodjaca from '../../../../Controllers/ControllerPonudePodizvodjaca';
import './FormaKreiranjePonude.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
function FormaKreiranjePonude(){
    let p1 = new ControllerPonudePodizvodjaca();
    let [idPonude,setIdPonude]=useState<number>(0);
    let [poruka,setPoruka]=useState<string[]>([]);
    let [nazivPonude,setNazivPonude] = useState("");
    let [datumPredaje,setDatumPredaje] =useState(new Date().toISOString().split('T')[0]);
    let [cena,setCena] = useState(0);
    let [value, onChange] = useState<Date>(new Date());
    function kreirajPonudu(evt:SyntheticEvent):void{
        evt.preventDefault();
        let poruke:string[]=[];
        let provereno:boolean=false;
        
        if(idPonude==0){
            poruke.push("ID ponude ne sme biti 0");
        }
        if(cena==0){
            poruke.push("Cena ne sme da ima vrednost 0");
        }
        if(idPonude>0&&cena>0)
        provereno=true;
        setPoruka(poruke);
        let ponuda:PonudaPodizvodjaca;
        if(provereno){
            ponuda=new PonudaPodizvodjaca(idPonude,nazivPonude,new Date(datumPredaje),+cena);
            setPoruka([p1.kreirajPonudu(ponuda)]);
        }else
        return;
    }
    let PorukeGUI=()=>{
        return(
            <>
            {poruka.map((po:string,i)=>(
                <h3 key={i} className='FKPporuka'>{po}</h3>
            ))}
            
            </>
        )
    }
    return(
        <div id='FKPstranica' style={{backgroundImage:"url(/pocetna-pozadinska-slika.jpg)"}}>
            {/* <div id='FKPforma1'> */}
            {/* </div> */}
            <form id='FKPforma'>
            <h1 id='FKPnaslov'>Nova ponuda</h1>
            <div className='FKPformaOpcija'>
                    <label htmlFor="naziv">ID ponude</label>
                    <input type="number" name='naziv' value={idPonude} onChange={(evt)=>setIdPonude(+evt.target.value)}></input>
                </div>
                <div className='FKPformaOpcija'>
                    <label htmlFor="naziv">Naziv ponude</label>
                    <input type="text" name='naziv' value={nazivPonude} onChange={(evt)=>setNazivPonude(evt.target.value)}></input>
                </div>
                <div className='FKPformaOpcija'>
                    <label htmlFor="datum">Datum predaje</label>
                    <input type="date" name='datum' value={datumPredaje} onChange={(evt)=>setDatumPredaje(new Date(evt.target.value).toISOString().split('T')[0])}></input>
                </div>
                <div className='FKPformaOpcija'>
                    <label htmlFor="cena">Cena</label>
                    <input type="number" name='cena' value={cena} onChange={(evt)=>setCena(+evt.target.value)}></input>
                </div>
                <button id='FKPformaBtn' onClick={(evt)=>{kreirajPonudu(evt);}}>POTVRDI</button>
                <PorukeGUI/>
            </form>
            
        </div>
    )
}
export default FormaKreiranjePonude;