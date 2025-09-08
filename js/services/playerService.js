//Chave dos dados no localStorage:
const localStorageKey = 'jogadorasDataBase';
//Caminho para o JSON de jogadoras:
const jsonPlayersPath = '../../data/jogadoras.json';

/*
  Função para buscar as jogadoras 
  - Tenta primeiro no localStorage;
  - Se não encontrar nada, busca no arquivo JSON;
*/
export async function getPLayers() {
  //Só terá valor se houver algo no localStorage
  const playersFromStorage = localStorage.getItem(localStorageKey);

  if (playersFromStorage) {
    //Se encontrar, converte em objeto e retorna
    return JSON.parse(playersFromStorage);
  } else {
    //Se não encontrar, busca direto no JSON:
    const response = await fetch(jsonPlayersPath);
    const dataFromJson = await response.json();

    //Salva no localStorage para a próxima consulta    //Converte os dados do JSON em string
    localStorage.setItem(localStorageKey, JSON.stringify(dataFromJson));

    return dataFromJson;
  }
}

//Encontra e retorna uma única jogadora por ID:
export function getPlayerById(playerId) {
  const players = JSON.parse(localStorage.getItem(localStorageKey)) || [];
  return players.find((player) => player.id === playerId);
}

//Deleta card de jogadora:
export function deletePlayer(playerId) {
  // Pega a lista atual de jogadoras
  const players = JSON.parse(localStorage.getItem(localStorageKey)) || [];

  // Usa o método .filter() para criar um NOVO array com todas as jogadoras,
  // EXCETO aquela com o ID que queremos excluir.
  const updatedPlayers = players.filter((player) => player.id !== playerId);

  // Salva o novo array (sem a jogadora excluída) de volta no localStorage.
  localStorage.setItem(localStorageKey, JSON.stringify(updatedPlayers));
}

//Atualiza os dados de uma jogadora:
export function updatePlayer(updatedPlayer) {
  const players = JSON.parse(localStorage.getItem(localStorageKey)) || [];

  // Usa .map() para criar um novo array. Quando encontrar a jogadora com o ID
  // correspondente, substitui pelo objeto atualizado.
  const updatedPlayers = players.map((player) =>
    player.id === updatedPlayer.id ? updatedPlayer : player,
  );

  localStorage.setItem(localStorageKey, JSON.stringify(updatedPlayers));
}
