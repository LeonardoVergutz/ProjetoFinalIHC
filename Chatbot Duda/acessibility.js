document.addEventListener('DOMContentLoaded', () => {
    // Referências aos botões do widget
    const increaseFontBtn = document.getElementById('increase-font');
    const decreaseFontBtn = document.getElementById('decrease-font');
    const highContrastBtn = document.getElementById('high-contrast');
    const vlibrasBtn = document.getElementById('vlibras');
    const htmlEl = document.documentElement;
    const bodyEl = document.body;

    // Acessa os botões apenas se o widget existir na página
    if (increaseFontBtn && decreaseFontBtn && highContrastBtn && vlibrasBtn) {
        const FONT_STEP = 10; 
        const MIN_FONT_SIZE = 80;
        const MAX_FONT_SIZE = 160;

        // Aplica as preferências salvas no carregamento de qualquer página
        const savedFontSize = localStorage.getItem('fontSize');
        if (savedFontSize) {
            htmlEl.style.fontSize = `${savedFontSize}%`;
        }
        
        let currentFontSize = parseInt(htmlEl.style.fontSize || '100', 10);

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
        
        const savedHighContrast = localStorage.getItem('highContrast') === 'true';
        if (savedHighContrast) {
            bodyEl.classList.add('high-contrast');
        }
        highContrastBtn.addEventListener('click', () => {
            const isEnabled = bodyEl.classList.toggle('high-contrast');
            localStorage.setItem('highContrast', isEnabled);
        });
        
        vlibrasBtn.addEventListener('click', () => {
            alert(
                'Demonstração de Acessibilidade: Em uma aplicação real, este botão ativaria o conjunto de ferramentas VLibras, que realiza a tradução de textos para a Língua Brasileira de Sinais (Libras), tornando o conteúdo acessível para a comunidade surda.'
            );
        });
    }

});