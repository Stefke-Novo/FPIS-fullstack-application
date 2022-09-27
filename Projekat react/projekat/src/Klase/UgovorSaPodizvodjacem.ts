import TezaUSP from "./TezaUSP";

export default class UgovorSaPodizvodjacem{
    public IDUSP:number;
    public datumZakljucenja:Date;
    public rokIzvrsenja:Date; 
    public teze:Array<TezaUSP>;

    constructor(IDUSP:number,datumZakljucenja:Date,rokIzvrsenja:Date,teze:Array<TezaUSP>){
        this.IDUSP=IDUSP;
        this.datumZakljucenja=datumZakljucenja;
        this.rokIzvrsenja=rokIzvrsenja;
        this.teze=teze;
    }
}