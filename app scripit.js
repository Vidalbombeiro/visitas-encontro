/**
 * Recebe os dados do formulário HTML (via FormData) e grava na aba "Inscritos_Brinde"
 * Colunas (6 no total):
 * A: Data/Hora
 * B: Nome Completo
 * C: Telefone
 * D: Apoio Espiritual
 * E: Pedido / Observação
 * F: Status Sorteio ("Pendente")
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetName = "Inscritos_Brinde";
    let sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      sheet.appendRow([
        "Data/Hora",
        "Nome Completo",
        "Telefone",
        "Apoio Espiritual",
        "Pedido / Observação",
        "Status Sorteio"
      ]);
    }

    // ===== PARSING ROBUSTO =====
    let params = {};
    if (e && e.parameter && Object.keys(e.parameter).length > 0) {
      params = e.parameter;
    } else if (e && e.postData && e.postData.contents) {
      try { params = JSON.parse(e.postData.contents); } catch (_) {}
    }

    const nome            = String(params.nome || "").trim();
    const telefone        = String(params.telefone || "").trim();
    const telefoneNumeros = telefone.replace(/\D/g, "");
    const interesse       = String(params.interesse || "Apenas participar do brinde").trim();
    const mensagem        = String(params.mensagem || "").trim();

    // ===== VALIDAÇÃO =====
    if (!nome || telefoneNumeros.length < 10) {
      return ContentService.createTextOutput("INVALIDO");
    }

    // ===== DUPLICIDADE (coluna C = 3) =====
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      const existing = sheet
        .getRange(2, 3, lastRow - 1, 1)
        .getValues()
        .flat()
        .map(v => String(v).replace(/\D/g, ""));
      if (existing.includes(telefoneNumeros)) {
        return ContentService.createTextOutput("DUPLICADO");
      }
    }

    // ===== GRAVAÇÃO (6 colunas) =====
    sheet.appendRow([
      new Date(),       // A: Data/Hora
      nome,             // B: Nome Completo
      telefone,         // C: Telefone
      interesse,        // D: Apoio Espiritual
      mensagem,         // E: Pedido / Observação
      "Pendente"        // F: Status Sorteio
    ]);

    // Replica a validação (dropdown) da célula F2 para a nova linha
    const newRow = sheet.getLastRow();
    if (newRow > 2) {
      const rule = sheet.getRange("F2").getDataValidation();
      if (rule) {
        sheet.getRange(newRow, 6).setDataValidation(rule);
      }
    }

    return ContentService.createTextOutput("OK");
  } catch (err) {
    return ContentService.createTextOutput("ERRO: " + err.message);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService.createTextOutput("API 5º Encontro de Quartetos ativa.");
}