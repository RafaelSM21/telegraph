const API_URL = '/morse';

async function fetchMessages() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    updateTable(data);
  } catch (err) {
    console.error('Erro ao buscar mensagens:', err);
  }
}

function updateTable(messages) {
  const tbody = document.querySelector('#morse-table tbody');
  tbody.innerHTML = '';
  messages.forEach(msg => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${msg.raw}</td>
      <td>${msg.decoded}</td>
      <td>${new Date(msg.createdAt).toLocaleTimeString()}</td>
    `;
    tbody.appendChild(tr);
  });
}

// primeira carga e loop
fetchMessages();
setInterval(fetchMessages, 3000);
