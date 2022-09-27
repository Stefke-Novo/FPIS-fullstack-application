export class Zaposleni{
    public JMBG:number;
    public ime:string;
    public prezime:string;
    public pozicija:string;
    public status:string;
    constructor(JMBG:number,ime:string,prezime:string,pozicija:string,status:string){
        this.JMBG=JMBG;
        this.ime=ime;
        this.prezime=prezime;
        this.pozicija=pozicija;
        this.status=status;
    }
}