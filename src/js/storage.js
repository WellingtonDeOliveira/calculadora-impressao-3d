export async function getParams() {
  const local = localStorage.getItem('params')
  if (local) return JSON.parse(local)

  // fallback: carregar params.txt
  const resp = await fetch('/calculadora-impressao-3d/params.txt')
  const text = await resp.text()

  const params = {}
  text.split('\n').forEach(l => {
    const [k, v] = l.split('=')
    if (k) params[k.trim()] = Number(v)
  })

  localStorage.setItem('params', JSON.stringify(params))
  return params
}

export function saveParams(p) {
  localStorage.setItem('params', JSON.stringify(p))
}

export function addCSV(row) {
  let csv = localStorage.getItem('orcamentos')
  if (!csv) csv = 'nome,filamento,horas,custo,preco\n'

  csv += `${row.nome},${row.filamento},${row.horas},${row.custo},${row.preco}\n`
  localStorage.setItem('orcamentos', csv)
}

export function getCSV() {
  return localStorage.getItem('orcamentos') || ''
}
