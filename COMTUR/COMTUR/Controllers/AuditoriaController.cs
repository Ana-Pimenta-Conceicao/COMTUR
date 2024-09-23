using COMTUR.Data;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Reflection;

namespace COMTUR.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuditoriaController : ControllerBase
    {
        private readonly ComturDBContext _context;

        public AuditoriaController(ComturDBContext context)
        {
            _context = context;
        }

        [HttpGet("{entidade}")]
        public IActionResult GetEntidade(string entidade)
        {
            // Acessa a propriedade do DbContext correspondente ao nome da entidade
            var dbSetProperty = _context.GetType().GetProperties()
                .FirstOrDefault(p => p.Name.Equals(entidade, StringComparison.OrdinalIgnoreCase));

            if (dbSetProperty == null)
            {
                return NotFound("DbSet correspondente não encontrado no contexto.");
            }

            var dbSet = dbSetProperty.GetValue(_context) as IQueryable<object>;

            if (dbSet == null)
            {
                return NotFound("DbSet é nulo.");
            }

            var resultado = dbSet
                .AsEnumerable()
                .Select(e => new
                {
                    Id = e.GetType().GetProperty("Id")?.GetValue(e),
                    Nome = e.GetType().GetProperty("Nome")?.GetValue(e),
                    Status = e.GetType().GetProperty("Status")?.GetValue(e)
                    // Adicione outros campos conforme necessário
                });

            return Ok(resultado.ToList());
        }


        [HttpGet("ultima-modificacao/{id}/{entidade}")]
        public IActionResult GetUltimaModificacao(int id, string entidade)
        {
            var ultimaAuditoria = _context.Auditoria
                .Where(a => a.NomeEntidade == entidade && a.NovosValores.Contains($"\"Id\":{id}"))
                .OrderByDescending(a => a.Data)
                .ThenByDescending(a => a.Hora)
                .FirstOrDefault();

            if (ultimaAuditoria == null)
            {
                return NotFound("Nenhum registro de auditoria encontrado para o ID fornecido.");
            }

            var resultado = new
            {
                ultimaAuditoria.NomeEntidade,
                ultimaAuditoria.Data,
                ultimaAuditoria.Hora
            };

            return Ok(resultado);
        }

        [HttpGet("historico-modificacoes/{id}/{entidade}")]
        public IActionResult GetHistoricoModificacoes(int id, string entidade)
        {
            var auditorias = _context.Auditoria
                .Where(a => a.NomeEntidade == entidade && (a.ValoresAntigos.Contains($"\"Id\":{id}") || a.NovosValores.Contains($"\"Id\":{id}")))
                .OrderBy(a => a.Data)
                .ThenBy(a => a.Hora)
                .ToList();

            if (auditorias == null || !auditorias.Any())
            {
                return NotFound("Nenhum histórico de auditoria encontrado para o ID fornecido.");
            }

            return Ok(auditorias);
        }
    }
}
