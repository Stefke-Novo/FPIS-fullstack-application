using API_projekat.Models;
using Microsoft.AspNetCore.Mvc;

namespace API_projekat.Data
{
    public interface ISqlRepo
    {
        public List<PonudaPodizvodjaca> vratiSvePonude();
        public string kreirajPonuduPodizvodjaca(PonudaPodizvodjaca ponuda);
        public string obrisiPonudu(PonudaPodizvodjaca ponuda);
        public PonudaPodizvodjaca pretraziPonudu(int p);
        public PonudaPodizvodjaca pretraziPonudu(PonudaPodizvodjaca p);
        public string kreirajUSP(UgovorSaPodizvodjacem ugovor);
        public List<UgovorSaPodizvodjacem> vratiSveUSP();
        public UgovorSaPodizvodjacem pronadjiUSP(int IDUSP);
        public string kreirajZaposlenog(Zaposleni z);
        public IEnumerable<Zaposleni> ucitajZaposlene();
        public Zaposleni ucitajZaposlenog(int jmbg);
        public string izmeniZaposlenog(Zaposleni z);
        public string izbrisiZaposlenog(Zaposleni z);
        public string izbrisiUSP(UgovorSaPodizvodjacem ugovor);
        public string izmeniUSP(UgovorSaPodizvodjacem ugovor);
    }
}
