using COMTUR.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace COMTUR.Data.Map
{
	public class ImagemNoticiaMap : IEntityTypeConfiguration<ImagemNoticiaModel>
	{

		public void Configure(EntityTypeBuilder<ImagemNoticiaModel> builder)
		{
			builder.HasKey(x => x.Id);
			builder.HasOne(e => e.UsuarioModel).WithMany().HasForeignKey(e => e.IdUsuario);

			// Relacionamento da ImagemNoticia com Noticia
			builder.HasOne(x => x.NoticiaModel)
                   .WithMany(n => n.ImagemNoticia)
                   .HasForeignKey(x => x.IdNoticia)
                   .IsRequired();
        }

	}
	
}
