const links = document.querySelectorAll('.nav a');
const paginaAtual = window.location.pathname.split('/').pop();

links.forEach(link => {
    const hrefLink = link.getAttribute('href');
    if (hrefLink === paginaAtual) {
        link.classList.add('active');
    }
})

const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
})

function updateIcon(theme) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

const campos = [
    { id: 'nome', mensagens: { valueMissing: 'Por favor, preencha seu nome.' } },
    { id: 'email', mensagens: { 
        valueMissing: 'Por favor, insira um e-mail.', 
        typeMismatch: 'Formato de e-mail inválido.' 
    }},
    { id: 'mensagem', mensagens: { valueMissing: 'Por favor, escreva sua mensagem.' } }
];

campos.forEach(({ id, mensagens }) => {
    const campo = document.getElementById(id);
    if (!campo) return;

    campo.addEventListener('invalid', () => {
        const tipoErro = Object.keys(mensagens).find(tipo => campo.validity[tipo]);
        campo.setCustomValidity(mensagens[tipoErro] || '');
    });
    
    campo.addEventListener('input', () => campo.setCustomValidity(''));
});

const form = document.getElementById('form');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');

if(form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        modalOverlay.classList.remove('hidden');
        form.reset();
    })
}
if(modalClose) {
    modalClose.addEventListener('click', () => {
        modalOverlay.classList.add('hidden');
    })
}
