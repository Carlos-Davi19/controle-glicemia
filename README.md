# Controle de Glicemia — versão inicial

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
