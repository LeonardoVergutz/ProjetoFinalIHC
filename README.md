# Assistente Duda - Protótipo de Chatbot de RH para a Innovatec Soluções

![Status](https://img.shields.io/badge/status-conclu%C3%ADdo-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![HCI Project](https://img.shields.io/badge/disciplina-Intera%C3%A7%C3%A3o%20Humano--Computador-9cf)

Protótipo de alta fidelidade de um chatbot de RH, desenvolvido como projeto final para a disciplina de Interação Humano-Computador.

## 📜 Descrição do Projeto

O projeto "Assistente Duda" simula uma ferramenta de autoatendimento para os colaboradores da **Innovatec Soluções**, uma empresa de tecnologia fictícia. O objetivo é criar uma solução interativa e eficiente que responda às dúvidas mais comuns do departamento de Recursos Humanos, resolvendo o problema de sobrecarga da equipe de RH e a dificuldade dos colaboradores em encontrar informações de forma rápida e centralizada.

A interface foi construída com um foco rigoroso na **experiência do usuário (UX)**, **acessibilidade (A11y)** e **usabilidade**, aplicando diretamente os conceitos teóricos e as melhores práticas da área de IHC.

---

## 🚀 Principais Funcionalidades

O protótipo é totalmente funcional no front-end e inclui as seguintes características:

* **Interface de Portal Realista:** Layout completo com menu lateral fixo e cabeçalho de usuário dinâmico para criar uma experiência imersiva de portal corporativo.
* **Fluxo de Login Ilustrativo:** Uma página de login dedicada que simula a autenticação e gerencia a "sessão" do usuário através do `sessionStorage` do navegador.
* **Geração de Perfil Dinâmico:** A cada login, um perfil de colaborador aleatório é gerado (nome, cargo e avatar com gênero consistente), aumentando o realismo da simulação.
* **Navegação Guiada por Chatbot (CUI):** Interação 100% baseada em botões, com menus hierárquicos que guiam o usuário de forma intuitiva, prevenindo erros de entrada.
* **Divulgação Progressiva:** Para tópicos complexos, o chatbot oferece respostas rápidas e, adicionalmente, um botão para "Consultar Documento Detalhado", aprofundando a informação apenas para quem precisa.
* **Controles de Acessibilidade:** Um widget flutuante persistente que permite ao usuário:
    * Ajustar o tamanho da fonte.
    * Ativar um modo de Alto Contraste.
    * Acessar uma simulação de suporte a VLibras.
* **Design Responsivo:** A interface se adapta a diferentes tamanhos de tela, de desktops a dispositivos móveis.
* **Microinterações e Feedback:** Indicador de "digitando...", scroll automático, gerenciamento de foco do teclado e feedback visual em botões para uma experiência mais fluida.

---

## 📂 Estrutura do Projeto

O projeto está organizado da seguinte forma para garantir clareza e manutenibilidade:

/innovatec-chatbot
|-- assets/
|   |-- logo_innovatec.ico        # Favicon da aplicação
|   |-- vlibras_icon.png          # Ícone para o botão VLibras
|   |-- avatar_m1.jpg             # Exemplo de avatar local masculino
|   |-- avatar_f1.jpg             # Exemplo de avatar local feminino
|   |-- ...
|-- login.html                    # Página de login ilustrativa
|-- chatbot.html                  # Página principal do portal e do chatbot
|-- script.js                     # Lógica principal do chatbot (para chatbot.html)
|-- style.css                     # Folha de estilos principal para ambas as páginas

---

## 🛠️ Tecnologias Utilizadas

Este protótipo foi construído com foco nos fundamentos da web, sem o uso de frameworks externos de JavaScript.

* **HTML5:** Utilizado para a estruturação semântica do conteúdo, garantindo a acessibilidade.
* **CSS3:** Empregado para toda a estilização e responsividade, com uso de:
    * **CSS Grid Layout** para a estrutura principal.
    * **Flexbox** para alinhamentos de componentes.
    * **Variáveis CSS (Custom Properties)** para um sistema de temas (Normal e Alto Contraste).
    * **Animações e Transições** para uma interface mais fluida.
* **JavaScript (ES6+):** Utilizado para toda a lógica de interatividade, incluindo:
    * Manipulação dinâmica do DOM para criar a interface do chat.
    * Gerenciamento de estado da conversa com um objeto (`conversationMap`).
    * Uso de **`sessionStorage`** e **`localStorage`** para simular sessões e salvar preferências de acessibilidade.

---

## ⚙️ Como Executar o Protótipo

Para rodar este protótipo em sua máquina local, siga os passos abaixo:

1.  **Clone ou Baixe o Repositório:**
    * Certifique-se de que todos os arquivos (`login.html`, `chatbot.html`, `style.css`, `script.js`) e a pasta `assets` estejam no mesmo diretório.

2.  **Verifique a Pasta `assets`:**
    * Coloque o favicon (`logo_innovatec.ico`), o ícone do VLibras (`vlibras_icon.png`) e os avatares locais que você baixou (ex: `avatar_m1.jpg`, `avatar_f1.jpg`) dentro desta pasta.
    * **Importante:** Atualize os nomes dos arquivos de avatar dentro do script em `login.html` para corresponder aos arquivos que você baixou.

3.  **Use um Servidor Local:**
    * Devido às políticas de segurança dos navegadores, abrir o `login.html` diretamente do sistema de arquivos pode não funcionar corretamente. É recomendado usar um servidor local.
    * A forma mais fácil é usar a extensão **"Live Server"** no **Visual Studio Code**:
        1.  Instale a extensão "Live Server".
        2.  Abra a pasta do projeto no VS Code.
        3.  Clique com o botão direito no arquivo `login.html`.
        4.  Selecione a opção **"Open with Live Server"**.
    * Seu navegador abrirá automaticamente com o protótipo em execução.

---

## 🧠 Fundamentação em Interação Humano-Computador

Este projeto não é apenas uma aplicação funcional, mas um estudo de caso prático dos princípios de IHC.

* **Design Centrado no Usuário:** O desenvolvimento foi guiado por **Proto-Personas** e pela análise da **Jornada do Usuário**, garantindo que as funcionalidades resolvam problemas reais.
* **Usabilidade e Heurísticas de Nielsen:** A interface foi projetada para ser consistente, prevenir erros, fornecer feedback constante e dar total controle ao usuário.
* **Acessibilidade (A11y):** Acessibilidade foi um pilar central, implementada através de HTML semântico, labels acessíveis, alto contraste, gerenciamento de foco e controles de fonte, em alinhamento com as diretrizes do **eMAG** e **WCAG**.
* **Arquitetura da Informação:** A estrutura da conversa foi cuidadosamente planejada para ser intuitiva, utilizando a **Divulgação Progressiva** para não sobrecarregar o usuário.

---

## 👥 Autores

Este projeto foi desenvolvido por:

* **Leonardo Vergutz**
* **Rafael Marliere de Oliveira**
* **Enzo Henrique Ferreira Campos**

---

## 📄 Licença

Este projeto está licenciado sob a Licença MIT.
