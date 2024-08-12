using COMTUR.Data;
using Microsoft.EntityFrameworkCore;

namespace COMTUR.Models.Enum
{
    public class RemoveContext
    {
        private readonly ComturDBContext _dbContext;

        public RemoveContext(ComturDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void DetachEntity<T>(T entity) where T : class
        {
            if (entity != null)
            {
                _dbContext.Entry(entity).State = EntityState.Detached;
            }
        }

        public void DetachEntities<T>(IEnumerable<T> entities) where T : class
        {
            foreach (var entity in entities.ToList())
            {
                DetachEntity(entity);
            }
        }
    }
}