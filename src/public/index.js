<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8" />
  <title>Mensagens em Código Morse</title>
</head>
<body>
  <h1>Mensagens Decodificadas</h1>
  <ul id="lista"></ul>

  <script>
    fetch('http://localhost:3000/mensagens')
      .then(res => res.json())
      .then(data => {
        const lista = document.getElementById('lista');
        data.forEach(msg => {
          const item = document.createElement('li');
          item.textContent = `[${msg.morse}] → ${msg.texto}`;
          lista.appendChild(item);
        });
      })
      .catch(err => {
        console.error('Erro ao buscar mensagens:', err);
      });
  </script>
</body>
</html>
