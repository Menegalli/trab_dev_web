// import api from "./api";
import databaseApi from "./database";
import { appStore } from "src/stores/appStore";

const services = {
  getAllProducts(callback) {
    if (appStore.products.length == 0) {
      console.log("getAllProducts zerado");

      databaseApi
        .get("/products")
        .then((response) => {
          appStore.setProducts(response.data);
          if (callback != null) {
            callback(appStore.products);
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      console.log("getAllProducts com dados");
      if (callback != null) {
        console.log("getAllProducts com dados e callback ");
        console.log(appStore.products);
        callback(appStore.products);
      } else {
        return appStore.products;
      }
    }
  },
  getUsers(callback) {
    databaseApi
      .get("/users")
      .then((response) => {
        console.log(response);
        if (callback != null) {
          callback(response);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  },
  saveCart() {
    databaseApi
      .post("/carts", {
        user_id: 1,
        cart: appStore.cart,
      })
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {
        alert(error.message);
      });
  },
  clearCart() {
    if (appStore?.cart?.products?.length != 0) {
      appStore.cart = {
        products: [],
        value: 0,
        date: "",
      };
    }
  },
  addProductToCart(product) {
    appStore.cart.products.push(product);
    appStore.cart.value += product.price;
    appStore.cart.date = new Date().toISOString();
    console.log("CART: " + JSON.stringify(appStore.cart));
  },
};

export default services;
