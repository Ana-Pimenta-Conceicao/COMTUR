using COMTUR.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace COMTUR.Data.Map
{
	public class ImagemEmpresaMap : IEntityTypeConfiguration<ImagemEmpresaModel>
	{

		public void Configure(EntityTypeBuilder<ImagemEmpresaModel> builder)
		{
			builder.HasKey(x => x.Id);
			builder.HasOne(e => e.UsuarioModel).WithMany().HasForeignKey(e => e.IdUsuario);

			// Relacionamento da ImagemEmpresa com Empresa
			builder.HasOne(x => x.EmpresaModel)
				   .WithMany(n => n.ImagemEmpresa)
				   .HasForeignKey(x => x.IdEmpresa)
				   .IsRequired();
		}

	}

}
