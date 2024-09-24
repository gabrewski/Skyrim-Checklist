const quests = document.querySelectorAll('.quest');
const progressBar = document.querySelector('.progress-bar');
const progressContainer = document.querySelector('.progress');

// Função para salvar o estado das quests no localStorage
function saveQuestState() {
  const questState = [];
  quests.forEach((quest) => {
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

      // Verifica se o checkbox está marcado e aplica ou remove a classe 'checked'
      if (quest.checked) {
        quest.parentElement.classList.add('checked');
      } else {
        quest.parentElement.classList.remove('checked');
      }
    });
  }
}

// Função para atualizar o progresso e a cor do texto
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

// Evento de mudança em cada checkbox para alterar a cor do texto e atualizar o progresso
quests.forEach(quest => {
  quest.addEventListener('change', function() {
    if (this.checked) {
      this.parentElement.classList.add('checked');
    } else {
      this.parentElement.classList.remove('checked');
    }
    updateProgress();
  });
});

// Restaurar o progresso e o estado das quests ao carregar a página
window.addEventListener('load', () => {
  restoreQuestState();  // Restaura o estado dos checkboxes e a cor do texto
  updateProgress();  // Atualiza a barra de progresso com base no estado restaurado
});


// pesquisar

function searchQuests() {
  // Pegue o valor digitado no campo de busca
  const searchQuery = document.getElementById('search-input').value.toLowerCase();

  // Pegue todos os itens da lista de quests
  const quests = document.querySelectorAll('#quest-list li');

  // Filtre os itens que não correspondem à pesquisa e os esconda
  quests.forEach(quest => {
    const questText = quest.textContent.toLowerCase();
    if (questText.includes(searchQuery)) {
      quest.style.display = '';
    } else {
      quest.style.display = 'none';
    }
  });
}