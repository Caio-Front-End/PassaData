//Container que para renderizar as seções > cards:
const teamsContainer = document.querySelector('#teams-container');

//Função receberá um array de jogadoras (JSON / localStorage -> playerServices.js)
//Renderiza os cards, agrupados por seções (times):

export function renderPlayersByTeam(playersArray) {
  //Limpa o container para evitar repetição durante as atualizações:
  teamsContainer.innerHTML = '';

  //Agrupando as jogadoras em arrays por time:
  //Cria um array por time, se ainda não houver, e adiciona as jogadoras daquele time dentro
  const playersByTeam = {};
  for (const player of playersArray) {
    const teamName = player.clube;

    if (!playersByTeam[teamName]) {
      playersByTeam[teamName] = [];
    }
    playersByTeam[teamName].push(player);
  }

  //Criando HTML para cada time criado à partir do array original
  for (const teamName in playersByTeam) {
    const players = playersByTeam[teamName];

    const teamSectionHtml = `
    <section class="team-section">
      <div class="team-header">
        <img src="./assets/emblemas/${teamName}.png" alt="Emblema ${teamName}" class="team-emblem" />
        <h2 class="team-title">${teamName}</h2>
      </div>
      <div class="team-cards">
        ${players.map((player) => createPlayerCard(player)).join('')}
      </div>
    </section>
  `;

    //Inserindo a seção no container de times:
    teamsContainer.insertAdjacentHTML('beforeend', teamSectionHtml);
  }
}

//Renderizando cards:
function createPlayerCard(player) {
  return `
    <div class="player-card">
            <button class="favorite-btn" aria-label="Favoritar atleta">
              <!-- SVG estrela -->
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFD700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </button>
            <img src="${player.foto}" alt="Foto da jogadora ${player.nome}" class="player-photo" />
            <div class="player-info">
              <h3 class="player-name">${player.nome}</h3>
              <p class="player-position">${player.posicao}</p>
              <p class="player-stats">
                Gols: <span>${player.gols}</span> | Assistências: <span>${player.assistencias}</span> | Jogos: <span>${player.jogos}</span>
              </p>
            </div>
          </div>
  `;
}
