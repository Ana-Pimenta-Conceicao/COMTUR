using COMTUR.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Reflection.Emit;

namespace COMTUR.Data.Map
{
    public class TipoAtracaoMap : IEntityTypeConfiguration<TipoAtracaoModel>
    {
        public void Configure(EntityTypeBuilder<TipoAtracaoModel> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Nome).IsRequired().HasMaxLength(50);
            builder.HasOne(e => e.UsuarioModel).WithMany().HasForeignKey(e => e.IdUsuario);
			builder.Property(ta => ta.Status).IsRequired();
		}
    }
}