using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_projekat.Models
{
    public class UgovorSaPodizvodjacem
    {

        //private PonudaPodizvodjaca _ponuda;
        //private Zaposleni _zaposleni;
        //private int _IDUSP;
        //private DateTime _datumZakljucenja;
        //private DateTime _rokIzvrsenja;
        //private ICollection<TezaUSP> _teze;
        //public UgovorSaPodizvodjacem(int IDponude, int JMBG,int idusp,DateTime datumZakljucenja,DateTime rokIzvrsenja, List<TezaUSP> teze=null)
        //{
        //    this._IDUSP = idusp;
        //    this._datumZakljucenja = datumZakljucenja;
        //    this._rokIzvrsenja = rokIzvrsenja;
        //    this._teze = teze;
        //    this._IDponude = IDponude;
        //    this._JMBG = JMBG;
        //}
        [Key]
        public int IDUSP{get ;set ;}
        [ForeignKey("PonudaPodizvodjaca")]
        public int IDponude { get; set; }
        [ForeignKey("Zaposleni")]
        public int JMBG { get; set; }
        public DateTime DatumZakljucenja{ get ;set;}
        public DateTime RokIzvrsenja{get ;set ;}
        
        public ICollection<TezaUSP> Teze { get; set; }

        public PonudaPodizvodjaca? Ponuda { get; set; }

        public Zaposleni? Zaposleni { get; set; }

    }
}
