document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const btnSubmit = form.querySelector('button[type="submit"]');
    
    btnSubmit.addEventListener('click', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        // Adicione validação básica
        if (!email || !senha) {
            alert('Preencha todos os campos');
            return;
        }

        try {
            btnSubmit.disabled = true; //Desabilita o botão durante a requisição
            btnSubmit.textContent = 'Carregando...';

            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                window.location.href = '/tarefas.html';
            } else {
                alert(data.erro || 'Erro no login');
            }
        } catch (erro) {
            console.error('Erro:', erro);
            alert('Falha na conexão com o servidor');
        } finally {
            btnSubmit.disabled = false;
            btnSubmit.textContent = 'Entrar';
        }
    });
});