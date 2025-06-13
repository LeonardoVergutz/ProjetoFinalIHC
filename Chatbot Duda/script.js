document.addEventListener('DOMContentLoaded', () => {
    // ---- VERIFICAÇÃO DE AUTENTICAÇÃO ----
    const userProfileString = sessionStorage.getItem('innovatec_user_profile');
    
    if (!userProfileString && window.location.pathname.includes('chatbot.html')) {
        window.location.href = 'login.html';
        return; 
    }

    const usuario = userProfileString ? JSON.parse(userProfileString) : null;

    // ---- LÓGICA DE ACESSIBILIDADE (INTEGRADA) ----
    const increaseFontBtn = document.getElementById('increase-font');
    const decreaseFontBtn = document.getElementById('decrease-font');
    const highContrastBtn = document.getElementById('high-contrast');
    const vlibrasBtn = document.getElementById('vlibras');
    const htmlEl = document.documentElement;
    const bodyEl = document.body;

    if (increaseFontBtn) { // Verifica se os botões existem na página
        const FONT_STEP = 10; 
        const MIN_FONT_SIZE = 80;
        const MAX_FONT_SIZE = 160;

        let currentFontSize = parseInt(localStorage.getItem('fontSize') || '100', 10);
        htmlEl.style.fontSize = `${currentFontSize}%`;
        const isHighContrast = localStorage.getItem('highContrast') === 'true';
        if (isHighContrast) { bodyEl.classList.add('high-contrast'); }

        increaseFontBtn.addEventListener('click', () => {
            if (currentFontSize < MAX_FONT_SIZE) {
                currentFontSize += FONT_STEP;
                htmlEl.style.fontSize = `${currentFontSize}%`;
                localStorage.setItem('fontSize', currentFontSize);
            }
        });
        decreaseFontBtn.addEventListener('click', () => {
            if (currentFontSize > MIN_FONT_SIZE) {
                currentFontSize -= FONT_STEP;
                htmlEl.style.fontSize = `${currentFontSize}%`;
                localStorage.setItem('fontSize', currentFontSize);
            }
        });
        highContrastBtn.addEventListener('click', () => {
            const isEnabled = bodyEl.classList.toggle('high-contrast');
            localStorage.setItem('highContrast', isEnabled);
        });
        vlibrasBtn.addEventListener('click', () => {
            alert( 'Demonstração de Acessibilidade: Em uma aplicação real, este botão ativaria o conjunto de ferramentas VLibras, que realiza a tradução de textos para a Língua Brasileira de Sinais (Libras), tornando o conteúdo acessível para a comunidade surda.');
        });
    }

    // ---- LÓGICA DO CHATBOT ----
    let chatBody, interactionAreaContainer, userHeader, userNameDisplay, userRoleDisplay, userAvatar, homeButton;

    if (window.location.pathname.includes('chatbot.html') && usuario) {
        chatBody = document.getElementById('chat-body');
        interactionAreaContainer = document.getElementById('interaction-container'); 
        userHeader = document.getElementById('user-header');
        userNameDisplay = document.getElementById('user-name-display');
        userRoleDisplay = document.getElementById('user-role-display');
        userAvatar = document.getElementById('user-avatar');
        homeButton = document.getElementById('home-button');

        if (homeButton) {
            homeButton.addEventListener('click', () => navigateToNode('new_flow'));
        }
    }
    
    const conversationMap = {}; 
    
    function setupUserProfile() {
        if (usuario && userNameDisplay) { 
            userNameDisplay.textContent = usuario.name;
            userRoleDisplay.textContent = usuario.role;
            userAvatar.style.backgroundImage = `url('${usuario.avatar}')`;
            userHeader.classList.remove('hidden');
        }
    }

    function scrollToBottom() {
        setTimeout(() => { if (chatBody) chatBody.scrollTop = chatBody.scrollHeight; }, 50);
    }
    
    function showTypingIndicator() {
        if (!interactionAreaContainer) return;
        const oldIndicator = interactionAreaContainer.querySelector('.typing-indicator-wrapper');
        if (oldIndicator) oldIndicator.remove();
        const typingWrapper = document.createElement('div');
        typingWrapper.classList.add('typing-indicator-wrapper');
        const typingElement = document.createElement('div');
        typingElement.classList.add('message', 'bot-message', 'typing-indicator'); 
        typingElement.setAttribute('aria-label', 'Duda está digitando');
        typingElement.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
        typingWrapper.appendChild(typingElement);
        const currentNav = interactionAreaContainer.querySelector('nav#interaction-area');
        if (currentNav) currentNav.innerHTML = ''; 
        interactionAreaContainer.appendChild(typingWrapper);
        scrollToBottom();
    }

    function hideTypingIndicator() {
        if (!interactionAreaContainer) return;
        const typingIndicator = interactionAreaContainer.querySelector('.typing-indicator-wrapper');
        if (typingIndicator) {
            typingIndicator.remove(); 
        }
    }

    function addMessage(text, sender, iconName = null) {
        if (!chatBody) return;
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message', `${sender}-message`);
        let messageContentHTML = '';
        if (sender === 'bot' && iconName) {
            messageContentHTML = `<span class="material-symbols-outlined bot-icon" aria-hidden="true">${iconName}</span><div class="message-content"><p>${text}</p></div>`;
        } else if (sender === 'user') {
            messageContentHTML = `<div class="message-content"><p>${text}</p></div><span class="material-symbols-outlined user-icon" aria-hidden="true">account_circle</span>`;
        } else {
            messageContentHTML = `<div class="message-content"><p>${text}</p></div>`;
        }
        messageContainer.innerHTML = messageContentHTML;
        chatBody.appendChild(messageContainer);
        scrollToBottom();
    }
    
    function navigateToNode(nodeKey) {
        if (!interactionAreaContainer || !conversationMap) return;
        if (nodeKey === 'new_flow') { if (chatBody) chatBody.innerHTML = ''; navigateToNode('start'); return; }
        if (nodeKey === 'logout') { sessionStorage.removeItem('innovatec_user_profile'); window.location.href = 'login.html'; return; }

        const node = { ...conversationMap[nodeKey] }; 
        if (!node) { console.error(`Nó não encontrado: ${nodeKey}`); return; }

        if (nodeKey === 'start' && usuario) {
            const firstName = usuario.name.split(' ')[0];
            if (chatBody && chatBody.children.length === 0) {
                 node.message = `Olá, ${firstName}! Sou a Duda, sua parceira digital na Innovatec. É um prazer ajudar. Selecione um tópico abaixo.`
            } else {
                 node.message = `Em que mais posso ajudar, ${firstName}? Selecione uma opção.`
            }
        }
        
        showTypingIndicator(); 

        setTimeout(() => {
            hideTypingIndicator(); 
            interactionAreaContainer.innerHTML = ''; 

            let buttonNavArea = document.createElement('nav');
            buttonNavArea.id = 'interaction-area';
            buttonNavArea.classList.add('interaction-area');
            interactionAreaContainer.appendChild(buttonNavArea);

            if (node.message) { addMessage(node.message, 'bot', node.icon || 'chat_bubble'); }
            
            if (node.title) {
                const titleElement = document.createElement('h2');
                titleElement.classList.add('interaction-title');
                titleElement.textContent = node.title;
                buttonNavArea.appendChild(titleElement);
            }
            if (node.options) {
                node.options.forEach((option, index) => {
                    const button = document.createElement('button');
                    button.classList.add('action-btn');
                    if (option.nextNode === 'start' || option.text.toLowerCase().includes('voltar') || option.nextNode === 'new_flow') { 
                        button.classList.add('secondary'); 
                    }
                    button.textContent = option.text;
                    button.addEventListener('click', () => {
                        addMessage(option.text, 'user');
                         navigateToNode(option.nextNode);
                    });
                    buttonNavArea.appendChild(button);
                    
                    if (index === 0 && document.activeElement !== homeButton) { 
                        setTimeout(() => button.focus(), 100); 
                    }
                });
            }
            scrollToBottom();
        }, 1200); 
    }
    
    const getEndFlowOptions = (previousInfoNode, documentLinkNode = null) => {
        const options = [
            { text: "Voltar para informações anteriores", nextNode: previousInfoNode },
            { text: "Ver outros assuntos", nextNode: "new_flow" }, 
            { text: "Encerrar Sessão (Sair)", nextNode: "logout" }
        ];
        if (documentLinkNode) {
            options.unshift({ text: `Consultar Documento Detalhado`, nextNode: documentLinkNode.node});
        }
        return options;
    };
    Object.assign(conversationMap, {
        'start': { icon: 'support_agent', message: "...", options: [{ text: "Salários e Pagamentos", nextNode: "pagamentos_menu" }, { text: "Férias e Ausências", nextNode: "ausencias_menu" }, { text: "Benefícios Corporativos", nextNode: "beneficios_menu" }, { text: "Rotinas e Ferramentas", nextNode: "diaadia_menu" }, { text: "Normas e Documentos", nextNode: "normas_menu" }] },
        'pagamentos_menu': { icon: 'account_balance_wallet', title: "Salários e Pagamentos", message: "Entendido. O que você gostaria de saber sobre pagamentos?", options: [{ text: "Consultar Holerite", nextNode: "holerite_info" }, { text: "Datas de Pagamento", nextNode: "salario_info" }, { text: "Voltar ao Menu Principal", nextNode: "new_flow" }] },
        'holerite_info': { icon: 'receipt_long', message: "Seu holerite da Innovatec é enviado automaticamente para seu e-mail corporativo todo dia 28. O histórico completo está no Portal do Colaborador.", options: getEndFlowOptions('pagamentos_menu', {node: 'holerite_doc_link'}) },
        'salario_info': { icon: 'today', message: "Nosso ciclo de pagamento se encerra no dia 25, e o salário é depositado no 5º dia útil do mês seguinte.", options: getEndFlowOptions('pagamentos_menu', {node: 'salario_politica_link'}) },
        'holerite_doc_link': { icon: 'picture_as_pdf', message: "Para um guia detalhado sobre como interpretar seu holerite, acesse: Intranet > Documentos > RH > 'Entendendo seu Holerite.pdf'.", options: getEndFlowOptions('holerite_info')},
        'salario_politica_link': { icon: 'description', message: "A Política Salarial completa da Innovatec, incluindo progressões e faixas, está em: Intranet > Documentos > RH > 'Política Salarial Vigente.docx'.", options: getEndFlowOptions('salario_info')},
        'ausencias_menu': { icon: 'event_busy', title: "Férias e Ausências", message: "Certo. Qual informação sobre ausências você precisa?", options: [{ text: "Férias (saldo e agendamento)", nextNode: "ferias_info" }, { text: "Licenças (maternidade, etc.)", nextNode: "licencas_info" }, { text: "Calendário de Feriados", nextNode: "feriados_info" }, { text: "Voltar ao Menu Principal", nextNode: "new_flow" }] },
        'ferias_info': { icon: 'beach_access', message: "Seu saldo de férias pode ser consultado em tempo real no Portal do Colaborador. O agendamento deve ser solicitado por lá com, no mínimo, 30 dias de antecedência.", options: getEndFlowOptions('ausencias_menu', {node: 'ferias_politica_link'}) },
        'licencas_info': { icon: 'escalator_warning', message: "Nossa política de licenças (maternidade, paternidade, médica, etc.) está detalhada no 'Manual do Colaborador'.", options: getEndFlowOptions('ausencias_menu', {node: 'licencas_manual_link'}) },
        'feriados_info': { icon: 'calendar_month', message: `O calendário completo com feriados e pontes para ${new Date().getFullYear()} está fixado no canal #comunicados e na intranet.`, options: getEndFlowOptions('ausencias_menu') }, 
        'ferias_politica_link': { icon: 'description', message: "A Política de Férias completa, com todas as regras e prazos, está disponível em: Intranet > Documentos > RH > 'Política de Férias Innovatec.pdf'.", options: getEndFlowOptions('ferias_info')},
        'licencas_manual_link': { icon: 'menu_book', message: "O capítulo sobre Licenças e Afastamentos do Manual do Colaborador pode ser encontrado em: Intranet > Documentos > RH > 'Manual do Colaborador - Cap 5.pdf'.", options: getEndFlowOptions('licencas_info')},
        'beneficios_menu': { icon: 'volunteer_activism', title: "Gestão de Benefícios", message: "Ótimo! Nossos benefícios são um grande diferencial. Sobre qual deles você quer saber?", options: [{ text: "Plano de Saúde e Odontológico", nextNode: "saude_info" }, { text: "Vale-Transporte", nextNode: "vt_info" }, { text: "Vale-Refeição/Alimentação", nextNode: "vr_info" }, { text: "Voltar ao Menu Principal", nextNode: "new_flow" }] },
        'saude_info': { icon: 'health_and_safety', message: "A gestão do plano (inclusão de dependentes, busca de rede, etc.) é feita diretamente pelo aplicativo da operadora.", options: getEndFlowOptions('beneficios_menu', {node: 'saude_manual_link'}) },
        'vt_info': { icon: 'tram', message: "O Vale-Transporte é creditado no seu cartão todo dia 30. Para alterar o valor, preencha o formulário na intranet até o dia 20.", options: getEndFlowOptions('beneficios_menu', {node: 'vt_politica_link'}) },
        'vr_info': { icon: 'restaurant', message: "O crédito do VR/VA é feito todo dia 30. O extrato e o saldo podem ser consultados no aplicativo oficial do cartão.", options: getEndFlowOptions('beneficios_menu', {node: 'vr_regras_link'}) },
        'saude_manual_link': { icon: 'health_and_safety', message: "O manual completo do seu Plano de Saúde e Odontológico, com toda a cobertura e rede credenciada, está em: Intranet > Benefícios > 'Manual Plano de Saúde Innovatec.pdf'.", options: getEndFlowOptions('saude_info')},
        'vt_politica_link': { icon: 'tram', message: "A Política de Vale-Transporte, com regras de elegibilidade e uso, está disponível em: Intranet > Benefícios > 'Política de VT.pdf'.", options: getEndFlowOptions('vt_info')},
        'vr_regras_link': { icon: 'restaurant', message: "As regras e dicas de uso do Vale-Refeição/Alimentação podem ser encontradas em: Intranet > Benefícios > 'Guia VR-VA Innovatec.pdf'.", options: getEndFlowOptions('vr_info')},
        'diaadia_menu': { icon: 'devices', title: "Rotinas e Ferramentas", message: "Informações úteis para o seu dia a dia de trabalho.", options: [{ text: "Ponto Eletrônico e Banco de Horas", nextNode: "ponto_info" }, { text: "Reembolso de Despesas (Viagens)", nextNode: "reembolso_info" }, { text: "Voltar ao Menu Principal", nextNode: "new_flow" }] },
        'ponto_info': { icon: 'schedule', message: "O registro de ponto é feito pelo aplicativo oficial. Esquecimentos devem ser justificados ao seu gestor em até 48h.", options: getEndFlowOptions('diaadia_menu', {node: 'ponto_normas_link'}) },
        'reembolso_info': { icon: 'airplane_ticket', message: "A política de reembolso está na intranet. As solicitações são feitas via sistema, com upload das notas fiscais.", options: getEndFlowOptions('diaadia_menu', {node: 'reembolso_politica_link'}) },
        'ponto_normas_link': { icon: 'rule', message: "As Normas do Ponto Eletrônico e a Política de Banco de Horas estão detalhadas em: Intranet > Documentos > RH > 'Normas de Ponto e Banco de Horas.pdf'.", options: getEndFlowOptions('ponto_info')},
        'reembolso_politica_link': { icon: 'travel_explore', message: "A Política de Reembolso de Despesas de Viagem completa, com limites e procedimentos, está em: Intranet > Financeiro > 'Política de Viagens e Reembolsos.pdf'.", options: getEndFlowOptions('reembolso_info')},
        'normas_menu': { icon: 'gavel', title: "Normas e Documentos", message: "Acesse rapidamente nossos documentos mais importantes.", options: [{ text: "Consultar Manual do Colaborador", nextNode: "manual_info" }, { text: "Código de Conduta", nextNode: "conduta_info" }, { text: "Voltar ao Menu Principal", nextNode: "new_flow" }] },
        'manual_info': { icon: 'menu_book', message: "A versão mais atualizada do Manual do Colaborador está disponível para download na página principal da nossa intranet.", options: getEndFlowOptions('normas_menu', {node: 'manual_download_link'}) }, 
        'conduta_info': { icon: 'groups', message: "Nosso Código de Conduta e Ética é a base da nossa cultura. Ele está disponível na intranet para consulta.", options: getEndFlowOptions('normas_menu', {node: 'conduta_download_link'}) },
        'manual_download_link': { icon: 'download_for_offline', message: "Para baixar o Manual do Colaborador completo, acesse: Intranet > Documentos > 'Manual_Colaborador_Innovatec_vFinal.pdf'.", options: getEndFlowOptions('manual_info')},
        'conduta_download_link': { icon: 'download_for_offline', message: "O Código de Conduta e Ética pode ser baixado em: Intranet > Compliance > 'Codigo_Conduta_Innovatec.pdf'.", options: getEndFlowOptions('conduta_info')},
        'end_chat': { icon: 'celebration', message: "Pronto para a próxima dúvida? Se precisar de algo mais, é só usar as opções abaixo.", options: [ { text: "Nova Consulta", nextNode: "new_flow" }, { text: "Sair (Logout)", nextNode: "logout" }] },
        'logout': {}, 
        'new_flow': {} 
    });
    
    if (window.location.pathname.includes('chatbot.html') && usuario) {
        setupUserProfile();
        navigateToNode('start');
    }
});