using API_projekat.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System.Linq;

namespace API_projekat.Data
{
    public class SqlIspitRepo : ISqlRepo
    {
        private readonly PonudaPodizvodjacaContext context;
        public SqlIspitRepo(PonudaPodizvodjacaContext context)
        {
            this.context = context;
        }

        public string izbrisiZaposlenog(Zaposleni z)
        {
            if (z != null && z.JMBG > 0 && context.Zaposleni.Any(z1 => z1.JMBG == z.JMBG))
            {
                
                context.Zaposleni.Remove(z);
                try
                {
                    context.SaveChanges(true);
                    return "Zaposleni je uspesno izbrisan";
                }catch(Exception e)
                {
                    context.SaveChanges(false);
                    return "Desila se greska";
                }
                return "Zaposleni je uspesno izbrisan";
            }
            else
            {
                Console.WriteLine("Zaposleni nije pronadjen");
                return "Zaposleni nije uspesno izbrisan";
            }
        }

        public string izmeniZaposlenog(Zaposleni z)
        {
            
            if (z != null && z.JMBG > 0 && context.Zaposleni.Any(z1 => z1.JMBG == z.JMBG))
            {
                Zaposleni z1 = context.Zaposleni.FirstOrDefault(z1 => z1.JMBG == z.JMBG);
                z1.Ime = z.Ime;
                z1.Prezime = z.Prezime;
                z1.Pozicija = z.Pozicija;
                z1.Status = z.Status;
                z1.JMBG = z.JMBG;
                context.Zaposleni.Update(z1);
                try
                {
                    context.Entry(z1).State = EntityState.Modified;
                    context.SaveChanges(true);
                }catch(Exception e)
                {
                    context.SaveChanges(false);
                    return "Desila se greska";
                }
                return "Zaposleni je uspesno zamenjen";
            }
            else
            {
               return "Zaposleni nije pronadjen";
               
            }
        }

        public string kreirajPonuduPodizvodjaca(PonudaPodizvodjaca ponuda)
        {
            if (!ponuda.Equals(null)&&!context.PonudePodizvodjaca.Any(pon=>pon.IDponude==ponuda.IDponude))
            { 
                context.PonudePodizvodjaca.Add(ponuda);
                try
                {
                    context.SaveChanges(true);
                    return "Ponuda je uspesno kreirana";
                }catch(Exception e)
                {
                    context.SaveChanges(false);
                    return "Desila se greska";
                }
                return "Objekat je uspesno ucitan";
            }
            else
            {
                Console.WriteLine("Neuspesno");
                return "Objekat postoji u bazi";
            }
        }

        public string kreirajUSP(UgovorSaPodizvodjacem ugovor)
        {
            {
                if (ugovor != null && !context.Ugovori.Any(ugov => ugov.IDUSP == ugovor.IDUSP))
                {
                    //Console.WriteLine("Ugovor se unosi u bazu");
                    try
                    {
                        context.Add(ugovor);
                        //context.SaveChanges(true);
                        //this.kreirajUSP(ugovor);
                        context.SaveChanges(true);
                    }catch(Exception e)
                    {
                        Console.WriteLine(e.Message);
                        context.SaveChanges(false);
                        return "Desila se greska";
                    }
                    return "Ugovor je uspesno ubacen u bazu";
                }
                return "Ugovor se vec nalazi u bazi";
            }
        }

        public string obrisiPonudu(PonudaPodizvodjaca ponuda)
        {
            if (!ponuda.Equals(null)&&context.PonudePodizvodjaca.Any(p=>p.IDponude==ponuda.IDponude))
            {
                context.PonudePodizvodjaca.Remove(ponuda);
                try
                {
                    context.SaveChanges(true);
                }catch(Exception e)
                {
                    context.SaveChanges(false);
                    return "Desila se greska";
                }
                Console.WriteLine("Uspesno obrisan");
                return "Objekat je uspesno obrisan";
            }
            else
            {
                Console.WriteLine("Greska prilikom brisanja");
                return "Objekat ne postoji u bazi";
            }
        }

        public PonudaPodizvodjaca pretraziPonudu(int p)
        {
            if (!p.Equals(null) && context.PonudePodizvodjaca.Any(p1 => p1.IDponude == p))
            {
                PonudaPodizvodjaca pon = context.PonudePodizvodjaca.FirstOrDefault(p1=>p1.IDponude==p);
                return pon;
            }
            else
            {
                return null;
            }
        }

        public PonudaPodizvodjaca pretraziPonudu(PonudaPodizvodjaca p)
        {
            if (p != null && context.PonudePodizvodjaca.Any(p1 => p1.IDponude == p.IDponude))
            {
                return context.PonudePodizvodjaca.FirstOrDefault(po => po.IDponude == p.IDponude);
                  
            }
            else { return null; }
        }

        public UgovorSaPodizvodjacem pronadjiUSP(int IDUSP)
        {
            if (IDUSP > 0 && context.Ugovori.Any(ugov => ugov.IDUSP == IDUSP))
            {
                var ugovor = context.Ugovori.First(u => u.IDUSP == IDUSP);
                ugovor.Teze = context.teze.Where(t => t.IDUSP == ugovor.IDUSP).ToList();
                ugovor.Zaposleni = context.Zaposleni.First(z => z.JMBG == ugovor.JMBG);
                ugovor.Ponuda = context.PonudePodizvodjaca.First(p => p.IDponude == ugovor.IDponude);
                return context.Ugovori.First(u => u.IDUSP == IDUSP);
            }
            return null ;
        }

