using API_projekat.Data;
using API_projekat.Models;
using Microsoft.AspNetCore.Mvc;

namespace API_projekat.Controllers
{
    [ApiController]
    public class UgovorSaPodizvodjacemController : Controller
    {
        private readonly ISqlRepo _repo;
        public UgovorSaPodizvodjacemController(ISqlRepo repo)
        {
            this._repo = repo;
        }
        [Route("[controller]/kreirajUSP")]
        [HttpPost]
        public ActionResult<String> kreirajUSP(UgovorSaPodizvodjacem ugovor)
        {
            string odgovor = _repo.kreirajUSP(ugovor);
            if (odgovor.Equals("Ugovor je uspesno ubacen u bazu"))
                return Ok(odgovor);
            else 
                return BadRequest(odgovor);
        }
        [Route("[controller]/vratiSveUSP")]
        [HttpGet]
        public ActionResult<IEnumerable<UgovorSaPodizvodjacem>> vratiSveUSP()
        {

            //return Ok(ugovori);
            return Ok(_repo.vratiSveUSP());
        }
        [Route("[controller]/pronadjiUSP/{id}")]
        [HttpGet]
        public ActionResult<UgovorSaPodizvodjacem> pronadjiUSP(int id)
        {
            UgovorSaPodizvodjacem ugovor = _repo.pronadjiUSP(id);
            if (ugovor != null)
                return Ok(ugovor);
            else
                return NotFound();
        }
        [Route("[controller]/izbrisiUSP")]
        [HttpDelete]
        public ActionResult<string> izbrisiUSP(UgovorSaPodizvodjacem ugovor)
        {
                return Ok(_repo.izbrisiUSP(ugovor));
        }
        [Route("[controller]/izmeniUSP")]
        [HttpPost]
        public ActionResult<string> izmeniUSP(UgovorSaPodizvodjacem ugovor)
        {
            return Ok(_repo.izmeniUSP(ugovor));
        }
    }
}
