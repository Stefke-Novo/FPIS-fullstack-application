using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_projekat.Models
{
    public class TezaUSP
    {
        //[Key]
        //private int _IDponude;
        //[Key]
        //private int _JMBG;
        //[Key]
        //private int _IDUSP;
        //[Key]
        //private int _redniBroj;
        //private string _naziv;
        //private string _opis;
        //public TezaUSP(int redniBroj, string naziv, string opis)
        //{
        //    this._redniBroj = redniBroj;
        //    this._naziv = naziv;
        //    this._opis = opis;
        //}
        [Key,ForeignKey("UgovorSaPodizvodjacem")]
        public int IDponude { get; set; }
        [ForeignKey("UgovorSaPodizvodjacem")]
        public int JMBG { get; set; }
        [ForeignKey("UgovorSaPodizvodjacem")]
        public int IDUSP { get; set; }
        public int RedniBroj {get;set ;}
        public string Naziv { get; set; } = String.Empty;
        public string Opis {get;set;} = String.Empty;
    }
}
