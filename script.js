const quests = document.querySelectorAll('.quest');
const progressBar = document.querySelector('.progress-bar');
const progressContainer = document.querySelector('.progress');

// salva o estado das quests
function saveQuestState() {
  const questState = [];
  quests.forEach((quest) => {
    questState.push(quest.checked);  
  });
  localStorage.setItem('questsState', JSON.stringify(questState));
}

// restaura o estado das quests
function restoreQuestState() {
  const savedState = localStorage.getItem('questsState');
  if (savedState) {
    const questState = JSON.parse(savedState);
    quests.forEach((quest, index) => {
      quest.checked = questState[index];  

      if (quest.checked) {
        quest.parentElement.classList.add('checked');
      } else {
        quest.parentElement.classList.remove('checked');
      }
    });
  }
}

// atualiza o progresso e a cor do texto
function updateProgress() {
  const total = quests.length;
  const completed = document.querySelectorAll('.quest:checked').length;
  const percentComplete = (completed / total) * 100;

  progressBar.style.width = `${percentComplete}%`;
  progressBar.textContent = `${Math.round(percentComplete)}%`;

  progressContainer.setAttribute('aria-valuenow', Math.round(percentComplete));

  // salva o estado das quests e o progresso
  saveQuestState();
  localStorage.setItem('questsProgress', percentComplete);
}

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

// restaura o progresso e o estado das quests ao carregar a página
window.addEventListener('load', () => {
  restoreQuestState();  
  updateProgress(); 
});


// pesquisar
function searchQuests() {
  const searchQuery = document.getElementById('search-input').value.toLowerCase();
  console.log("Busca:", searchQuery);

  const quests = document.querySelectorAll('.quests label');

  let foundQuest = null;

  quests.forEach(quest => {
    const questText = quest.textContent.toLowerCase();
    console.log("Texto da Quest:", questText);

    if (questText.includes(searchQuery)) {
      foundQuest = quest; 
    }
  });

  if (foundQuest) {
    foundQuest.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    alert("Quest not found.");
  }
}


