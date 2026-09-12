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
  .contact-channel{
    display:grid;
    gap:5px;
    padding-bottom:18px;
    border-bottom:1px solid rgba(223,152,101,.3);
  }
  .contact-channel > span{
    color:var(--copper);
    font-weight:800;
    font-size:1rem;
  }
  .contact-channel > strong{
    color:#fff;
    font-size:1.04rem;
  }
  .contact-actions{
    display:flex;
    gap:16px;
    flex-wrap:wrap;
    margin-top:4px;
  }
  .contact-actions a{
    display:inline-flex !important;
    padding:0 !important;
    border:0 !important;
    color:#c7d0d4 !important;
    font-size:.88rem !important;
    font-weight:700 !important;
    text-decoration:underline !important;
    text-underline-offset:3px;
  }
  .contact-actions a:hover{
    color:var(--copper) !important;
  }
  @media (max-width:820px){
    .eyebrow{font-size:1.08rem !important;letter-spacing:.22em !important;}
  }
  @media (max-width:520px){
    .eyebrow{font-size:1rem !important;letter-spacing:.2em !important;}
  }
`;
document.head.appendChild(visualOverrides);

// Cada número da UNAH pode ser usado tanto para WhatsApp quanto para ligação.
const contactLinks = document.querySelector('.contact-links');
if (contactLinks) {
  const emailItem = contactLinks.querySelector('a[href^="mailto:"]');
  const atendimentoItem = Array.from(contactLinks.children).find((item) => item.tagName === 'DIV');

  contactLinks.innerHTML = `
    <div class="contact-channel">
      <span>WhatsApp/Telefone</span>
      <strong>(35) 99202-9316</strong>
      <div class="contact-actions">
        <a href="https://wa.me/5535992029316" target="_blank" rel="noopener noreferrer">Enviar mensagem</a>
        <a href="tel:+5535992029316">Ligar</a>
      </div>
    </div>
    <div class="contact-channel">
      <span>WhatsApp/Telefone</span>
      <strong>(35) 99895-8535</strong>
      <div class="contact-actions">
        <a href="https://wa.me/5535998958535" target="_blank" rel="noopener noreferrer">Enviar mensagem</a>
        <a href="tel:+5535998958535">Ligar</a>
      </div>
    </div>
  `;

  if (emailItem) contactLinks.appendChild(emailItem);
  if (atendimentoItem) contactLinks.appendChild(atendimentoItem);
}

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
