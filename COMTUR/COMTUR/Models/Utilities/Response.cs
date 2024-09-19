namespace COMTUR.Models.Utilities
{
    public class Response
    {

        public ResponseStatus Status { get; set; }
        public string Message { get; set; }
        public object Data { get; set; }

        public void SetSuccess()
        {
            Status = ResponseStatus.Success;
        }

        public void SetInvalid()
        {
            Status = ResponseStatus.Invalid;
        }

        public void SetNotFound()
        {
            Status = ResponseStatus.NotFound;
        }

        public void SetConflict()
        {
            Status = ResponseStatus.Conflict;
        }

        public void SetUnauthorized()
        {
            Status = ResponseStatus.Unauthorized;
        }

        public void SetError()
        {
            Status = ResponseStatus.Error;
        }
    }
}