        public IEnumerable<Zaposleni> ucitajZaposlene()
        {
            return context.Zaposleni.ToList();
        }

        public Zaposleni ucitajZaposlenog(int jmbg)
        {
            if (jmbg > 0 && context.Zaposleni.Any(z => z.JMBG == jmbg))
            {
                
                return context.Zaposleni.FirstOrDefault(z => z.JMBG == jmbg);
            }
            else
            {
                return null;
            }
        }

        public string kreirajZaposlenog(Zaposleni z)
        {
            Console.WriteLine(z.ToString());
            if (z != null&&!context.Zaposleni.Any(z1=>z1.JMBG==z.JMBG))
            {
                
                context.Zaposleni.Add(z);
                try
                {
                    context.SaveChanges(true);
                    return "Zaposleni je uspesno sacuvan";
                }
                catch(Exception e)
                {
                    context.SaveChanges(false);
                    return "Desila se greska";
                }
            }
            else
            {
                return "Zaposleni vec postoji u sistemu";
            }
        }

        public List<PonudaPodizvodjaca> vratiSvePonude()
        {
            return context.PonudePodizvodjaca.ToList();
        }

        public List<UgovorSaPodizvodjacem> vratiSveUSP()
        {
            var ugovori=context.Ugovori.ToList();
            ugovori.ForEach(ugovor => {
                ugovor.Teze = context.teze.Where(t => t.IDUSP == ugovor.IDUSP).ToList();
                ugovor.Zaposleni = context.Zaposleni.Where(z=>z.JMBG==ugovor.JMBG).First();
                ugovor.Ponuda = context.PonudePodizvodjaca.Where(p => p.IDponude == ugovor.IDponude).First();
            });
            return ugovori;
        }

        public string izbrisiUSP(UgovorSaPodizvodjacem ugovor)
        {
            if (context.Ugovori.Any(u => u.IDUSP == ugovor.IDUSP)) 
            {
                try
                {
                    context.Remove(ugovor);
                    context.SaveChanges(true);
                    return "Ugovor je uspesno izbrisan";
                }catch(Exception e)
                {
                    context.SaveChanges(false);
                    return "Greska";
                }
            }
            return "Ugovora nema u sistemu";
        }

        public string izmeniUSP(UgovorSaPodizvodjacem ugovor)
        {
            try
            {
                UgovorSaPodizvodjacem ugovor1 = context.Ugovori.First(u => u.IDUSP == ugovor.IDUSP && u.IDponude == ugovor.IDponude && u.JMBG == ugovor.JMBG);
                ugovor1.DatumZakljucenja = ugovor.DatumZakljucenja;
                ugovor1.RokIzvrsenja = ugovor.RokIzvrsenja;
                List<TezaUSP> teze1=(context.teze.Where(t => t.JMBG == ugovor.JMBG & t.IDponude == ugovor.IDponude & t.IDUSP == ugovor.IDUSP)).ToList();
                if (ugovor.Teze.Count > ugovor1.Teze.Count)
                    foreach (TezaUSP teza in ugovor.Teze)
                    {
                        TezaUSP teza1 = context.teze.FirstOrDefault(t => t.JMBG == ugovor.JMBG & t.IDponude == ugovor.IDponude & t.IDUSP == ugovor.IDUSP & t.RedniBroj == teza.RedniBroj);
                        if (teza1 == null)
                        {
                            teza1 = new TezaUSP();
                            teza1.IDponude = teza1.IDponude == 0 ? teza.IDponude : teza1.IDponude;
                            teza1.IDUSP = teza1.IDUSP == 0 ? teza.IDUSP : teza1.IDUSP;
                            teza1.JMBG = teza1.JMBG == 0 ? teza.JMBG : teza1.JMBG;
                            teza1.RedniBroj = teza1.RedniBroj == 0 ? teza.RedniBroj : teza1.RedniBroj;
                            teza1.Naziv = teza.Naziv;
                            teza1.Opis = teza.Opis;
                            ugovor1.Teze.Add(teza1);
                        }
                        teza1.Naziv = teza.Naziv;
                        teza1.Opis = teza.Opis;

                    }
                else
                {
                    int i = 0;
                    while (i<teze1.Count)
                    {
                        TezaUSP teza = teze1.ElementAt(i);
                        if (ugovor.Teze.Any(t => ugovor.JMBG == teza.JMBG & ugovor.IDponude == teza.IDponude & ugovor.IDUSP == teza.IDUSP & t.RedniBroj == teza.RedniBroj))
                        {
                            TezaUSP t1 = ugovor.Teze.First(t => ugovor.JMBG == teza.JMBG & ugovor.IDponude == teza.IDponude & ugovor.IDUSP == teza.IDUSP & t.RedniBroj == teza.RedniBroj);
                            teza.Naziv = t1.Naziv;
                            teza.Opis = t1.Opis;
                            i++;
                        }
                        else
                        {
                            teze1.Remove(teza);
                        }
                        ugovor1.Teze = teze1;
                    }
                }
                context.Update(ugovor1);
                context.Entry(ugovor1).State=EntityState.Modified;
                context.SaveChanges(true);
                return "Ugovor je uspesno izmenjen";
            }catch(Exception e)
            {
                context.SaveChanges(false);
                return "Desila se greska";
            }
            return "Desila se greska";
        }
    }
}
