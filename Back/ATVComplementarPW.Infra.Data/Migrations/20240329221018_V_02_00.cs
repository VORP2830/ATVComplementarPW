using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ATVComplementarPW.Infra.Data.Migrations
{
    /// <inheritdoc />
    public partial class V_02_00 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Price",
                table: "Transports",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "Transports");
        }
    }
}
