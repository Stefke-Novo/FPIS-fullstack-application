import { Zaposleni } from "../Klase/Zaposleni";
import $ from 'jquery';
export default class ControllerZaposleni{
    constructor(){

    }
    public unesiZaposlenog(z:Zaposleni):string{
        let poruka:string="";
        $.ajax({
            async:false,
            url:"https://localhost:7075/Zaposleni/unesiZaposlenog",
            method:"POST",
            contentType:"application/json",
            data:this.prevediTipZaposleniUObject(z)
        }).done(function(data, textStatus, jqXHR){
            console.log(jqXHR.responseText);
            poruka= jqXHR.responseText;
        }).fail(function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR.responseText);
            poruka =jqXHR.responseText;
        });
        return poruka;
    }
    private prevediTipZaposleniUObject(z:Zaposleni){
        let zaposleni = {"jmbg": z.JMBG,"ime": z.ime,"prezime": z.prezime,"pozicija": z.pozicija,"status":z.status}
          console.log(JSON.stringify(zaposleni));
          return JSON.stringify(zaposleni);
    }
    public ucitajZaposlene():any{
        let zaposleni:Array<Zaposleni>=[];
        let poruka:string="";
        $.ajax({
            async:false,
            url:"https://localhost:7075/Zaposleni/ucitajZaposlene",
            method:"GET",
        }).done(function(data, textStatus, jqXHR){
            console.log("uspesno unosenje zaposlenog");
            data.forEach((element:any) => {
                zaposleni.push(new Zaposleni(element.jmbg,element.ime,element.prezime,element.pozicija,element.status));
            });
            poruka="Uspesno su ucitani zaposleni";
        }).fail(function(jqXHR, textStatus, errorThrown){
            console.log("neuspeno unosenje zaposlenog");
        });
        return {poruka:poruka,zaposleni:zaposleni};
    }
    public izmeniZaposlenog(z:Zaposleni):{poruka:string}{
        let poruka:string="";
        $.ajax({
            async:false,
            url:"https://localhost:7075/Zaposleni/izmeniZaposlenog",
            method:"POST",
            contentType:"application/json",
            data:this.prevediTipZaposleniUObject(z)
        }).done(function(data, textStatus, jqXHR){
            console.log("uspesna izmena zaposlenog");
            poruka=data;
        }).fail(function(jqXHR, textStatus, errorThrown){
            console.log("neuspesna izmena zaposlenog");
            poruka=errorThrown.toString();
        });
        return {poruka:poruka};
    }
    public ucitajZaposlenog(jmbg:number):{poruka:string,zaposleni:Zaposleni}{
        let zaposleni:Zaposleni=new Zaposleni(0,"","","","");
        let poruka:string="";
        $.ajax({
            async:false,
            url:`https://localhost:7075/Zaposleni/ucitajZaposlenog?jmbg=${jmbg}`,
            method:"GET",
        }).done(function(data, textStatus, jqXHR){
            console.log("uspesno ucitavnje zaposlenog");
            zaposleni=new Zaposleni(data.jmbg,data.ime,data.prezime,data.pozicija,data.status);
            poruka="Zaposleni je uspesno ucitan";
        }).fail(function(jqXHR, textStatus, errorThrown){
            console.log("neuspeno ucitavanje zaposlenog");
            poruka=errorThrown.toString();
        });
        return {poruka:poruka,zaposleni:zaposleni};
    }
    public izbrisiZaposlenog(z:Zaposleni):string{
        let poruka:string="";
        $.ajax({
            async:false,
            url:"https://localhost:7075/Zaposleni/izbrisiZaposlenog",
            method:"DELETE",
            contentType:"application/json",
            data:this.prevediTipZaposleniUObject(z)
        }).done(function(data, textStatus, jqXHR){
            console.log("uspesno brisanje zaposlenog");
            poruka= data;
        }).fail(function(jqXHR, textStatus, errorThrown){
            console.log("neuspeno brisanje zaposlenog");
            poruka= errorThrown.toString();
        });
        return poruka;
    }
}