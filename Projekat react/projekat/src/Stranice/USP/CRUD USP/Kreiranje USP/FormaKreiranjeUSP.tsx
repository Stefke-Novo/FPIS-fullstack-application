import React, { useEffect, useState } from "react";
import TezaUSP from "../../../../Klase/TezaUSP";
import './FormaKreiranjeUSP.css';
import {BiTrash} from 'react-icons/bi';
import ControllerZaposleni from "../../../../Controllers/ControllerZaposleni";
import ControllerPonudePodizvodjaca from "../../../../Controllers/ControllerPonudePodizvodjaca";
import { Zaposleni } from "../../../../Klase/Zaposleni";
import PonudaPodizvodjaca from "../../../../Klase/PonudaPodizvodjaca";
import ControllerUSP from "../../../../Controllers/ControllerUSP";
import UgovorSaPodizvodjacem from "../../../../Klase/UgovorSaPodizvodjacem";

function FormaKreiranjeUSP() {
    let z1:ControllerZaposleni=new ControllerZaposleni();
    let p1:ControllerPonudePodizvodjaca=new ControllerPonudePodizvodjaca();
    let u1:ControllerUSP= new ControllerUSP();
    // let [teze,setTeze]=useState([
    //     new TezaUSP(1,"Teza 1","Opis 1"),
    //     new TezaUSP(2,"Teza 2","Opis 2"),
    //     new TezaUSP(3,"Teza 3","Opis 3"),
    //     new TezaUSP(4,"Teza 4","Opis 4"),
    //     new TezaUSP(5,"Teza 5","Opis 5")
    // ]);
    let [nazivTeze,setNazivTeze]=useState("");
    let [opisTeze,setOpisTeze]=useState("");
    let [IDponude, setIDponude] = useState(0);
    let [IDzaposlenog, setIDzaposlenog]=useState(0);
    let [porukaPonude,setPorukaPonude]=useState("");
    let [porukaZaposlenog,setPorukaZaposlenog]=useState("");
    let [zapos,setZapos]=useState(new Zaposleni(0,"","","",""));
    let [ponud, setPonud]=useState(new PonudaPodizvodjaca(0,"",new Date(),0));
    useEffect(()=>{
        console.log(ponud);
    },[ponud]);
    let [ugovor,setUgovor]=useState(new UgovorSaPodizvodjacem(0,new Date(),new Date(),[]))
    function dodajTezu(evt:any){
        evt.preventDefault();
        //setTeze([...teze,new TezaUSP(teze.length+1,nazivTeze,opisTeze)]);
        setUgovor({...ugovor,teze:[...ugovor.teze,new TezaUSP(ugovor.teze.length+1,nazivTeze,opisTeze)]});
    }
    function obrisiTezu(evt:any,teza:any){
        evt.preventDefault();
        //setTeze(teze.filter(tez=>tez!==teza));
        setUgovor({...ugovor,teze:ugovor.teze.filter(t=>t!=teza)});
    }
    function ukljuciPonudu(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        evt.preventDefault();
        let {proslo,poruka}=p1.nadjiPonudu(IDponude);
        if(proslo){
            setPorukaPonude("Uspesno je ucitana ponuda");
            setPonud(new PonudaPodizvodjaca(poruka.idPonude,poruka.nazivPonude,poruka.datumPredaje,poruka.cena));
        }
        else
            setPorukaPonude("Ponuda ne postoji u bazi");
    }
    function ukljuciZaposlenog(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        evt.preventDefault();
        let {poruka,zaposleni}=z1.ucitajZaposlenog(IDzaposlenog);
        setPorukaZaposlenog(poruka);
        setZapos(zaposleni)
    }
    function kreiranjeNovogUgovora(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        evt.preventDefault();
        console.log({ponud:ponud,zapos:zapos,ugovor:ugovor});
        u1.kreirajNoviUgovor(zapos,ponud,ugovor);
    }
    return(
        <div>
            <h1 id="FKUSPnaslov">Kreiranje ugovora sa podizvodjacem</h1>
            <div id="FKUSPforma">
                <h2>Nalazenje ponude i zaposlenog</h2>
                <div id="FKUSPgrupisano">
                    <div>
                        <div>
                            <label htmlFor="">Ponuda podizvodjaca</label>
                            <input type="number" value={IDponude} onChange={(evt)=>setIDponude(+evt.target.value)}/>
                            <small>{porukaPonude}</small>
                        </div>
                        <button onClick={(evt)=>ukljuciPonudu(evt)}>Ukljuci ponudu podizvodjaca u ugovor</button>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="">Zaposleni</label>
                            <input type="number" value={IDzaposlenog} onChange={(evt)=>setIDzaposlenog(+evt.target.value)}/>
                            <small>{porukaZaposlenog}</small>
                        </div>
                        <button onClick={(evt)=>ukljuciZaposlenog(evt)}>Ukljuci zaposlenog u ugovor</button>
                    </div>
                </div>
                <div>
                    <label htmlFor="">ID ugovora</label>
                    <input type="number" value={ugovor.IDUSP} onChange={(evt)=>setUgovor({...ugovor,IDUSP:+evt.target.value})} />
                </div>
                <div id="FKUSPtezaUgovora">
                    <h3>Teza ugovora</h3>
                    <div>
                        <label htmlFor="">Naziv stavke</label>
                        <input type="text" 
                        value={nazivTeze}
                        onChange={(evt)=>{setNazivTeze(evt.target.value)}} 
                        />
                    </div>
                    <div>
                        <label htmlFor="">Opis stavke (sadrzaj stavke)</label>
                        <textarea 
                        value={opisTeze}
                        onChange={(evt)=>{setOpisTeze(evt.target.value)}}
                        />
                    </div>
                    <button onClick={(evt)=>{dodajTezu(evt)}}>Dodaj tezu ugovora</button>
                </div>
                <div id="FKUSPgrupisano1">
                    <div>
                        <label htmlFor="">Rok izvrsenja</label>
                        <input type="date" />
                    </div>
                    <div>
                        <label htmlFor="">Datum zakljucenja</label>
                        <input type="date" />
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Redni broj teze</th>
                                <th>Naziv teze</th>
                                <th>Opis teze</th>
                                <th>Izbaci tezu</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ugovor.teze.map((teza,i)=>{
                                return(
                                <tr key={i}>
                                    <td className="teze">{i+1}</td>
                                    <td className="teze">{teza.naziv}</td>
                                    <td className="teze">{teza.opis}</td>
                                    <td className="ikonice"><BiTrash size="2rem" onClick={(evt)=>{obrisiTezu(evt,teza);}}/></td>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                </div>
                <button onClick={(evt)=>kreiranjeNovogUgovora(evt)}>Kreiraj novi ugovor</button>
            </div>
        </div>
    )
}
export default FormaKreiranjeUSP;






