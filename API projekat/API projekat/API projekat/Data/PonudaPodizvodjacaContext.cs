using API_projekat.Models;
using Microsoft.EntityFrameworkCore;

namespace API_projekat.Data
{
    public class PonudaPodizvodjacaContext:DbContext
    {
        public PonudaPodizvodjacaContext(DbContextOptions<PonudaPodizvodjacaContext> opt):base(opt)
        {


        }
        public DbSet<PonudaPodizvodjaca> PonudePodizvodjaca { get; set; }
        public DbSet<UgovorSaPodizvodjacem> Ugovori { get; set; }
        public DbSet<TezaUSP> teze { get; set; }
        public DbSet<Zaposleni> Zaposleni { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UgovorSaPodizvodjacem>()
                .HasKey(c => new { c.IDUSP, c.JMBG, c.IDponude });
            modelBuilder.Entity<TezaUSP>()
                .HasKey(c => new { c.IDUSP, c.JMBG, c.IDponude , c.RedniBroj});
        }
    }
}
