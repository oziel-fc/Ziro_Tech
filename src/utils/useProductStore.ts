import { ref } from "vue";

interface ProductSimple {
  shopee: {
    name: string;
    category: string;
    subcategory: string;
    price: string;
    images: string[];
  } | null;
}

export const DataProducts = ref<ProductSimple[]>([]);
export const isLoading = ref(false);

export const loadData = async () => {
  if (DataProducts.value.length > 0) return;

  isLoading.value = true

  try {
    const url = 'https://raw.githubusercontent.com/oziel-fc/products_ziro/refs/heads/master/products.json';
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Erro na requisição');
    
    const rawJSON = await response.json();
    
    DataProducts.value = rawJSON;
    // console.log(DataProducts)
  } catch (err) {
    console.error("Error while searching for JSON: ", err);
  }
};