document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    const currentPage = window.location.pathname;
  
    // Verificando o token
    if (!token && currentPage !== '/login.html' && currentPage !== '/registro.html') {
      window.location.href = '/login.html';  //Redireciona para login se não estiver logado
      return;
    }
  
    if (token && currentPage === '/login.html') {
      window.location.href = '/tarefas.html';  //Redireciona para tarefas se já estiver logado
      return;
    }

    //Carregar tarefas
    if (currentPage === '/tarefas.html') {
      carregarTarefas();
  
      // Logout
      document.getElementById('logoutBtn')?.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = '/login.html';  // Redireciona para login
      });
  
      //Nova Tarefa tela
      const novaTarefaBtn = document.getElementById('novaTarefaBtn');
      const novaTarefaModal = new bootstrap.Modal(document.getElementById('novaTarefaModal'));
      const novaTarefaForm = document.getElementById('novaTarefaForm');
  
      novaTarefaBtn.addEventListener('click', () => {
        novaTarefaForm.reset();  //Limpa o formulário
        novaTarefaModal.show();
      });
      //Fazendo nova tarefa
      novaTarefaForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const titulo = document.getElementById('titulo').value.trim();
        const descricao = document.getElementById('descricao').value.trim();
  
        if (!titulo || !descricao) {
          alert("Preencha todos os campos.");
          return;
        }
  
        try {
          const response = await fetch('http://localhost:3000/api/tarefas', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ titulo, descricao })
          });
  
          if (!response.ok) throw new Error("Erro ao criar tarefa");
  
          novaTarefaModal.hide();
          novaTarefaForm.reset();
          carregarTarefas();  //Atualiza a lista de tarefas
        } catch (err) {
          console.error('Erro ao criar tarefa:', err);
          alert('Erro ao criar tarefa');
        }
      });
    }
  

  // Registro
  if (currentPage === '/registro.html') {
    const registroForm = document.getElementById('registroForm');
  
    registroForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const nome = document.getElementById('nome').value.trim();
      const email = document.getElementById('email').value.trim();
      const senha = document.getElementById('senha').value.trim();
  
      if (!nome || !email || !senha) {
        alert('Preencha todos os campos.');
        return;
      }
  
      try {
        const response = await fetch('http://localhost:3000/api/usuarios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ nome, email, senha })
        });
  
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.erro || 'Erro ao registrar usuário');
        }
  
        alert('Usuário registrado com sucesso!');
        window.location.href = '/login.html';  // Redireciona para a página de login após o registro
      } catch (err) {
        console.error('Erro ao registrar:', err);
        alert(err.message);
      }
    });
  }
  });

//Carregar todas as tarefas
async function carregarTarefas() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('http://localhost:3000/api/tarefas', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error("Erro ao buscar tarefas");

        const tarefas = await response.json();
        window.tarefasCache = tarefas;
        const tarefasList = document.getElementById('tarefasList');

        tarefasList.innerHTML = tarefas.map(tarefa => `
            <div class="col-md-4 mb-3">
                <div class="card ${tarefa.concluida ? 'tarefa-concluida' : ''}">
                    <div class="card-body">
                        <h5 class="card-title ${tarefa.concluida ? 'texto-concluido' : ''}">${tarefa.titulo}</h5>
                        <p class="card-text">${tarefa.descricao}</p>
                        <button class="btn btn-warning" onclick="editarTarefa(${tarefa.id})">Editar</button>
                        <button class="btn btn-danger" onclick="excluirTarefa(${tarefa.id})">Excluir</button>
                        <button class="btn btn-success" onclick="concluirTarefa(${tarefa.id})" 
                            ${tarefa.concluida ? 'disabled style="opacity:0.5"' : ''}>
                            ${tarefa.concluida ? 'Concluída' : 'Concluir'}
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (erro) {
        console.error('Erro ao buscar tarefas:', erro);
        document.getElementById('tarefasList').innerHTML = `
            <div class="alert alert-danger">Erro ao carregar tarefas. Tente novamente.</div>
        `;
    }
}

//Editar tarefa
function editarTarefa(id) {
    const tarefa = window.tarefasCache.find(t => t.id === id);
    if (!tarefa) return alert('Tarefa não encontrada.');
  
    document.getElementById('editarId').value = tarefa.id;
    document.getElementById('editarTitulo').value = tarefa.titulo;
    document.getElementById('editarDescricao').value = tarefa.descricao;
  
    const editarTarefaModal = new bootstrap.Modal(document.getElementById('editarTarefaModal'));
    editarTarefaModal.show();
  }
  
//Atualizar tarefa
document.getElementById('editarTarefaForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const id = document.getElementById('editarId').value;
    const titulo = document.getElementById('editarTitulo').value.trim();
    const descricao = document.getElementById('editarDescricao').value.trim();
    const token = localStorage.getItem('token');
  
    try {
      const response = await fetch(`http://localhost:3000/api/tarefas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ titulo, descricao })
      });
  
      if (!response.ok) throw new Error('Erro ao atualizar tarefa');
  
      const modal = bootstrap.Modal.getInstance(document.getElementById('editarTarefaModal'));
      modal.hide();
      carregarTarefas();
    } catch (err) {
      console.error('Erro ao editar tarefa:', err);
      alert('Erro ao editar tarefa');
}
});
  
//Excluir tarefa
async function excluirTarefa(id) {
    const token = localStorage.getItem('token');
  
    if (!confirm('Tem certeza que deseja excluir esta tarefa?')) return;
  
    try {
      const response = await fetch(`http://localhost:3000/api/tarefas/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) throw new Error('Erro ao excluir tarefa');
  
      carregarTarefas();
    } catch (err) {
      console.error('Erro ao excluir tarefa:', err);
      alert('Erro ao excluir tarefa');
    }
}

//Concluir tarefa
async function concluirTarefa(id) {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`http://localhost:3000/api/tarefas/${id}/concluir`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao concluir tarefa");
        }

        //Atualiza o cache local
        const tarefaIndex = window.tarefasCache.findIndex(t => t.id === id);
        if (tarefaIndex !== -1) {
            window.tarefasCache[tarefaIndex].concluida = true;
        }

        //Atualiza apenas o card específico sem recarregar tudo
        const card = document.querySelector(`[onclick="concluirTarefa(${id})"]`).closest('.card');
        card.classList.add('tarefa-concluida');
        card.querySelector('.card-title').classList.add('texto-concluido');
        const btnConcluir = card.querySelector('.btn-success');
        btnConcluir.disabled = true;
        btnConcluir.textContent = 'Concluída';
        
    } catch (error) {
        console.error('Erro ao concluir tarefa:', error);
        alert('Erro ao concluir tarefa: ' + error.message);
    }
}

    