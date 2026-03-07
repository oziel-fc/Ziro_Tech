export function formatBRL(price?: string): string {
  if (!price) return ''

  // remove tudo que não for número ou vírgula
  const numeric = price.replace(/[^\d,]/g, '')

  let [integer, decimal] = numeric.split(',')

  if (!decimal) {
    decimal = '00'
  } else if (decimal.length === 1) {
    decimal = decimal + '0'
  }

  return `R$ ${integer},${decimal}`
}