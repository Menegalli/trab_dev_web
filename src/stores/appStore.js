import { defineStore } from "pinia";
const useAppStore = defineStore("app", {
  state: () => ({
    cart: {
      products: [],
      value: 0,
      date: "",
    },
    loggedClient: null,
    products: [],
  }),
  actions: {
    addProduct(product) {
      this.products.push(product);
    },
    setProducts(products) {
      this.products = products;
    },
    cartClean() {
      this.cart = {
        products: [],
        value: 0,
        date: "",
      };
    },
    setCartClient(client) {
      this.cart.client = client;
    },
    addProductToCart(product) {
      this.cart.products.push(product);
    },
  },
});

export const appStore = useAppStore();
