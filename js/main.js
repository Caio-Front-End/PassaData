//Importando a função de consulta ao localStorage e JSON local:
import { getPLayers } from './services/playerService.js';
//Função que renderiza seção > card:
import { renderPlayersByTeam } from './ui/uiManager.js';

//Função que inicia a aplicação:
async function startApp() {
  //Fazendo a requisição das jogadoras:
  const playersData = await getPLayers();
  renderPlayersByTeam(playersData);
}

//Testando a requisição dos dados ao carregar a página:

document.addEventListener('DOMContentLoaded', startApp);
