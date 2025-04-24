document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    const currentPage = window.location.pathname;

    if (!token && currentPage !== '/login.html') {
        window.location.href = '/login.html';
        return;
    }
    if (token && currentPage === '/login.html') {
        window.location.href = '/tarefas.html';
        return;
    }

    if (currentPage === '/tarefas.html') {
        carregarTarefas();

        //Logout
        document.getElementById('logoutBtn')?.addEventListener('click', () => {
            localStorage.removeItem('token');
            window.location.href = '/login.html';
        });

        //Botão Nova Tarefa e Modal
        const novaTarefaBtn = document.getElementById('novaTarefaBtn');
        const novaTarefaModal = new bootstrap.Modal(document.getElementById('novaTarefaModal'));
        const novaTarefaForm = document.getElementById('novaTarefaForm');

        novaTarefaBtn.addEventListener('click', () => {
            novaTarefaForm.reset(); // limpa os campos
            novaTarefaModal.show();
        });

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
                carregarTarefas(); // Atualiza a lista
            } catch (err) {
                console.error('Erro ao criar tarefa:', err);
                alert('Erro ao criar tarefa');
            }
        });
    }
});

//Carregar tarefa
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
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${tarefa.titulo}</h5>
                        <p class="card-text">${tarefa.descricao}</p>
                        <button class="btn btn-warning" onclick="editarTarefa(${tarefa.id})">Editar</button>
                        <button class="btn btn-danger" onclick="excluirTarefa(${tarefa.id})">Excluir</button>
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
const editarTarefaModal = new bootstrap.Modal(document.getElementById('editarTarefaModal'));
const editarTarefaForm = document.getElementById('editarTarefaForm');

function editarTarefa(id) {
    const tarefa = window.tarefasCache.find(t => t.id === id);
    if (!tarefa) return alert('Tarefa não encontrada');

    document.getElementById('editarId').value = tarefa.id;
    document.getElementById('editarTitulo').value = tarefa.titulo;
    document.getElementById('editarDescricao').value = tarefa.descricao;

    editarTarefaModal.show();
}

editarTarefaForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('editarId').value;
    const titulo = document.getElementById('editarTitulo').value.trim();
    const descricao = document.getElementById('editarDescricao').value.trim();

    if (!titulo || !descricao) {
        alert('Preencha todos os campos.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/tarefas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ titulo, descricao })
        });

        if (!response.ok) throw new Error('Erro ao editar tarefa');

        editarTarefaModal.hide();
        carregarTarefas(); // atualiza lista

    } catch (erro) {
        console.error('Erro ao editar tarefa:', erro);
        alert('Erro ao editar tarefa');
    }
});

//Excluir tarefa
async function excluirTarefa(id) {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`http://localhost:3000/api/tarefas/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            alert('Tarefa excluída com sucesso!');
            carregarTarefas();
        } else {
            alert('Erro ao excluir tarefa.');
        }
    } catch (erro) {
        console.error('Erro ao excluir tarefa:', erro);
        alert('Erro ao excluir tarefa.');
    }
}
