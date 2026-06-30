// Seleciona todos os links da navbar e obtém o nome do arquivo da página atual
const links = document.querySelectorAll('.nav a');
const paginaAtual = window.location.pathname.split('/').pop().replace('pages', '');

// Adiciona a classe "active" ao link correspondente à página atual
links.forEach(link => {
    const hrefLink = link.getAttribute('href');
    if (hrefLink === paginaAtual) {
        link.classList.add('active');
    }
})

// Seleciona o botão de toggle de tema e o elemento raiz do documento
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Carrega o tema salvo no localStorage, ou usa "light" como padrão
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

// Alterna entre dark e light mode ao clicar no botão
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
})

// Atualiza o ícone do botão de acordo com o tema atual
function updateIcon(theme) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Configuração das mensagens de validação customizadas para cada campo do formulário
const campos = [
    { id: 'nome', mensagens: { valueMissing: 'Por favor, preencha seu nome.' } },
    { id: 'email', mensagens: { 
        valueMissing: 'Por favor, insira um e-mail.', 
        typeMismatch: 'Formato de e-mail inválido.' 
    }},
    { id: 'mensagem', mensagens: { valueMissing: 'Por favor, escreva sua mensagem.' } }
];

// Para cada campo, define a mensagem de erro customizada ao falhar na validação
// e reseta a mensagem quando o usuário começa a digitar novamente
campos.forEach(({ id, mensagens }) => {
    const campo = document.getElementById(id);
    if (!campo) return; // o código não vai rodar se não estiver na página de contato

    campo.addEventListener('invalid', () => {
        // encontra o primeiro tipo de erro que está ativo no campo e usa a mensagem correspondente
        const tipoErro = Object.keys(mensagens).find(tipo => campo.validity[tipo]);
        campo.setCustomValidity(mensagens[tipoErro] || '');
    });
    
    campo.addEventListener('input', () => campo.setCustomValidity(''));
});

// Seleciona os elementos do formulário e do modal de confirmação
const form = document.getElementById('form');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');


// Só pressegue se o form for encontrado na página
if(form) {
    // Simula o envio do formulário: exibe o modal de sucesso e reseta os campos
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // impede o reload padrão da página

        modalOverlay.classList.remove('hidden');
        form.reset(); // limpa todos os campos após o envio
    })
}

// Só prossegue se o modal for encontrado na página
if(modalClose) {
    // Fecha o modal ao clicar no botão "OK"
    modalClose.addEventListener('click', () => {
        modalOverlay.classList.add('hidden');
    })
}
