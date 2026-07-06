using Microsoft.EntityFrameworkCore;
using backend.Data;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(options =>
{
    // minhas requisições Post estavam em Loop. essa linha de codigo evita que a leitura Json entre em loop
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
});

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

// liberei o CORS para o Frontend acessar o Backend
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirFrontend", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();
app.UseCors("PermitirFrontend");

app.UseAuthorization();

app.MapControllers();

app.Run();
