using COMTUR.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace COMTUR.Data.Map
{
    public class SessaoMap : IEntityTypeConfiguration<SessaoModel>
    {
        public void Configure(EntityTypeBuilder<SessaoModel> builder)
        {

            builder.HasKey(x => x.Id);
            builder.Property(x => x.EmailUsuario).IsRequired();
            builder.Property(x => x.NivelAcesso).IsRequired();

            // Relacionamento da Sessao com Usuario
            //  builder.HasOne(e => e.UsuarioModel).WithMany(u => u.Sessoes).HasForeignKey(e => e.IdUsuario);
        }
    }
}