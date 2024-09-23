using COMTUR.Models.StatusState;

namespace COMTUR.Models.Enum
{
    public interface IStatusState
    {
        string State { get; }
        bool CanInactive();
        bool CanAnalyzing();
        bool CanApproved();
        bool CanDisapproved();
    }

    public static class IStatusStateExtensions
    {
        private static IStatusState CreateState(TipoStatus status)
        {
            return status switch
            {
                TipoStatus.Aprovado => new AprovadoState(),
                TipoStatus.Reprovado => new ReprovadoState(),
                TipoStatus.Analisando => new AnalisandoState(),
                TipoStatus.Desativado => new DesativadoState(),
                _ => new AprovadoState()
            };
        }

        public static string GetState(TipoStatus status)
        {
            IStatusState statusState = CreateState(status);
            return statusState.State;
        }

        public static bool CanInactive(TipoStatus status)
        {
            IStatusState statusState = CreateState(status);
            return statusState.CanInactive();
        }

        public static bool CanAnalyzing(TipoStatus status)
        {
            IStatusState statusState = CreateState(status);
            return statusState.CanAnalyzing();
        }

        public static bool CanApproved(TipoStatus status)
        {
            IStatusState statusState = CreateState(status);
            return statusState.CanApproved();
        }

        public static bool CanDisapproved(TipoStatus status)
        {
            IStatusState statusState = CreateState(status);
            return statusState.CanDisapproved();
        }
    }
}

