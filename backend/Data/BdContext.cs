using Microsoft.EntityFrameworkCore;
using backend.Models;
namespace backend.Data
{
    public class BdContext : DbContext
    {
        // aq eu estou recebendo a injeção do meu Program.cs e to passando para o DbContext original
        public BdContext(DbContextOptions<BdContext> op) : base(op){}

        //aq estou declarando minhas tabelas no Banco de Dados
        public DbSet<Pessoa> Pessoa {get; set;}
        public DbSet<Transacao> Transacao {get; set;}
    }
}