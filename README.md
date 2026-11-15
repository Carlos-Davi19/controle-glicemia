# Controle de Glicemia

## O que esta versão faz
- Registra e salva automaticamente as seis medições principais por data.
- Registra medições adicionais com horário e observação.
- Destaca valores iguais ou superiores a 180 mg/dL.
- Destaca diferenças absolutas superiores a 30 mg/dL entre antes e 2h após café, almoço e jantar.
- Exibe uma tabela mensal e permite imprimir ou salvar como PDF pelo navegador.
- Exporta/importa backup JSON.
- Mantém os dados localmente no navegador, sem conta e sem enviar medições a um servidor.

## Limitações desta entrega
Esta é uma versão inicial de aplicativo web instalável (PWA), não um aplicativo publicado na App Store. A instalação no iPhone requer disponibilizar os arquivos em hospedagem HTTPS. O arquivo `sw.js` habilita cache para uso offline após a primeira visita, sujeito às regras do Safari/iOS. O armazenamento local é específico do navegador e do aparelho; faça backups regulares.

## Como hospedar
1. Extraia os arquivos.
2. Publique a pasta em uma hospedagem estática HTTPS (por exemplo, GitHub Pages ou serviço semelhante).
3. Abra o endereço no Safari do iPhone.
4. No Safari, toque em Compartilhar → Adicionar à Tela de Início.
5. Abra o ícone adicionado para usar como aplicativo.

## Como usar
- Preencha a data e as medições.
- Toque em “Salvar medições”.
- Para medições extras, toque em “+ Adicionar medição”, preencha horário, valor e observação. Horário e valor válidos são salvos automaticamente.
- Abra “Relatório mensal”, escolha o mês e toque em “Imprimir / PDF”.
- Use “Exportar backup JSON” para guardar uma cópia dos dados.

## Aviso
Os critérios de destaque (≥180 mg/dL e diferença >30 mg/dL) são apenas regras visuais solicitadas para organização. Não constituem diagnóstico nem recomendação clínica.

## Atualização da versão
A versão atual adiciona carregamento automático ao selecionar a data e salvamento automático das medições principais e extras válidas.


## Versão 3.0
- Identificação visível da versão no cabeçalho.
- Salvamento automático das medições principais ao digitar e ao alterar o campo.
- Carregamento automático dos registros ao selecionar outra data.
- Service worker atualizado para invalidar o cache das versões anteriores.

## Versão 4.0
- Permite alternar entre Carlos e Rosana, mantendo registros separados por pessoa.
- Migra automaticamente os registros da versão 3 para Carlos, sem apagar o histórico existente.
- Importa planilhas Excel (.xlsx/.xls) usando as abas mensais no formato MMYYYY e os seis campos principais.
- Mescla dados importados somente em campos ainda vazios; registros já preenchidos no app são preservados.
- Backup JSON inclui os dados de ambos. A restauração mescla os dados sem substituir registros existentes.
- O leitor Excel é carregado de CDN e requer conexão com a internet no momento da importação.

## Versão 5.0
### Insulina (NPH e Rápida, em UI)
- Campos de NPH e Rápida em cada medição principal, exceto “2h após o jantar” (última do dia, antes de dormir), que não tem aplicação.
- Aceita decimais com vírgula ou ponto (ex.: 7,5). Valores fora de 0–300 UI são marcados em vermelho e não são salvos.
- As medições adicionais também aceitam NPH e Rápida (para aplicações fora dos horários fixos).
- Total de insulina por dia no resumo da data e no relatório mensal.

### Relatório mensal / impressão
- Mesma tabela na tela e no papel, em A4 paisagem, com cabeçalho repetido se houver mais de uma página.
- Lista todos os dias do mês (com dia da semana e fins de semana sombreados), deixando em branco os dias sem registro — dá para anotar à mão.
- Destaques ≥180 mg/dL e diferença “antes → 2h após” superior a 30 mg/dL impressa abaixo do valor (legível mesmo em impressora preto e branco).
- Linha de médias, tabela por horário (nº, média, mín., máx., ≥180), variação por refeição e totais/médias de insulina.
- Opção “Abrir relatório em nova aba” como alternativa caso o diálogo de impressão não abra no iPhone.
- Exportação para Excel (uma aba por mês no formato MMAAAA + aba de adicionais), compatível com a importação do próprio app.

### Backup
- No iPhone, “Exportar backup” abre o menu Compartilhar (Salvar em Arquivos, iCloud Drive, WhatsApp, e-mail).
- Aviso quando o último backup tem mais de 7 dias.
- Restauração corrigida: agora mescla campo a campo (antes, um dia já existente no aparelho ignorava todo o dia do backup) e não duplica medições adicionais ao restaurar o mesmo arquivo duas vezes.
- Opção “Substituir tudo por um backup” e “Desfazer última restauração” (cópia de segurança automática antes de restaurar).
- O app pede ao navegador armazenamento persistente para reduzir o risco de os dados serem apagados automaticamente.

### Outras correções
- Medições adicionais salvas voltam a aparecer para edição/exclusão ao reabrir a data.
- Service worker passa a buscar a versão nova primeiro (as atualizações chegam ao iPhone na próxima abertura com internet).
- A biblioteca de Excel só é carregada quando necessária (o app abre mais rápido e funciona offline).
- Dados das versões anteriores são lidos sem nenhuma conversão manual.

## Versão 5.1
- Novo horário de aplicação **“Antes de dormir”** (somente insulina, sem medição).
- **Esquema de insulina por pessoa**, no Registro diário: marque em quais horários há aplicação e de qual insulina (NPH e/ou Rápida). Padrão: NPH e Rápida antes do café, do almoço, do jantar e antes de dormir. As medições 2h após as refeições ficam sem aplicação.
- Quando o médico mudar a prescrição, basta alterar o esquema. Os registros antigos não se perdem: se um dia tem valor num horário que saiu do esquema, o campo continua aparecendo naquele dia e no relatório do mês.
- O relatório mensal e o Excel montam as colunas de insulina conforme o esquema e os dados do mês.
- O esquema é salvo no backup e restaurado com ele.
- Correção: ao trocar de pessoa ou de data com um campo ainda em edição, o valor podia ser gravado na pessoa ou data errada. Agora cada tela grava sempre na pessoa e na data em que foi aberta.

## Versão 5.2
- **Impressão no iPhone:** o botão “Gerar PDF (imprimir / enviar)” cria um arquivo PDF de verdade dentro do app (sem internet e sem bibliotecas externas) e abre o menu Compartilhar, com Imprimir, o app da impressora (ex.: HP Smart), Salvar em Arquivos, WhatsApp e e-mail.
  - Motivo: no app instalado na tela de início, o iOS não abre o diálogo de impressão da página, e a “nova aba” gerava uma página HTML, formato que apps de impressora como o HP Smart não aceitam.
- Mesmo layout do relatório anterior: A4 paisagem, mês completo, destaques, médias, resumo por horário, insulina por horário e total, e medições adicionais. Páginas numeradas.
- “Imprimir pelo navegador” continua disponível para uso no computador.

## Versão 5.3
- Backup manual simplificado para o OneDrive (via “Salvar em Arquivos”), sem login nem cadastro na Microsoft.
- Aviso de backup configurável: todo dia (padrão), a cada 3 ou a cada 7 dias. O aviso tem o botão “Fazer backup agora”.
- Um arquivo por dia (backup-glicemia-AAAA-MM-DD.json): salvar de novo no mesmo dia substitui o arquivo, e os dias anteriores ficam como histórico.
- Passo a passo “Como salvar no OneDrive (primeira vez)” no próprio app.
