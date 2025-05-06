const lista = document.getElementById('sinais-lista');
const palavraEl = document.getElementById('palavra');
const limparBtn = document.getElementById('limpar');

// Função para buscar os sinais do servidor
async function carregarSinais() {
  try {
    const res = await fetch('/api/sinais');
    const sinais = await res.json();

    lista.innerHTML = '';
    const letras = [];

    // Mostra os sinais e letras (ordem do mais antigo para o mais recente)
    sinais.reverse().forEach((item) => {
      const li = document.createElement('li');
      li.textContent = `${item.sinal} → ${item.letra}`;
      lista.appendChild(li);
      letras.push(item.letra);
    });

    // Atualiza a palavra formada
    palavraEl.textContent = letras.join('');
  } catch (error) {
    console.error('Erro ao carregar sinais:', error);
  }
}

// Botão para limpar a palavra (apagar os sinais)
limparBtn.addEventListener('click', async () => {
  try {
    await fetch('/api/sinais', { method: 'DELETE' });
    carregarSinais();
  } catch (error) {
    console.error('Erro ao apagar sinais:', error);
  }
});

// Carrega ao abrir a página
window.onload = carregarSinais;

// Atualiza automaticamente a cada 2 segundos
setInterval(carregarSinais, 2000);
