const quests = document.querySelectorAll('.quest');
const progressBar = document.querySelector('.progress-bar');
const progressContainer = document.querySelector('.progress');

quests.forEach(quest => {
  quest.addEventListener('change', updateProgress);
});

function updateProgress() {
  const total = quests.length;
  const completed = document.querySelectorAll('.quest:checked').length;
  const percentComplete = (completed / total) * 100;

  progressBar.style.width = `${percentComplete}%`;
  progressBar.textContent = `${Math.round(percentComplete)}%`;

  // Atualizar os atributos de acessibilidade
  progressContainer.setAttribute('aria-valuenow', Math.round(percentComplete));

  // Opcional: Salvar o progresso no localStorage
  localStorage.setItem('questsProgress', percentComplete);
}

// Recuperar o progresso salvo ao carregar a página
window.addEventListener('load', () => {
  const savedProgress = localStorage.getItem('questsProgress');
  if (savedProgress) {
    progressBar.style.width = `${savedProgress}%`;
    progressBar.textContent = `${Math.round(savedProgress)}%`;
    progressContainer.setAttribute('aria-valuenow', Math.round(savedProgress));
  }
});

// -------------------------------------------

// Seleciona todos os checkboxes com a classe 'quest'
const checkboxes = document.querySelectorAll('.quest');

// Adiciona um evento para cada checkbox
checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            this.parentElement.classList.add('checked');
        } else {
            this.parentElement.classList.remove('checked');
        }
    });
});
