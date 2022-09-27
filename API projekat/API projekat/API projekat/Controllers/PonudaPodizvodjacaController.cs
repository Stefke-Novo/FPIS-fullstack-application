using API_projekat.Data;
using API_projekat.Models;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;

namespace API_projekat.Controllers
{
    [ApiController]
    public class PonudaPodizvodjacaController : Controller
    {
        private readonly ISqlRepo _repo;
        public PonudaPodizvodjacaController(ISqlRepo repo)
        {
            this._repo = repo;
        }
        [Route("[controller]/kreirajPonudu")]
        [HttpPost]
        public IActionResult kreirajPonudu(PonudaPodizvodjaca p)
        {
            string odgovor = _repo.kreirajPonuduPodizvodjaca(p);
            if (odgovor== "Ponuda je uspesno kreirana")
            {
                return Ok(odgovor);
            }
            else
                return BadRequest(odgovor);
        }
        [Route("[controller]/obrisiPonudu")]
        [HttpDelete]
        public IActionResult obrisiPonudu(PonudaPodizvodjaca p)
        {
                return Ok(_repo.obrisiPonudu(p));
        }
        [Route("[controller]/pretraziPonudu")]
        [HttpGet]
        public ActionResult<PonudaPodizvodjaca> pretraziPonudu(int p)
        {
            PonudaPodizvodjaca p1 = _repo.pretraziPonudu(p);
            if(p1!=null)
                return Ok(p1);
            else
                return NotFound();
        }
    }
}
