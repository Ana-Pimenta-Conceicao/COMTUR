using COMTUR.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace COMTUR.Data.Map
{
    public class NoticiaMap : IEntityTypeConfiguration<NoticiaModel>
    {
        public void Configure(EntityTypeBuilder<NoticiaModel> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Titulo).IsRequired();

			// Relacionamento da noticia com Turismo
			builder.HasOne(x => x.TurismoModel).WithMany().HasForeignKey(x => x.IdTurismo);

			// Relacionamento da Noticia com Funcionario/Aadmin
			builder.HasOne(e => e.UsuarioModel).WithMany(u => u.Noticia).HasForeignKey(e => e.IdUsuario);

			// Relacionamento Noticia com ImagemNoticia
			builder.HasMany(n => n.ImagemNoticia)
                   .WithOne(im => im.NoticiaModel)
                   .HasForeignKey(im => im.IdNoticia)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
