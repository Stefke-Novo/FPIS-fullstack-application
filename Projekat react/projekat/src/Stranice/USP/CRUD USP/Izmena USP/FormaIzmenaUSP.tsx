import React, { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import ControllerUSP from "../../../../Controllers/ControllerUSP";
import PonudaPodizvodjaca from "../../../../Klase/PonudaPodizvodjaca";
import TezaUSP from "../../../../Klase/TezaUSP";
import UgovorSaPodizvodjacem from "../../../../Klase/UgovorSaPodizvodjacem";
import { Zaposleni } from "../../../../Klase/Zaposleni";
import './FormaIzmenaUSP.css';
function FormaIzmenaUSP(){
    let u1:ControllerUSP=new ControllerUSP();
    // let [teze,setTeze]=useState([
    //     new TezaUSP(1,"Teza 1","Opis 1"),
    //     new TezaUSP(2,"Teza 2","Opis 2"),
    //     new TezaUSP(3,"Teza 3","Opis 3"),
    //     new TezaUSP(4,"Teza 4","Opis 4"),
    //     new TezaUSP(5,"Teza 5","Opis 5")
    // ]);
    let [nazivTeze,setNazivTeze]=useState("");
    let [opisTeze,setOpisTeze]=useState("");
    let [idPretrage,setIdPretrage]=useState(0);
    let [porukaPretrage,setPorukaPretrage]=useState("");
    let [ugovor,setUgovor] = useState(new UgovorSaPodizvodjacem(0,new Date(),new Date(),[]));
    let [poruka,setPoruka] = useState<String>("");
    let [ponuda,setPonuda] = useState<PonudaPodizvodjaca>(new PonudaPodizvodjaca(0,"",new Date(),0));
    let [zaposleni,setZaposleni]=useState<Zaposleni>(new Zaposleni(0,"","","",""));
    let [pronadjen,setPronadjen]=useState<boolean>(false);
    useEffect(()=>{
        setUgovor(()=>{
            ugovor.teze.forEach(teza=>{
                teza.redniBroj=ugovor.teze.findIndex(teza1=>teza1===teza)+1;
            })
            return ugovor;
        });
    },[ugovor.teze]);
    function dodajTezu(evt:any){
        evt.preventDefault();
        setUgovor({...ugovor,teze:[...ugovor.teze,new TezaUSP(ugovor.teze.length+1,nazivTeze,opisTeze)]});
    }
    function obrisiTezu(evt:any,teza:any){
        evt.preventDefault();
        setUgovor({...ugovor,teze:ugovor.teze.filter(tez=>tez!==teza)});
    }
    function pronadjiUgovor(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        evt.preventDefault();
        let {poruka,ponuda,zaposleni,ugovor} = u1.pronadjiUSP(idPretrage);
        console.log({poruka,ponuda,zaposleni,ugovor});
        if(poruka=="Ugovor je uspesno pronadjen"){
            setPronadjen(true);
            setUgovor(ugovor);
            setZaposleni(zaposleni);
            setPonuda(ponuda);
        }
        setPorukaPretrage(poruka);
    }
    function izmeniUgovor(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        evt.preventDefault();
        if(ugovor.IDUSP==0){
            setPoruka("Ugovor nije ucitan");
            return;
        }
        setPoruka(u1.izmeniUgovor(zaposleni,ponuda,ugovor));
        console.log("Funkcija je pozvana");
    }
    return(
        <div>
            <h1 id="IUSPnaslov">Izmena ugovora sa podizvodjacem</h1>
            <div id="IUSPforma">
                <h3>Pretraga ugovora</h3>
                <div >
                    <label htmlFor="">ID ugovora sa podizvodjacem</label>
                    <input type="number" value={idPretrage} onChange={(evt)=>setIdPretrage(+evt.target.value)} />
                    <small>{porukaPretrage}</small>
                </div>
                <button onClick={(evt)=>pronadjiUgovor(evt)}>Pronadji ugovor sa podizvodjacem</button>
            </div>
            {pronadjen&&(
                <div id="IUSPforma1">
                <div id="IUSPtezaUgovora">
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
                <div id="IUSPgrupisano1">
                    <div>
                        <label htmlFor="">Rok izvrsenja</label>
                        <input type="date" value={ugovor.rokIzvrsenja.toString().split("T")[0]} onChange={(evt)=>setUgovor({...ugovor,rokIzvrsenja:new Date(evt.target.value)})} />
                    </div>
                    <div>
                        <label htmlFor="">Datum zakljucenja</label>
                        <input type="date" value={ugovor.datumZakljucenja.toString().split("T")[0]} onChange={(evt)=>setUgovor({...ugovor,datumZakljucenja:new Date(evt.target.value)})}/>
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
                        <tbody id="body">
                            {ugovor.teze.map((teza,i)=>{
                                return(
                                <tr key={i}>
                                    <td className="teze">{i+1}</td>
                                    <td className="teze">{teza.naziv}</td>
                                    <td className="teze">{teza.opis}</td>
                                    <td className="ikonice" onClick={(evt)=>{obrisiTezu(evt,teza);}}><BiTrash size="2rem" /></td>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                </div>
                <button id="IUSPbtn" onClick={(evt)=>izmeniUgovor(evt)}>Izmeni Ugovor</button>
            </div>
            )}
            <h1 id="IUSPporuka" >{poruka}</h1>
        </div>
    )
}
export default FormaIzmenaUSP;






