const quests = document.querySelectorAll('.quest');
const progressBar = document.querySelector('.progress-bar');
const progressContainer = document.querySelector('.progress');

// Função para salvar o estado das quests no localStorage
function saveQuestState() {
  const questState = [];
  quests.forEach((quest, index) => {
    questState.push(quest.checked);  // Salva true ou false dependendo se o checkbox está marcado
  });
  localStorage.setItem('questsState', JSON.stringify(questState));
}

// Função para restaurar o estado das quests do localStorage
function restoreQuestState() {
  const savedState = localStorage.getItem('questsState');
  if (savedState) {
    const questState = JSON.parse(savedState);
    quests.forEach((quest, index) => {
      quest.checked = questState[index];  // Restaura o estado de cada checkbox
    });
  }
}

// Função para atualizar o progresso
function updateProgress() {
  const total = quests.length;
  const completed = document.querySelectorAll('.quest:checked').length;
  const percentComplete = (completed / total) * 100;

  progressBar.style.width = `${percentComplete}%`;
  progressBar.textContent = `${Math.round(percentComplete)}%`;

  // Atualizar os atributos de acessibilidade
  progressContainer.setAttribute('aria-valuenow', Math.round(percentComplete));

  // Salvar o estado das quests e o progresso no localStorage
  saveQuestState();
  localStorage.setItem('questsProgress', percentComplete);
}

// Evento de mudança em cada checkbox
quests.forEach(quest => {
  quest.addEventListener('change', updateProgress);
});

// Restaurar o progresso e o estado das quests ao carregar a página
window.addEventListener('load', () => {
  restoreQuestState();  // Restaura o estado dos checkboxes
  updateProgress();  // Atualiza a barra de progresso com base no estado restaurado
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
