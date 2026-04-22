# 🍦 Sorveteria Caldas

Sistema web completo para gestão de uma sorveteria, desenvolvido com Laravel e PHP. Permite o gerenciamento de produtos, pedidos e clientes por meio de uma interface administrativa intuitiva.

## Sobre o projeto

O sistema foi criado para digitalizar o fluxo de operações de uma sorveteria, substituindo controles manuais por uma plataforma web centralizada. O projeto abrange desde o cadastro do cardápio até o registro e acompanhamento de pedidos.

## Funcionalidades

- Cadastro e gerenciamento de produtos (sabores, tamanhos, preços)
- Registro e acompanhamento de pedidos
- Painel administrativo com visão geral das operações
- Autenticação e controle de acesso

## Tecnologias utilizadas

- **PHP** com framework **Laravel**
- **MySQL** para banco de dados relacional
- **Tailwind CSS** para estilização
- **Vite** para bundling de assets
- **Blade** como template engine

## Como rodar localmente

**Pré-requisitos:** PHP 8+, Composer, Node.js e MySQL instalados.

```bash
# Clone o repositório
git clone https://github.com/Guilherme-Calheiros/sorveteria_caldas.git
cd sorveteria_caldas

# Instale as dependências PHP
composer install

# Instale as dependências JS
npm install

# Configure o ambiente
cp .env.example .env
php artisan key:generate

# Configure o banco de dados no arquivo .env e rode as migrations
php artisan migrate

# (Opcional) Popule o banco com dados iniciais
php artisan db:seed

# Inicie o servidor de desenvolvimento
php artisan serve

# Em outro terminal, compile os assets
npm run dev
```

Acesse `http://localhost:8000` no navegador.

## Estrutura do projeto

```
sorveteria_caldas/
├── app/
│   ├── Http/Controllers/   # Controladores da aplicação
│   └── Models/             # Models Eloquent
├── database/
│   ├── migrations/         # Estrutura do banco de dados
│   └── seeders/            # Dados iniciais
├── resources/
│   └── views/              # Templates Blade
└── routes/
    └── web.php             # Rotas da aplicação
```

## Aprendizados

Este projeto foi desenvolvido para praticar o padrão MVC com Laravel, incluindo Eloquent ORM, sistema de rotas, migrations e autenticação nativa do framework.
