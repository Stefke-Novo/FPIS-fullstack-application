export default class PonudaPodizvodjaca{
    public idPonude:number;
    public nazivPonude:String;
    public datumPredaje:Date;
    public cena:number;


    constructor(idPonude:number,nazivPonude:String,datumPredaje:Date,cena:number){
        this.idPonude=idPonude;
        this.nazivPonude=nazivPonude;
        this.datumPredaje=datumPredaje;
        this.cena=cena;
    }
}