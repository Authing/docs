In C#, you can use [System.IdentityModel.Tokens.Jwt](https://www.nuget.org/packages/System.IdentityModel.Tokens.Jwt/) to validate IdToken:

```cs
using System;
using System.IdentityModel.Tokens;
using System.Security.Claims;
using System.Security.Cryptography;

namespace CreateValidateJWT
{
    class Program
    {
        static void Main(string[] args)
        {
            var handler = new JwtSecurityTokenHandler();

            //create symmetrickey
            var buffer = new byte[64];
            using (var random = new RNGCryptoServiceProvider())
            {
                random.GetBytes(buffer);
            }
            var secretString = Convert.ToBase64String(buffer);

            //create jwt
            var token = handler.CreateToken(
                issuer: "issuer",
                audience: "audience",
                expires: DateTime.UtcNow.AddSeconds(10),
                subject: new ClaimsIdentity(new[] {
                    new Claim(ClaimTypes.NameIdentifier, Guid.NewGuid().ToString()),
                    new Claim(ClaimTypes.Name, "User")
                }),
                signingCredentials: new SigningCredentials(new InMemorySymmetricSecurityKey(buffer), SecurityAlgorithms.HmacSha256Signature, SecurityAlgorithms.Sha512Digest));


            //validate jwt
            var tokenString = handler.WriteToken(token);
            SecurityToken validatedToken;
            var param = new TokenValidationParameters
            {
                ClockSkew = TimeSpan.FromMinutes(1),
                ValidIssuer = "issuer",
                ValidAudience = "audience",
                IssuerSigningKey = new InMemorySymmetricSecurityKey(buffer),
            };
            var claims = handler.ValidateToken(tokenString, param, out validatedToken);
        }
    }
}
```