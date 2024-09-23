// Este código é executado quando o documento HTML foi completamente carregado
document.addEventListener("DOMContentLoaded", function () {
    // Captura todos os links que começam com #
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      // Adiciona um evento de clique a cada link
      anchor.addEventListener('click', function (e) {
        // Impede o comportamento padrão do link (navegar para uma nova página)
        e.preventDefault();

        // Obtém o elemento HTML de destino para o link
        const target = document.querySelector(this.getAttribute('href'));

        // Rola a página suavemente para o topo do elemento de destino
        window.scrollTo({
          top: target.offsetTop - document.querySelector('header').offsetHeight,
          behavior: 'smooth' // rolagem suave
        });
      });
    });
  });