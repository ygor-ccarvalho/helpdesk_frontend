# Help Desk — Frontend

![Angular](https://img.shields.io/badge/Angular-21-DD0031?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-24-339933?logo=nodedotjs&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

## 🚀 Preview

![Preview](docs/dark/home.png)

---

## 📌 Sobre o projeto

Aplicação web para gerenciamento de chamados técnicos, desenvolvida com Angular e Angular Material.

Projeto inspirado em curso, com diversas melhorias e evoluções implementadas de forma independente, incluindo redesign completo da interface, tema escuro, responsividade e padronização visual.

---

## 🛠️ Tecnologias

* Angular 21
* Angular Material 21 (MDC)
* TypeScript 5.9
* RxJS 7
* SSR com @angular/ssr + Express 5
* ngx-mask / ngx-toastr
* FontAwesome
* Spring Boot (backend separado)

---

## ⚙️ Funcionalidades

* Autenticação com JWT
* CRUD de técnicos
* CRUD de clientes
* Abertura e acompanhamento de chamados
* Filtro e paginação nas listagens
* Layout responsivo
* Tema escuro com persistência via localStorage

---

## 🧠 Diferenciais técnicos

* Server-Side Rendering (SSR) com @angular/ssr + Express
* Implementação de tema dinâmico com CSS Variables
* Controle de responsividade com BreakpointObserver (Angular CDK)
* Interceptor HTTP para autenticação com JWT
* Customização avançada do Angular Material (MDC)
* Padronização de layout e design system

---

## 🎨 Melhorias implementadas

* Dark mode completo com troca dinâmica de tema
* Sidenav redesenhado com seções, avatar e navegação organizada
* Badges visuais para status e prioridade
* Telas de confirmação (delete) com UI moderna
* Melhorias de UX e consistência visual
* Layout adaptado para mobile (menu hamburguer)

---

## 📸 Screenshots

### 🌞 Light mode

| Home                         | Lista                                | Delete                           | Update                           |
| ---------------------------- | ------------------------------------ | -------------------------------- | -------------------------------- |
| ![Home](docs/light/home.png) | ![Técnicos](docs/light/tecnicos.png) | ![Delete](docs/light/delete.png) | ![Update](docs/light/update.png) |

---

### 🌙 Dark mode

| Home                        | Lista                               | Delete                          | Update                           |
| --------------------------- | ----------------------------------- | ------------------------------- | -------------------------------- |
| ![Home](docs/dark/home.png) | ![Técnicos](docs/dark/tecnicos.png) | ![Delete](docs/dark/delete.png) | ![Update](docs/dark/update.png) |

---

## ▶️ Como rodar

### Pré-requisitos

* Node.js 24+ (LTS)
* Angular CLI 21+
* npm 11+

### Instalação

```bash
git clone https://github.com/ygor-ccarvalho/helpdesk_frontend
cd helpdesk_frontend
npm install
ng serve
```

Acesse: http://localhost:4200

### Rodar com SSR (Server-Side Rendering)

```bash
npm run build
npm run serve:ssr:helpdesk
```

> ℹ️ O projeto suporta SSR (`@angular/ssr` + Express), mas a **demo hospedada no GitHub Pages roda em modo estático (CSR)**, já que o GitHub Pages não executa servidores Node. Para ver o SSR em ação, rode localmente com o comando acima.



> ⚠️ O backend precisa estar rodando
> https://github.com/ygor-ccarvalho/helpdesk_backend


---

### 🚧 Próximos passos

* Implementar recuperação de senha (fluxo completo com envio de e-mail e redefinição)
* Melhorar responsividade
* Implementar testes unitários

---

## 👨‍💻 Autor

**Ygor Carvalho**

* 🔗 LinkedIn: https://www.linkedin.com/in/ygorcarvalhodev/
* 💻 GitHub: https://github.com/ygor-ccarvalho

## 🙏 Agradecimentos

Projeto desenvolvido a partir do curso do professor **Valdir Cezar** na Udemy,
com **melhorias e implementações próprias**.
