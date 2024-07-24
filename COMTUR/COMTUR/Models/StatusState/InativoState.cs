using COMTUR.Repositorios.Interfaces;

namespace COMTUR.Models.StatusState
{
	public class InativoState : IStatusStateRepositorio
	{
		public string State { get; } = "Inativo";
		public bool CanEdit() => false;
		public bool CanRelate() => false;
		public bool CanToRemove() => false;
	}
}