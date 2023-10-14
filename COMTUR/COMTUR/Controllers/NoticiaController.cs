using COMTUR.Models;
using COMTUR.Repositorios.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace COMTUR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoticiaController : ControllerBase
    {
        private readonly INoticiaRepository _noticiaRepository;

        public NoticiaController(INoticiaRepository _noticiaRepository)
        {
            this._noticiaRepository = _noticiaRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<NoticiaModel>>> BuscarNoticia()
        {
            List<NoticiaModel> noticia = await _noticiaRepository.BuscarNoticia();
            return Ok(noticia);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<NoticiaModel>> BuscarPorId(int id)
        {
            NoticiaModel noticia = await _noticiaRepository.BuscarPorId(id);
            return Ok(noticia);
        }

        [HttpPost]
        public async Task<ActionResult<NoticiaModel>> Cadastrar([FromBody] NoticiaModel noticiaModel)
        {
            NoticiaModel noticia = await _noticiaRepository.Adicionar(noticiaModel);

            return Ok(noticia);
        }

        [HttpPut]
        public async Task<ActionResult<NoticiaModel>> Atualizar([FromBody] NoticiaModel noticiaModel, int id)
        {
            noticiaModel.Id = id;
            NoticiaModel noticia = await _noticiaRepository.Atualizar(noticiaModel, id);

            return Ok(noticia);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<NoticiaModel>> Apagar(int id)
        {
            bool apagado = await _noticiaRepository.Apagar(id);
            return Ok(apagado);
        }
    }
}
