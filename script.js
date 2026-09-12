const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.main-nav');

if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
  });

  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    menu.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));
}

// Carrega a identidade visual da UNAH no topo e no rodapé.
fetch('assets/logo-data.txt')
  .then((response) => {
    if (!response.ok) throw new Error('Logo não encontrada');
    return response.text();
  })
  .then((base64) => {
    const logoUrl = `url("data:image/png;base64,${base64.trim()}")`;
    document.querySelectorAll('.brand-logo').forEach((element) => {
      element.style.backgroundImage = logoUrl;
    });
  })
  .catch(() => {
    document.querySelectorAll('.brand-logo').forEach((element) => {
      element.textContent = 'UNAH';
      element.classList.add('brand-logo-fallback');
    });
  });

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const form = document.getElementById('contact-form');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const nome = data.get('nome') || '';
  const empresa = data.get('empresa') || '';
  const cargo = data.get('cargo') || '';
  const email = data.get('email') || '';
  const telefone = data.get('telefone') || '';
  const mensagem = data.get('mensagem') || '';

  const subject = encodeURIComponent(`Contato pelo site UNAH — ${nome}`);
  const body = encodeURIComponent(
`Nome: ${nome}\nEmpresa / instituição: ${empresa}\nCargo: ${cargo}\nE-mail: ${email}\nTelefone: ${telefone}\n\nMensagem:\n${mensagem}`
  );

  window.location.href = `mailto:unahgestaoemsaudeeresultados@gmail.com?subject=${subject}&body=${body}`;
});

// Versão visual alinhada ao modelo Enter-Exato aprovado.
