using System.Net.Http.Headers;
using Microsoft.Extensions.Options;
using MovieListApi.Configurations;
using MovieListApi.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<ConfigurationResponse>(builder.Configuration.GetSection("TmdbConfiguration"));
builder.Services.AddHttpClient<TmdbService>((serviceProvider, client) =>
{
  
    var config = serviceProvider.GetRequiredService<IOptions<ConfigurationResponse>>().Value.Images;
    
    client.BaseAddress = new Uri(config.SecureBaseUrl);
    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
});


builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins",
        policyBuilder =>
        {
            policyBuilder.WithOrigins("http://localhost:4200")
                         .AllowAnyHeader()
                         .AllowAnyMethod();
        });
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.UseCors("AllowSpecificOrigins");

app.MapControllers();

app.Run();