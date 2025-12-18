# DevHouse API

## 📌 Visão Geral

DevHouse é uma API REST desenvolvida em **Node.js** com **TypeScript**, focada no gerenciamento de usuários, imóveis e reservas. O projeto simula uma plataforma semelhante ao Airbnb, permitindo cadastro de casas, upload de imagens e controle de reservas, sendo ideal para demonstração de arquitetura backend moderna em portfólio.

O foco principal do projeto está em **boas práticas**, **organização em camadas**, **validação de dados**, e **persistência com ORM**.

---

## 🛠️ Tecnologias Utilizadas

* **Node.js**
* **TypeScript**
* **Express**
* **Prisma ORM**
* **SQLite** (ambiente de desenvolvimento)
* **Multer** (upload de arquivos)
* **Yup** (validação de dados)
* **CORS**

---

## 🧱 Arquitetura

O projeto segue uma arquitetura organizada por responsabilidade:

```
src/
├── controllers/   # Camada HTTP (Request / Response)
├── services/      # Regras de negócio
├── middlewares/   # Validações e interceptadores
├── routes/        # Definição das rotas
├── utils/         # Configurações e helpers
├── server.ts      # Bootstrap da aplicação
```

Separação clara entre **controller** e **service**, evitando lógica de negócio acoplada à camada HTTP.

---

## 🗄️ Modelagem de Dados

### User

* id
* email (único)
* relacionamento 1:N com House

### House

* id
* title
* description
* price
* image
* owner (User)
* reserva opcional (1:1)

### Reserve

* id
* date
* user
* house (único)

Relacionamentos modelados via Prisma, garantindo integridade e clareza.

---

## 📦 Funcionalidades

* Cadastro de usuários
* Cadastro de casas
* Upload de imagens para imóveis
* Listagem de casas
* Reserva de imóveis
* Validação de dados com Yup
* Persistência com Prisma

---

## 🚀 Instalação e Execução

### Pré-requisitos

* Node.js (>=18)
* npm ou yarn

### Passos

```bash
# Instalar dependências
npm install

# Gerar client do Prisma
npx prisma generate

# Executar migrações
npx prisma migrate dev

# Iniciar aplicação
npm run start
```

A aplicação será iniciada em ambiente de desenvolvimento utilizando **tsx watch**.

---

## 📤 Upload de Arquivos

O upload de imagens é realizado via **Multer**, com armazenamento local na pasta `uploads/`. Cada imóvel pode conter uma imagem representativa.

---

## 🔐 Validação e Segurança

* Validação de payloads com **Yup**
* Separação de responsabilidades
* Evita dados inconsistentes no banco

Autenticação não implementada propositalmente para manter o foco em arquitetura e domínio.

---

## 📈 Pontos Fortes para Portfólio

* Uso real de ORM (Prisma)
* Organização profissional de pastas
* Boas práticas de API REST
* Upload de arquivos
* Validação robusta
* Código limpo e extensível
