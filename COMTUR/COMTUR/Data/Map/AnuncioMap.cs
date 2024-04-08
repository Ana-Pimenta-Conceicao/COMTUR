using COMTUR.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace COMTUR.Data.Map
{
	public class AnuncioMap : IEntityTypeConfiguration<AnuncioModel>
	{
		public void Configure(EntityTypeBuilder<AnuncioModel> builder)
		{
			builder.HasKey(x => x.Id);
			builder.Property(x => x.NomeEmpresa).IsRequired();

			// Relacionamento de Anuncio com TipoTurismo
			builder.HasOne(x => x.TipoTurismoModel).WithMany().HasForeignKey(x => x.IdTipoTurismo);

			// Relacionamento de Anuncio com Empresa
			builder.HasOne(x => x.EmpresaModel).WithMany().HasForeignKey(x => x.IdEmpresa);

		}
	}
}
