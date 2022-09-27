using System.ComponentModel.DataAnnotations;

namespace API_projekat.Models
{
    public class Zaposleni
    {

        //private int _JMBG;
        //private string _ime;
        //private string _prezime;
        //private string _pozicija;
        //private string _status;
        //public Zaposleni(int jMBG, string ime, string prezime, string pozicija, string status)
        //{
        //    _JMBG = jMBG;
        //    _ime = ime;
        //    _prezime = prezime;
        //    _pozicija = pozicija;
        //    _status = status;
        //}
        [Key]
        public int JMBG { get; set; }
        public string Ime { get; set; } = String.Empty;
        public string Prezime { get; set; } = String.Empty;
        public string Pozicija { get; set; } = String.Empty;
        public string Status { get; set; } = String.Empty;

        ICollection<UgovorSaPodizvodjacem> Ugovori = null;
    }
}
