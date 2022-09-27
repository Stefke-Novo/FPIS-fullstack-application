using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API_projekat.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PonudePodizvodjaca",
                columns: table => new
                {
                    IDponude = table.Column<int>(type: "int", nullable: false),
                    NazivPonude = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DatumPredaje = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Cena = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PonudePodizvodjaca", x => x.IDponude);
                });

            migrationBuilder.CreateTable(
                name: "Zaposleni",
                columns: table => new
                {
                    JMBG = table.Column<int>(type: "int", nullable: false),
                    Ime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Pozicija = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Zaposleni", x => x.JMBG);
                });

            migrationBuilder.CreateTable(
                name: "Ugovori",
                columns: table => new
                {
                    IDUSP = table.Column<int>(type: "int", nullable: false),
                    IDponude = table.Column<int>(type: "int", nullable: false),
                    JMBG = table.Column<int>(type: "int", nullable: false),
                    DatumZakljucenja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RokIzvrsenja = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ugovori", x => new { x.IDUSP, x.JMBG, x.IDponude });
                    table.ForeignKey(
                        name: "FK_Ugovori_PonudePodizvodjaca_IDponude",
                        column: x => x.IDponude,
                        principalTable: "PonudePodizvodjaca",
                        principalColumn: "IDponude",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Ugovori_Zaposleni_JMBG",
                        column: x => x.JMBG,
                        principalTable: "Zaposleni",
                        principalColumn: "JMBG",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "teze",
                columns: table => new
                {
                    IDponude = table.Column<int>(type: "int", nullable: false),
                    JMBG = table.Column<int>(type: "int", nullable: false),
                    IDUSP = table.Column<int>(type: "int", nullable: false),
                    RedniBroj = table.Column<int>(type: "int", nullable: false),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Opis = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_teze", x => new { x.IDUSP, x.JMBG, x.IDponude, x.RedniBroj });
                    table.ForeignKey(
                        name: "FK_teze_Ugovori_IDUSP_JMBG_IDponude",
                        columns: x => new { x.IDUSP, x.JMBG, x.IDponude },
                        principalTable: "Ugovori",
                        principalColumns: new[] { "IDUSP", "JMBG", "IDponude" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Ugovori_IDponude",
                table: "Ugovori",
                column: "IDponude");

            migrationBuilder.CreateIndex(
                name: "IX_Ugovori_JMBG",
                table: "Ugovori",
                column: "JMBG");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "teze");

            migrationBuilder.DropTable(
                name: "Ugovori");

            migrationBuilder.DropTable(
                name: "PonudePodizvodjaca");

            migrationBuilder.DropTable(
                name: "Zaposleni");
        }
    }
}
