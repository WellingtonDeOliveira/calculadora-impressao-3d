import { getParams, addCSV } from './storage.js'

document.getElementById('btnCalcular').onclick = async () => {
  const nome = cliente.value.trim()
  if (!nome) return alert('Informe seu nome')

  const g = +material.value
  const [h, m] = tempo.value.split(':').map(Number)
  const horas = h + m / 60

  const p = await getParams()

  const custoFil = (g / 1000) * p.filamento
  const custoEnergia = horas * (p.watts / 1000) * p.energia
  const custoTotal = custoFil + custoEnergia
  const preco = custoTotal * (1 + p.lucro / 100)

  resultado.innerText = `Preço sugerido: R$ ${preco.toFixed(2)}`

  addCSV({
    nome,
    filamento: g,
    horas: horas.toFixed(2),
    custo: custoTotal.toFixed(2),
    preco: preco.toFixed(2)
  })
}
