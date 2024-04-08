using COMTUR.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace COMTUR.Data.Map
{
	public class EmpresaMap : IEntityTypeConfiguration<EmpresaModel>
	{
		public void Configure(EntityTypeBuilder<EmpresaModel> builder)
		{
			builder.HasKey(x => x.Id);
			builder.Property(x => x.Nome).IsRequired().HasMaxLength(50);

			// Relacionamento da Empresa com Empresario
			builder.HasOne(e => e.UsuarioModel).WithMany(u => u.Empresas).HasForeignKey(e => e.IdUsuario);

			// Relacionamento Empresa com ImagemEmpresa
			builder.HasMany(n => n.ImagemEmpresa)
				   .WithOne(im => im.EmpresaModel)
				   .HasForeignKey(im => im.IdEmpresa)
				   .IsRequired()
				   .OnDelete(DeleteBehavior.Cascade);

			// Relacionamento Empresa com Anuncio
			builder.HasMany(x => x.AnuncioEmpresa).WithOne(x => x.EmpresaModel).IsRequired().OnDelete(DeleteBehavior.Cascade);
		}
	}
}
