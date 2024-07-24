using System.ComponentModel.DataAnnotations;

namespace COMTUR.Models.Enum
{
	public enum TipoStatus
	{
		Aprovado = 1,
		Inativo = 2,
		Reprovado = 3,
		Analisando = 4
	}
	public static class StatusEnumExtensions
	{
		public static TipoStatus Approved() => TipoStatus.Aprovado;

		public static TipoStatus Inactive() => TipoStatus.Inativo;

		public static TipoStatus Disapproved() => TipoStatus.Reprovado;

		public static TipoStatus Analyzing() => TipoStatus.Analisando;
	}
}
