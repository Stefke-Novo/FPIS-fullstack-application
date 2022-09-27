using API_projekat.Data;
using API_projekat.Models;
using Microsoft.AspNetCore.Mvc;

namespace API_projekat.Controllers
{
    [ApiController]
    public class ZaposleniController : Controller
    {
        private readonly ISqlRepo _repo;
       public ZaposleniController(ISqlRepo repo)
        {
            this._repo = repo;
        }

        [Route("[controller]/unesiZaposlenog")]
        [HttpPost]
        public ActionResult<String> unesiZaposlenog(Zaposleni z)
        {
            string odgovor = _repo.kreirajZaposlenog(z);
            if (odgovor.Equals("Zaposleni je uspesno sacuvan"))
                return Ok(odgovor);
            else
                return BadRequest(odgovor);
        }
        [Route("[controller]/ucitajZaposlene")]
        [HttpGet]
        public ActionResult<IEnumerable<Zaposleni>> ucitajZaposlene()
        {
            return Ok(_repo.ucitajZaposlene());
        }
        [Route("[controller]/ucitajZaposlenog")]
        [HttpGet]
        public ActionResult<Zaposleni> ucitajZaposlenog(int jmbg)
        {
            Zaposleni z = _repo.ucitajZaposlenog(jmbg);
            if (z != null)
                return Ok(z);
            else
                return NotFound();
        }
        [Route("[controller]/izmeniZaposlenog")]
        [HttpPost]
        public ActionResult<String> izmeniZaposlenog(Zaposleni z)
        {
            
                return Ok(_repo.izmeniZaposlenog(z));
        }
        [Route("[controller]/izbrisiZaposlenog")]
        [HttpDelete]
        public ActionResult<String> izbrisiZaposlenog(Zaposleni z)
        {
            return Ok(_repo.izbrisiZaposlenog(z));
        }
    }
}
