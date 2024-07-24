using COMTUR.Repositorios.Interfaces;

namespace COMTUR.Models.StatusState
{
	public class AnalisandoState : IStatusStateRepositorio
	{
		public string State { get; } = "Analisando";
		public bool CanEdit() => false;
		public bool CanRelate() => false;
		public bool CanToRemove() => false;
	}
}