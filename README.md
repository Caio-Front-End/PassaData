# PassaData

**PassaData** é um projeto web para gerenciamento de jogadoras de futebol, permitindo adicionar, editar, remover e favoritar atletas, organizadas por clubes. Os dados são persistidos via `localStorage` e podem ser inicializados a partir de um arquivo JSON.

---

## Funcionalidades

- Visualização de jogadoras agrupadas por clube
- Adição de novas jogadoras via formulário
- Edição e remoção de jogadoras existentes
- Favoritar jogadoras (ícone de estrela)
- Modal de feedback para ações (adicionar, editar, remover)
- Persistência dos dados no `localStorage`
- Responsivo para dispositivos móveis

---

## Estrutura de Pastas

```plaintext
PassaData/
├── assets/
│   ├── logo/
│   └── emblemas/
├── css/
│   ├── reset.css
│   ├── style.css
│   └── components/
│       └── _cards.css
├── data/
│   └── jogadoras.json
├── js/
│   ├── main.js
│   ├── services/
│   │   └── playerService.js
│   └── ui/
│       └── uiManager.js
├── index.html
└── README.md
```

---

## Como rodar o projeto

1. **Clone o repositório:**

   ```sh
   git clone https://github.com/seu-usuario/PassaData.git
   ```

2. **Abra a pasta no VS Code ou outro editor.**

3. **Execute um servidor local** (recomendado para o fetch do JSON funcionar):

   - Com Python:
     ```sh
     python -m http.server
     ```
   - Ou utilize a extensão Live Server do VS Code.

4. **Acesse** `http://localhost:8000` ou a porta indicada pelo seu servidor.

---

## Uso

- Clique em **Adicionar jogadora** para abrir o formulário de cadastro.
- Preencha os campos e salve para adicionar uma nova atleta.
- Clique em um card para editar ou excluir a jogadora.
- Use o ícone de estrela para favoritar uma jogadora.
- As jogadoras são agrupadas por clube, cada clube possui sua própria seção.

---

## Tecnologias

- HTML5
- CSS3
- JavaScript ES6 (modular)
- LocalStorage para persistência de dados

---

## Observações

- O projeto lê inicialmente do arquivo `jogadoras.json` e salva no `localStorage`. Após a primeira interação, os dados são mantidos apenas no `localStorage`.
- Para atualizar manualmente o arquivo JSON, limpe o localStorage do navegador:
  ```js
  localStorage.removeItem('jogadorasDataBase');
  ```
  E recarregue a página.

---

## Contribuição

Sinta-se livre para abrir issues, enviar sugestões ou pull requests!

---

## 👨‍💻 Desenvolvedores

| Nome                           | RM                | Linkedin                                                            |
| ------------------------------ | ----------------- | ------------------------------------------------------------------- |  
| Caio Nascimento Battista       | 561383            | [LinkedIn](https://www.linkedin.com/in/cnbtt/)                      |
| Manoah Leão                    | 563713            | [LinkedIn](https://www.linkedin.com/in/manoah-le%C3%A3o-735a83346/) |
