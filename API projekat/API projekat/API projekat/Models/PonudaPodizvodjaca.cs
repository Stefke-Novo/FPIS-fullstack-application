using System.ComponentModel.DataAnnotations;
using System.Diagnostics;

namespace API_projekat.Models
{
    public class PonudaPodizvodjaca
    {

        //private int _IDponude;
        //private string _nazivPonude;
        //private DateTime _datumPredaje;
        //private Decimal _cena;

        //public PonudaPodizvodjaca(int IDponude,string nazivPonude,DateTime datumPredaje,Decimal cena)
        //{
        //    this._IDponude = IDponude;
        //    this._nazivPonude = nazivPonude;
        //    this._datumPredaje = datumPredaje;
        //    this._cena = cena;
        //}
        [Key]
        public int IDponude{ get;set;}
        public string NazivPonude{get;set;} = String.Empty;
        public DateTime DatumPredaje{get;set;}
        public Decimal Cena{get;set;}
        
        ICollection<UgovorSaPodizvodjacem> Ugovori = null;
        //public string vratiString()
        //{
        //    return "id: " + this._IDponude + " naziv: " + this._nazivPonude + " datum predaje: " + this._datumPredaje + " cena: " + this._cena;
        //}
    }
}
