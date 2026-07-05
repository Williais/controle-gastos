using backend.Models;
using Microsoft.AspNetCore.Mvc;
using backend.Data;
using System.Linq;
using backend.utils;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransacaoController : ControllerBase
    {
        //assim como em PessoaController, eu preciso fazer a injeção de dependencia aq

        private readonly BdContext bd;

        public TransacaoController(BdContext bd)
        {
            this.bd = bd;
        }


        // listagem de transações

        [HttpGet]
        public IActionResult ListarTrasancoes()
        {
            var ListagemTransacao = bd.Transacao.ToList();

            return Ok(ListagemTransacao);
        }

        // criação de transação

        [HttpPost]
        public IActionResult CriarTransacao([FromBody] Transacao novaTransacao)
        {
            //algumas validações que fazer

            if (novaTransacao == null)
            {
                return BadRequest("Os dados da pessoa não podem ser nulos");
            }

            //quero saber se a pessoa existe, senão, retorna NotFound
            var morador = bd.Pessoa.Find(novaTransacao.MoradorId);

            if (morador == null)
            {
                return NotFound("o morador informado nao existe no cadastro");
            }

            // se a pessoa for menor de 18 anos e o tipo de transação for Receita, retorna o BadRequest. Menor de idade so pode ter o tipo de transação de Despesa
            if (morador.Idade < 18 && novaTransacao.TipoTransacao == TipoTransacaoEnum.Receita)
            {
                return BadRequest("menores de 18 anos so podem cadastrar despesas");
            }

            // adiciono na tabela e salvo o banco de dados
            bd.Transacao.Add(novaTransacao);
            bd.SaveChanges();

            return Ok(novaTransacao);
        }
    }
}