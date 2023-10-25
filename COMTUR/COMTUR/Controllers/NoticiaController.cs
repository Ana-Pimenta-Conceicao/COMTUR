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

        [HttpGet("{titulo}")]
        public async Task<ActionResult<NoticiaModel>> BuscarPorNome(string titulo)
        {
            NoticiaModel noticia = await _noticiaRepository.BuscarPorNome(titulo);
            return Ok(noticia);
        }

        [HttpPost]
        public async Task<ActionResult<NoticiaModel>> Cadastrar([FromBody] NoticiaModel noticiaModel)
        {
            NoticiaModel noticia = await _noticiaRepository.Adicionar(noticiaModel);

            return Ok(noticia);
        }

        [HttpPut]
        public async Task<ActionResult<NoticiaModel>> Atualizar([FromBody] NoticiaModel noticiaModel, string titulo)
        {
            noticiaModel.Titulo = titulo;
            NoticiaModel noticia = await _noticiaRepository.Atualizar(noticiaModel, titulo);

            return Ok(noticia);
        }

        [HttpDelete("{titulo}")]
        public async Task<ActionResult<NoticiaModel>> Apagar(string titulo)
        {
            bool apagado = await _noticiaRepository.Apagar(titulo);
            return Ok(apagado);
        }
    }
}
