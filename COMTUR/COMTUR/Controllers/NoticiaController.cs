using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using COMTUR.Models;
using COMTUR.Repositorios.Interfaces;
using Microsoft.Extensions.Hosting;

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
            List<NoticiaModel> noticias = await _noticiaRepository.BuscarNoticia();
            return Ok(noticias);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<NoticiaModel>> BuscarPorId(int id)
        {
            NoticiaModel noticia = await _noticiaRepository.BuscarPorId(id);
            if (noticia == null)
            {
                return NotFound($"Notícia com ID {id} não encontrada.");
            }
            return Ok(noticia);
        }

        [HttpPost]
        public async Task<ActionResult<NoticiaModel>> Cadastrar([FromForm] NoticiaModel noticiaModel)
        {
            NoticiaModel noticia = await _noticiaRepository.Adicionar(noticiaModel);

            return Ok(noticia);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<NoticiaModel>> Atualizar([FromForm] NoticiaModel noticiaModel, int id)
        {

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