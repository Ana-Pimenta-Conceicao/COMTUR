using System.ComponentModel.DataAnnotations;

namespace COMTUR.Models.Enum
{
	public enum TipoStatus : int
	{
		Analisando = 1,
		Aprovado = 2,
		Reprovado = 3,
		Desativado = 4
	}
	public static class StatusEnumExtensions
	{
		public static TipoStatus Approved() => TipoStatus.Aprovado;

		public static TipoStatus Inactive() => TipoStatus.Desativado;

		public static TipoStatus Disapproved() => TipoStatus.Reprovado;

		public static TipoStatus Analyzing() => TipoStatus.Analisando;
	}
}
