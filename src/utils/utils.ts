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

  const firstPrice = price.split('-')[0]?.trim() || ''

  const numeric = firstPrice.replace(/[^\d,]/g, '')

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

// Guarantee the text will end with ':'
export const ensureTrailingColon = (text) => {
  if (!text) return '';

  const trimmedText = text.trim();

  return trimmedText.endsWith(':') ? trimmedText : `${trimmedText}:`;
};

export function extractTechnicalSpecs(text: string): string[] {
  if (!text || typeof text !== 'string') return []

  const lines = text.split('\n').map(line => line.trim())

  const startIndex = lines.findIndex(line =>
    line.toLowerCase().includes('especificações técnicas')
  )

  const endIndex = lines.findIndex(line =>
    line.toLowerCase().includes('conteúdo da embalagem')
  )

  if (startIndex === -1 || endIndex === -1) return []

  const specsLines = lines.slice(startIndex + 1, endIndex)

  const cleanedSpecs = specsLines
    .map(line => line.replace(/•/g, '').trim())
    .filter(line => line.length > 0)

  return cleanedSpecs
}

export interface ProductSimple {
    shopee: {
      name: string;
      category: string;
      subcategory: string;
      price: string;
      stock: number;
      images: string[];
    } | null;
  }