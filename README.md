# 🧾 Formulário de Usuários – Tinnova

> Projeto de cadastro e listagem de usuários desenvolvido como parte de um desafio técnico da Tinnova.

## Visão geral

O projeto tem como objetivo permitir o cadastro de usuários com validações de CPF, telefone e e-mail, além da listagem e persistência local dos dados.

---

## Tecnologias

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [SCSS](https://sass-lang.com/)
- [Vitest](https://vitest.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Husky + Commitlint](https://typicode.github.io/husky/#/)

---

## Instalação

```bash
git clone https://github.com/fer-oshiro/userform-app.git
cd userform-app
npm install
```

## Scripts

```bash
npm run dev        # Inicia o servidor de desenvolvimento
npm run lint       # Executa o ESLint
npm run format     # Aplica Prettier aos arquivos
npm run test       # Executa os testes com Vitest
npm run prepare    # Inicializa o Husky
```

## Estrutura de pastas

```bash
src/
├── components/      # Componentes
├── constants/       # Constantes globais usadas na aplicação
├── pages/           # Páginas do app e seus componentes locais
├── routes/          # Configuração de rotas com React Router
├── schema/          # Schemas de validação com Zod
├── services/        # Serviços de dados (ex: localStorage, API mocks)
├── styles/          # SCSS globais
├── tests/           # Configurações e utilitários para testes
├── utils/           # Funções auxiliares e utilitários puros
└── main.tsx         # Entrada da aplicação
```
