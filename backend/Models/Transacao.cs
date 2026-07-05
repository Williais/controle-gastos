using backend.utils;

namespace backend.Models
{
    public class Transacao
    {
        public int Id {get; set;}
        public string Descricao {get; set;}
        public decimal Valor {get; set;}
        public TipoTransacaoEnum TipoTransacao {get; set;}
        public int MoradorId { get; set; }
        public Pessoa Morador {get; set;}
    }
}