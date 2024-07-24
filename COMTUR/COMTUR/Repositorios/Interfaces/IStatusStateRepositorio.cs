using COMTUR.Models.Enum;
using COMTUR.Models.StatusState;

namespace COMTUR.Repositorios.Interfaces
{
	public interface IStatusStateRepositorio
	{
		string State { get; }
		bool CanEdit();
		bool CanRelate();
		bool CanToRemove();
	}

	public static class IStatusStateRepositorioExtensions
	{
		private static IStatusStateRepositorio CreateState(TipoStatus status)
		{
			return status switch
			{
				TipoStatus.Aprovado => new AprovadoState(),
				TipoStatus.Reprovado => new ReprovadoState(), 
				TipoStatus.Analisando => new AnalisandoState(),
				TipoStatus.Inativo => new InativoState(),
				_ => new AprovadoState()
			};
		}

		public static string GetState(TipoStatus status)
		{
			IStatusStateRepositorio statusState = CreateState(status);
			return statusState.State;
		}

		public static bool CanEdit(TipoStatus status)
		{
			IStatusStateRepositorio statusState = CreateState(status);
			return statusState.CanEdit();
		}

		public static bool CanRelate(TipoStatus status)
		{
			IStatusStateRepositorio statusState = CreateState(status);
			return statusState.CanRelate();
		}

		public static bool CanRemove(TipoStatus status)
		{
			IStatusStateRepositorio statusState = CreateState(status);
			return statusState.CanToRemove();
		}
	}
}

