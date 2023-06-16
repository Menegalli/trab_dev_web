<template>
  <q-layout view="lHh Lpr lFf" class="shadow-2 rounded-borders">
    <q-header elevated>
      <q-toolbar
        class="q-pa-lg"
        style="background-color: #15161d; border-bottom: solid red"
      >
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          class="menu"
        />
        <q-separator vertical dark class="q-mr-md q-ml-md" />
        <div class="row items-center q-gutter-md" style="width: 100%">
          <div
            class="col-4 col-md-auto items-center"
            style="display: flex; flex-wrap: wrap"
          >
            <q-toolbar-title class="text-h3">SNEAKERS</q-toolbar-title>
            <q-icon
              name="img:icons/nike-logo.svg"
              size="48px"
              style="fill: red"
            />
          </div>
          <div class="col-md-7 justify-center" style="display: flex">
            <q-input
              bg-color="white"
              color="black"
              rounded
              outlined
              placeholder="Search products"
              v-model="text"
              style="width: 500px"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <div class="col-md-2 justify-end" style="display: flex">
            <q-btn
              size="1.2rem"
              flat
              color="#15161d"
              round
              dense
              class="justify-center"
              aria-label="Cart"
              @click="toggleOpenCart"
            >
              <q-icon
                name="fa-solid fa-cart-shopping"
                size="sm"
                class="text-red"
              />
              <q-badge color="red" floating>{{ products.length }}</q-badge>
            </q-btn>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      behavior="desktop"
      style="background-color: #15161d; color: white"
      :show-if-above="false"
    >
      <q-list>
        <q-item-label header> Menu </q-item-label>
        <q-separator class="q-mb-md" />

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-drawer
      side="right"
      behavior="desktop"
      :show-if-above="false"
      style="background-color: #15161d"
      v-model="openCart"
    >
      <q-list>
        <q-item-label header class="text-red text-bold"> Cart </q-item-label>
        <q-separator class="q-mb-md" />
        <ProductItem v-for="p in products" v-bind:key="p.id" :product="p" />
        <q-separator class="q-mb-md" dark />
        <q-item-label
          class="text-red q-pa-md justify-start text-bold"
          style="display: flex; text-decoration: underline"
        >
          TOTAL</q-item-label
        >
        <q-item-label
          class="text-red q-pa-md justify-end text-bold"
          style="display: flex"
        >
          {{ products.length }} items in cart
          <q-space />
          {{ formatPrice(cartValue) }}</q-item-label
        >
        <q-separator class="q-mb-md" dark />
        <div class="row justify-center">
          <q-btn class="q-ma-sm" color="red" @click="saveCart()"
            >Finish Payment</q-btn
          >
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import ProductItem from "src/components/ProductItem.vue";
import { appStore } from "src/stores/appStore";
import EssentialLink from "components/EssentialLink.vue";
import Services from "src/services";
import { useQuasar } from "quasar";

const $q = useQuasar();

const linksList = [
  {
    title: "Inicio",
    caption: "Ir para a página inicial",
    icon: "home",
    link: "/",
  },
  {
    title: "Produtos",
    caption: "Ir para os Produtos",
    icon: "shopping_bag",
    link: "/",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
    ProductItem,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const openCart = ref(false);
    // const products = [];
    // var cartValue = 0.0;

    return {
      essentialLinks: linksList,
      products: appStore.cart.products,
      cartValue: appStore.cart.value,
      leftDrawerOpen,
      openCart,

      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      toggleOpenCart() {
        openCart.value = !openCart.value;
      },
      saveCart() {
        this.toggleOpenCart();
        Services.saveCart();
        this.$q.notify({
          message:
            "Payment made successfully!\nEnjoy your new sneakers, " +
            "Leonardo Menegalli" +
            "!",
          color: "positive",
          icon: "check",
        });
      },
      formatPrice(value) {
        var formatter = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
        });
        return formatter.format(value);
      },
    };
  },
});
</script>
