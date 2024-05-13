﻿using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using COMTUR.Models.Enum;

namespace COMTUR.Models
{
    [Table("noticia")]
    public class NoticiaModel
    {
        [Key]
        [Column("noticiaid")]
        public int Id { get; set; }

        [Column("titulo")]
        public string Titulo { get; set; }

        [Column("subtitulo")]
        public string Subtitulo { get; set; }

        [Column("conteudo")]
        public string Conteudo { get; set; }

        [Column("datapublicacao")]
        public DateOnly DataPublicacao { get; set; }


        [Column("horapublicacao")]
        public string HoraPublicacao { get; set; }

		// Mapear o campo tipoStatus como enum
		/*[Column("tipostatus")]
		[EnumDataType(typeof(TipoStatus))]
		public TipoStatus TipoStatus { get; set; }*/

		// relação com ImagemNoticia
		public ICollection<ImagemNoticiaModel>? ImagemNoticia { get; set; }

		// relaçao com Turismo
		[JsonIgnore]
		public TurismoModel? TurismoModel { get; set; }

		[Column("idturismo")]
		[ForeignKey("idturismo")]
		public int? IdTurismo { get; set; }

	}
}