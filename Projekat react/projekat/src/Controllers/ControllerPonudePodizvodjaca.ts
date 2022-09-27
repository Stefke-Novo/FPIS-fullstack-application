import PonudaPodizvodjaca from "../Klase/PonudaPodizvodjaca";
import $ from 'jquery';
import { SetStateAction } from "react";
export default class ControllerPonudePodizvodjaca{
    public kreirajPonudu=(p:PonudaPodizvodjaca):string=>{
        let odgovor="";
        $.ajax({
            async:false,
            url:"https://localhost:7075/PonudaPodizvodjaca/kreirajPonudu",
            type:"POST",
            contentType:"application/json",
            data:this.pretvoriPonuduUObjectTip(p)
        }).done(function(data, textStatus, jqXHR) {
            odgovor=data;
          })
          .fail(function(jqXHR, textStatus, errorThrown ) {
            odgovor=jqXHR.responseText;
          });
        return odgovor;
    }
    private pretvoriPonuduUObjectTip(p:PonudaPodizvodjaca):any{
        let objekat = {"iDponude":p.idPonude,"nazivPonude":p.nazivPonude,"datumPredaje":p.datumPredaje.toISOString(),"cena":p.cena};
        console.log(JSON.stringify(objekat));
        return JSON.stringify(objekat);
    }
    public nadjiPonudu=(p:number)=>{
        let odgovor={proslo:false,poruka:{idPonude:0,nazivPonude:"",datumPredaje:new Date(),cena:0}};
        $.ajax({
            async:false,
            url:"https://localhost:7075/PonudaPodizvodjaca/pretraziPonudu",
            type:"GET",
            contentType:"application/json",
            data:{"p":p},
        }).done(function(data, textStatus, jqXHR) {
            odgovor.proslo=true;
            odgovor.poruka={idPonude:data.iDponude,nazivPonude:data.nazivPounde,datumPredaje:data.datumPredaje,cena:data.cena};
            console.log(data);
          }).fail(function(jqXHR, textStatus, errorThrown ) {
            odgovor.proslo=false;
            odgovor.poruka={idPonude:-1,nazivPonude:"",datumPredaje:new Date(),cena:0};
          });
          return odgovor;
    }
    public obrisiPonudu=(p:PonudaPodizvodjaca)=>{
      let odgovor={proslo:false,poruka:""};
      $.ajax({
          async:false,
          url:"https://localhost:7075/PonudaPodizvodjaca/obrisiPonudu",
          type:"DELETE",
          contentType:"application/json",
          data:this.pretvoriPonuduUObjectTip(p),
      }).done(function(data, textStatus, jqXHR) {
          odgovor.proslo=true;
          odgovor.poruka=data;
        }).fail(function(jqXHR, textStatus, errorThrown ) {
          odgovor.proslo=false;
          odgovor.poruka=jqXHR.responseText;
        });
        return odgovor;
  }
}