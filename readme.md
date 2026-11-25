# 🎶 5º Encontro de Quartetos - Landing Page

Landing page oficial para o **5º Encontro de Quartetos** da Igreja Adventista do Sétimo Dia em Ibitinga/SP. O site foi desenvolvido para divulgar o evento, fornecer informações de localização, exibir os quartetos participantes e gerenciar inscrições para sorteio de brindes e pedidos de oração.

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando tecnologias web modernas e leves, sem a necessidade de frameworks complexos ou etapa de build (compilação):

*   **HTML5**: Estrutura semântica e acessível.
*   **Tailwind CSS (via CDN)**: Estilização rápida, responsiva e customizada (paleta de cores *Navy* e *Gold*).
*   **JavaScript (Vanilla)**: Lógica do contador regressivo, máscara de telefone, menu mobile e envio do formulário.
*   **Google Fonts**: Tipografia utilizando as fontes *Inter* e *Playfair Display*.
*   **FontAwesome (via CDN)**: Ícones vetoriais.
*   **Google Apps Script**: Backend *serverless* para receber os dados do formulário e salvar em uma planilha do Google Sheets.

## 📂 Estrutura de Arquivos

Para que o site funcione corretamente, a pasta do projeto deve conter os seguintes arquivos:

```text
/
├── index.html       # Arquivo principal com todo o código (HTML, CSS e JS)
├── cartaz.png       # Banner principal do evento (formato PNG)
└── README.md        # Este arquivo de documentação