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
