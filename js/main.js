//Importando a função de consulta ao localStorage e JSON local:
import {
  getPLayers,
  getPlayerById,
  deletePlayer,
  updatePlayer,
  addPlayer,
} from './services/playerService.js';
//Função que renderiza seção > card:
import { renderPlayersByTeam } from './ui/uiManager.js';

//Função que inicia a aplicação:
async function startApp() {
  //Fazendo a requisição das jogadoras:
  const playersData = await getPLayers();
  renderPlayersByTeam(playersData);
}
//Carregando os dados quando a página estiver pronta:
document.addEventListener('DOMContentLoaded', startApp);

//
//
//
//
//
//
//
//

//Eventos de captura de click para os cards:

function cardClickEvent() {
  const teamsContainer = document.querySelector('#teams-container');
  const editForm = document.querySelector('#modal-edit-form-container');

  //preenchendo form de edição
  teamsContainer.addEventListener('click', (e) => {
    //Card que foi clicado:
    const clickedCard = e.target.closest('.player-card');

    //Se não houver um elemento '.player-card' na constante, não faz nada
    if (!clickedCard) {
      return;
    }

    //Pega o ID do card clicado:
    const playerId = parseInt(clickedCard.dataset.id);
    //Buscando elemento com base no ID:
    const playerData = getPlayerById(playerId);

    //Preenchendo o formulário com base no card clicado:

    if (playerData) {
      editForm.querySelector('#edit-player-name').value = playerData.nome;
      editForm.querySelector('#edit-player-position').value =
        playerData.posicao;
      editForm.querySelector('#edit-player-photo').value = playerData.foto;
      editForm.querySelector('#edit-player-goals').value = playerData.gols;
      editForm.querySelector('#edit-player-assists').value =
        playerData.assistencias;
      editForm.querySelector('#edit-player-games').value = playerData.jogos;
    }

    //Guardando o ID no próprio formulário, para facilitar manipulação:
    editForm.dataset.editingId = playerId;

    //Exibindo formulário:
    editForm.style.display = 'flex';
  });

  //Adicionando funcionalidade de exlcuir card:
  const deleteButton = editForm.querySelector('#delete-player-btn');

  deleteButton.addEventListener('click', async () => {
    //Pega o ID guardado no form:
    const playerId = parseInt(editForm.dataset.editingId);
    //Chama a função de deletar o card, com o id recuperado conforme click:
    deletePlayer(playerId);
    //Esconde novamente o formulário:
    editForm.style.display = 'none';
    //Exibe o modal de exclusão com sucesso:
    const modalSuccessRemove = document.querySelector('#modal-success-remove');
    modalSuccessRemove.style.display = 'flex';
    setTimeout(() => {
      modalSuccessRemove.style.display = 'none';
    }, 3000);
    //Atualiza a página
    const updatedPlayers = await getPLayers();
    renderPlayersByTeam(updatedPlayers);
  });

  //Adicionando funcionalidade de edição do card:
  const saveButton = editForm.querySelector('#save-edit-btn');

  saveButton.addEventListener('click', async (e) => {
    e.preventDefault();

    //Id guardado no form:
    const playerId = parseInt(editForm.dataset.editingId);

    //Valores atualizados dos inputs:
    const nameInput = editForm.querySelector('#edit-player-name');
    const positionInput = editForm.querySelector('#edit-player-position');
    const teamInput = editForm.querySelector('#player-team');
    const photoInput = editForm.querySelector('#edit-player-photo');
    const goalsInput = editForm.querySelector('#edit-player-goals');
    const assistsInput = editForm.querySelector('#edit-player-assists');
    const gamesInput = editForm.querySelector('#edit-player-games');

    //Monta o objeto da jogadora, atualizado:
    const updatedPlayerData = {
      id: playerId,
      nome: nameInput.value,
      clube: teamInput.value,
      posicao: positionInput.value,
      foto: photoInput.value,
      gols: goalsInput.value,
      assistencias: assistsInput.value,
      jogos: gamesInput.value,
    };

    //Chama a função que salva as alterações
    updatePlayer(updatedPlayerData);

    //Esconde o formulário novamente:
    editForm.style.display = 'none';

    //Exibe modal de sucesso de edição:
    const modalSucceddEdit = document.querySelector('#modal-success-edit');
    modalSucceddEdit.style.display = 'flex';
    setTimeout(() => {
      modalSucceddEdit.style.display = 'none';
    }, 3000);

    // Atualiza a tela
    const updatedPlayers = await getPLayers();
    renderPlayersByTeam(updatedPlayers);
  });

  //Funcionalidade de adicionar jogadora:

  //Elementos de manipulação para adição:
  const openAddFormBtn = document.querySelector('.add-player-btn');
  const addFormContainer = document.querySelector('#modal-form-container');
  const addForm = document.querySelector('#player-form');
  const closeAddFormButton = document.querySelector('#close-modal-btn');
  const successAddModal = document.querySelector('#modal-success-add');

  //Função para atualizar a lista de jogadoras:
  async function refreshPlayerList() {
    const players = await getPLayers();
    renderPlayersByTeam(players);
  }

  //Eventos para adicionar jogadora

  //Abrir form:
  openAddFormBtn.addEventListener('click', () => {
    addForm.reset();
    addFormContainer.style.display = 'flex';
  });

  //Botão fechar form:
  closeAddFormButton.addEventListener('click', () => {
    addFormContainer.style.display = 'none';
  });

  //Enviar form (criar nova jogadora)
  addForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //Coleta os dados para o novo objeto(jogadora)
    const newPlayerData = {
      id: Date.now(), // Cria um ID para a nova jogadora
      nome: document.querySelector('#player-name').value,
      posicao: document.querySelector('#player-position').value,
      foto: document.querySelector('#player-photo').value,
      clube: document.querySelector('#player-team').value,
      gols: parseInt(document.querySelector('#player-goals').value),
      assistencias: parseInt(document.querySelector('#player-assists').value),
      jogos: parseInt(document.querySelector('#player-games').value),
    };

    //Salva nova jogadora no localStorage
    addPlayer(newPlayerData);

    //Esconde o formulário novamente:
    addFormContainer.style.display = 'none';

    //Exibe modal de "jogadora adicionada com sucesso"
    successAddModal.style.display = 'flex';
    setTimeout(() => {
      successAddModal.style.display = 'none';
    }, 3000);

    //Atualiza lista de cards:
    refreshPlayerList();
  });
}

cardClickEvent();
