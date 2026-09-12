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

// Ajustes finais aprovados: identidade visual e títulos de seção.
const visualOverrides = document.createElement('style');
visualOverrides.textContent = `
  .eyebrow{
    font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif !important;
    font-size:1.28rem !important;
    font-weight:600 !important;
    letter-spacing:.24em !important;
    line-height:1.25 !important;
    margin-bottom:18px !important;
  }
  @media (max-width:820px){
   
    .eyebrow{font-size:1.08rem !important;letter-spacing:.22em !important;}
  }
  @media (max-width:520px){
  
    .eyebrow{font-size:1rem !important;letter-spacing:.2em !important;}
  }
`;
document.head.appendChild(visualOverrides);

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
