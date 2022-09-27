import $ from 'jquery'
import { stringify } from 'querystring';
import PonudaPodizvodjaca from '../Klase/PonudaPodizvodjaca';
import TezaUSP from '../Klase/TezaUSP';
import UgovorSaPodizvodjacem from '../Klase/UgovorSaPodizvodjacem';
import { Zaposleni } from '../Klase/Zaposleni';
export default class ControllerUSP{
    constructor(){

    }
    public vratiSveUSP():{poruka:String,ugovori:Array<UgovorSaPodizvodjacem>}{
        let ugovori:Array<UgovorSaPodizvodjacem>=[];
        let poruka:string="";
        $.ajax({
            async:false,
            url:"https://localhost:7075/UgovorSaPodizvodjacem/vratiSveUSP",
        }).done(function(data, textStatus, jqXHR){
            data.forEach((ugovor:{idusp:number,datumZakljucenja:Date,rokIzvrsenja:Date, 
                teze:Array<{redniBroj: number,nazivTeze: String,opisTeze: String}>;
            }) => {
                    let teze:Array<TezaUSP>=[];
                    ugovor.teze.forEach((element:{redniBroj: number,nazivTeze: String,opisTeze: String}) => {
                        teze.push(new TezaUSP(element.redniBroj,element.nazivTeze,element.opisTeze));
                    });
                    ugovori.push(new UgovorSaPodizvodjacem(ugovor.idusp,ugovor.datumZakljucenja,ugovor.rokIzvrsenja,teze));
                    poruka="Uspesno su ucitani ugovori";
                    });
        })
        return {poruka:poruka,ugovori:ugovori};
    }
    public kreirajNoviUgovor(z:Zaposleni , p:PonudaPodizvodjaca , u:UgovorSaPodizvodjacem):string{
        let odgovor:string="";
        $.ajax({
            async:false,
            url:"https://localhost:7075/UgovorSaPodizvodjacem/kreirajUSP",
            method:"POST",
            contentType:"application/json",
            data:this.pretvoriPodatkeuJSON(z,p,u)
        }).done(function(data, textStatus, jqXHR){
            odgovor=jqXHR.responseText;
        }).fail(function(jqXHR, textStatus, errorThrown){
            odgovor=jqXHR.responseText;
        });
        return odgovor;
    }
    private pretvoriPodatkeuJSON(z: Zaposleni, p: PonudaPodizvodjaca, u: UgovorSaPodizvodjacem):any{
        let zap = {jmbg:z.JMBG,ime:z.ime,prezime:z.prezime,pozicija:z.pozicija,status:z.status}
        let pon = {iDponude: p.idPonude, nazivPounde:p.nazivPonude , datumPredaje: p.datumPredaje, cena:p.cena}
        let ugovor = {idusp:u.IDUSP,iDponude:p.idPonude,jmbg:z.JMBG,datumZakljucenja:u.datumZakljucenja,rokIzvrsenja:u.rokIzvrsenja,teze:u.teze,ponuda:null,zaposleni:null}
        return JSON.stringify(ugovor);
    }
    public pronadjiUSP(id:number):{poruka:string,ponuda:PonudaPodizvodjaca,zaposleni:Zaposleni,ugovor:UgovorSaPodizvodjacem}{
        let ponuda:PonudaPodizvodjaca;
        let zaposleni:Zaposleni;
        let ugovor:UgovorSaPodizvodjacem;
        let rez= {poruka:"",ponuda:new PonudaPodizvodjaca(0,"",new Date(),0),
        zaposleni:new Zaposleni(0,"","","",""),
        ugovor:new UgovorSaPodizvodjacem(0,new Date(),new Date(),[])};
        $.ajax({
            async:false,
            url:`https://localhost:7075/UgovorSaPodizvodjacem/pronadjiUSP/${id}`,
            method:"GET",
        }).done(function(data, textStatus, jqXHR){
            ponuda=new PonudaPodizvodjaca(data.ponuda.iDponude,data.ponuda.nazivPonude,data.ponuda.datumPredaje,data.ponuda.cena);
            zaposleni=new Zaposleni(data.zaposleni.jmbg,data.zaposleni.ime,data.zaposleni.prezime,data.zaposleni.pozicija,data.zaposleni.status);
            ugovor=new UgovorSaPodizvodjacem(data.idusp,data.datumZakljucenja,data.rokIzvrsenja,[]);
            data.teze.forEach((teza:any) => {
                ugovor.teze.push(new TezaUSP(teza.redniBroj,teza.naziv,teza.opis))
            });
            rez= {poruka:"Ugovor je uspesno pronadjen",ponuda:ponuda,zaposleni:zaposleni,ugovor:ugovor};
        }).fail(function(jqXHR, textStatus, errorThrown){
            rez= {poruka:"Ugovor nije uspesno pronadjen",ponuda:new PonudaPodizvodjaca(0,"",new Date(),0),
            zaposleni:new Zaposleni(0,"","","",""),
            ugovor:new UgovorSaPodizvodjacem(0,new Date(),new Date(),[])};
        });
        return rez;
    }
    public izbrisiUgovor(ugovor:UgovorSaPodizvodjacem,zaposleni:Zaposleni,ponuda:PonudaPodizvodjaca):string{
        let odgovor:string="";
        $.ajax({
            async:false,
            url:"https://localhost:7075/UgovorSaPodizvodjacem/izbrisiUSP",
            method:"DELETE",
            contentType:"application/json",
            data:this.pretvoriPodatkeuJSON(zaposleni,ponuda,ugovor)
        }).done(function(data, textStatus, jqXHR){
            odgovor=jqXHR.responseText;
        });
        return odgovor;
    }
    public izmeniUgovor(z:Zaposleni,p:PonudaPodizvodjaca,u:UgovorSaPodizvodjacem):string{
        let odgovor:string="";
        $.ajax({
            async:false,
            url:"https://localhost:7075/UgovorSaPodizvodjacem/izmeniUSP",
            method:"POST",
            contentType:"application/json",
            data:this.pretvoriPodatkeuJSON(z,p,u)
        }).done(function(data, textStatus, jqXHR){
            odgovor=jqXHR.responseText;
        });
        return odgovor;
    }
}


