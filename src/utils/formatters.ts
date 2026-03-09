export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace('/', '-')
    .replace('%', '')
}

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

export function capitalize(text: string): string {
  if (!text) return ''

  const trimmed = text.trim()
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1)
}