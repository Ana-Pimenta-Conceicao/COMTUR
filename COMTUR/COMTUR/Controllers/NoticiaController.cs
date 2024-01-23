using COMTUR.Models;
using COMTUR.Repositorios.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Threading.Tasks;

namespace COMTUR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoticiaController : ControllerBase
    {
        private readonly INoticiaRepository _noticiaRepository;

        public NoticiaController(INoticiaRepository noticiaRepository)
        {
            _noticiaRepository = noticiaRepository;
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
        public async Task<ActionResult<NoticiaModel>> Cadastrar([FromForm] NoticiaModel noticiaModel)
        {
            if (noticiaModel.ArquivoImagem != null)
            {
                await _noticiaRepository.SalvarImagem(noticiaModel.ArquivoImagem);
            }

            NoticiaModel noticia = await _noticiaRepository.Adicionar(noticiaModel);

            return Ok(noticia);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<NoticiaModel>> Atualizar([FromForm] NoticiaModel noticiaModel, int id)
        {
            noticiaModel.Id = id;

            if (noticiaModel.ArquivoImagem != null)
            {
                await _noticiaRepository.ExcluirImagem(noticiaModel.ArquivoImagem.FileName);

                await _noticiaRepository.SalvarImagem(noticiaModel.ArquivoImagem);
            }

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
