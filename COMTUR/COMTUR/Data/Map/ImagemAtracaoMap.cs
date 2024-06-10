using COMTUR.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace COMTUR.Data.Map
{
	public class ImagemAtracaoMap : IEntityTypeConfiguration<ImagemAtracaoModel>
	{

		public void Configure(EntityTypeBuilder<ImagemAtracaoModel> builder)
		{
			builder.HasKey(x => x.Id);
			builder.HasOne(e => e.UsuarioModel).WithMany().HasForeignKey(e => e.IdUsuario);

			// Relacionamento da ImagemAtracao com Atracao
			builder.HasOne(x => x.AtracaoModel)
				   .WithMany(n => n.ImagemAtracao)
				   .HasForeignKey(x => x.IdAtracao)
				   .IsRequired();
		}

	}

}
