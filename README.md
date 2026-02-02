📦 Estoque-FrontEnd
Interface web moderna desenvolvida para o gerenciamento de estoque. Este projeto é o cliente oficial que consome a API do Estoque-BackEnd.

🛠️ O Ecossistema
Para funcionar corretamente, este Front-End depende de uma infraestrutura que já está configurada no repositório de Back-End:

API: Nest.js (REST)

ORM: Prisma

Banco de Dados: PostgreSQL

Infraestrutura: Docker & Docker Compose

🚀 Como Executar o Projeto
1. Requisito Fundamental (O Back-End)
Antes de iniciar este Front-End, o ambiente Docker do Back-End precisa estar rodando.

Bash
# Vá até a pasta do repositório Estoque-BackEnd e rode:
docker-compose up -d
Isso subirá o banco PostgreSQL e a API Nest.js automaticamente.

2. Configuração do Front-End
Clone este repositório e instale as dependências:

Bash
git clone https://github.com/MiguelSantiago777/Estoque-FrontEnd.git
cd Estoque-FrontEnd
npm install
3. Variáveis de Ambiente
Crie um arquivo .env.local na raiz do projeto e aponte para a porta onde o Docker expôs a API (geralmente 3000):

Snippet de código
NEXT_PUBLIC_API_URL=http://localhost:3000
4. Rodar em Desenvolvimento
Bash
npm run dev
Acesse http://localhost:3001 para ver a interface.

📁 Principais Funcionalidades Implementadas
Consumo de API REST: Integração total com os endpoints de produtos e estoque.

Tipagem Estrita: Uso de TypeScript para garantir que os dados vindos do Prisma no Back-End coincidam com a interface.

Estilização com Tailwind: Interface limpa, rápida e totalmente responsiva.

Desenvolvido por Miguel Santiago
