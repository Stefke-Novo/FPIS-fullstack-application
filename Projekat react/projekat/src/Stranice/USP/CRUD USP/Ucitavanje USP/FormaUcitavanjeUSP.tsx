import React, { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import ControllerUSP from "../../../../Controllers/ControllerUSP";
import TezaUSP from "../../../../Klase/TezaUSP";
import UgovorSaPodizvodjacem from "../../../../Klase/UgovorSaPodizvodjacem";
import './FormaUcitavanjeUSP.css';
function FormaUcitavanjeUSP(){
    let usp1:ControllerUSP = new ControllerUSP();
    let [teze,setTeze]=useState([
        new TezaUSP(1,"Teza 1","Opis 1"),
        new TezaUSP(2,"Teza 2","Opis 2"),
        new TezaUSP(3,"Teza 3","Opis 3"),
        new TezaUSP(4,"Teza 4","Opis 4"),
        new TezaUSP(5,"Teza 5","Opis 5")
    ]);
    let [ugovorip,setUgovorip]=useState<Array<UgovorSaPodizvodjacem>>([]);
    useEffect(()=>{
        let {poruka,ugovori} = usp1.vratiSveUSP();
        setUgovorip(ugovori);
    },[]);
    let UgovoriHTML = ()=>{
        return(
            <>
            {ugovorip.map((ugovor: UgovorSaPodizvodjacem, i: number) => {
                return (
                    <div key={i} className="tabela">
                        <h3 className="boja1">ID ugovora: {ugovor.IDUSP}</h3>
                        <table>
                            <thead>
                                <tr className="boja3">
                                    <th>Redni broj teze</th>
                                    <th>Naziv teze</th>
                                    <th>Opis teze</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ugovor.teze.map((teza: TezaUSP, i: number) => {
                                    return (
                                        <tr key={i} className={i%2==0?"boja1":"boja2"}>
                                            <td className="teze">{i + 1}</td>
                                            <td className="teze">{teza.naziv}</td>
                                            <td className="teze">{teza.opis}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                );
            })} 
            </>
        )
    }
    return(
        <div id="FUUSPstranica">
            <h1 id="FUUSPnaslov">Ucitavanje svih ugovora sa podizvodjacima</h1>
            <div id="FUUSPtabela">
                <UgovoriHTML/>
            </div>
        </div>
    )
}
export default FormaUcitavanjeUSP;
