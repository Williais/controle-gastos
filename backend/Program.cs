using Microsoft.EntityFrameworkCore;
using backend.Data;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// configurando meu banco de dados
// injeçao de dependencia. registra o BdContext na aplicação
// depois faço SQLite como provedor, e busco o caminho do arquivo
builder
.Services
.AddDbContext<BdContext>(
    op => op.UseSqlite(
        builder
        .Configuration
        .GetConnectionString("DefaultConnection"
        )));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
