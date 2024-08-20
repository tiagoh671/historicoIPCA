const dados = require('../dados/dados.js')

let historico = dados.historicoInflacao


const buscarHistorico = () =>{
  return historico
}

const filtrarAno = (valorBusca)=>{
  return historico.filter(valor => valor.ano == valorBusca)
}

function calculaIPCA(valor, dataInicialMes, dataInicialAno, dataFinalMes, dataFinalAno) {
  const historicoFiltrado = historico.filter(
    historico => {
      if (dataInicialAno === dataFinalAno) {
        return historico.ano === dataInicialAno && historico.mes >= dataInicialMes && historico.mes <= dataFinalMes;
      } else {
        return (
          (historico.ano === dataInicialAno && historico.mes >= dataInicialMes) ||
          (historico.ano > dataInicialAno && historico.ano < dataFinalAno) ||
          (historico.ano === dataFinalAno && historico.mes <= dataFinalMes)
        );
      }
    }
  );

  let taxasMensais = 1;
  for (const elemento of historicoFiltrado) {
    taxasMensais *= (elemento.ipca / 100) + 1;
  }

  const resultado = valor * taxasMensais;
  return parseFloat(resultado.toFixed(2));
}

function validacaoErro(valor, dataInicialMes, dataInicialAno, dataFinalMes, dataFinalAno){
  const anoLimiteFinal = historico[historico.length - 1].ano;
  const anoLimiteInicial = historico[0].ano
  const mesLimiteFinal = historico[historico.length - 1].mes;
  if (
    isNaN(valor) ||
    isNaN(dataInicialMes) ||
    isNaN(dataInicialAno) ||
    isNaN(dataFinalMes) ||
    isNaN(dataFinalAno) ||
    dataInicialMes < 1 || dataInicialMes > 12 ||
    dataInicialAno < anoLimiteInicial || dataInicialAno > anoLimiteFinal ||
    dataFinalMes < 1 || dataFinalMes > 12 ||
    dataFinalAno < anoLimiteInicial || dataFinalAno > anoLimiteFinal ||
    (dataFinalAno === anoLimiteFinal && dataFinalMes > mesLimiteFinal) ||
    dataFinalAno < dataInicialAno ||
    (dataFinalAno == dataInicialAno && dataFinalMes < dataInicialMes)
  ) {
    return true;
  } else {
    return false;
  }
}

function buscarId(id){
  return historico.find(valor => valor.id === id)
}


exports.validacaoErro = validacaoErro
exports.buscarId = buscarId
exports.buscarHistorico = buscarHistorico
exports.filtrarAno = filtrarAno
exports.calculaIPCA = calculaIPCA
