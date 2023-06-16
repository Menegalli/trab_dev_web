<template>
  <q-page class="flex flex-center bg-grey-10">
    <div class="q-pa-md items-start justify-center items-start q-gutter-md">
      <div class="row text-h4 q-pa-lg text-weight-bold text-white">
        <div class="col-md-6 items-center justify-start">
          <p class="items-center">
            NEW PRODUCTS <q-icon name="img:icons/jordan-logo.svg" size="48px" />
          </p>
        </div>
        <div
          class="col-md-6 text-h6 justify-end items-center"
          style="display: flex"
        >
          <a class="q-mr-md active" href="#">Latest</a>
          <a class="q-mr-md hover-underline" href="#">Popular</a>
          <a class="q-mr-md hover-underline" href="#">Lowest Price</a>
        </div>
      </div>
      <q-separator dark />
      <div class="row">
        <div
          v-for="p in products"
          v-bind:key="p.id"
          class="col-xs-8 col-sm-4 col-md-2 q-pa-md"
        >
          <ProductCard
            :product="p"
            :rating="p.rating.rate"
            @addToCart="onAddToCart"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import Services from "src/services";
import ProductCard from "src/components/ProductCard.vue";

export default defineComponent({
  components: { ProductCard },
  name: "IndexPage",
  data() {
    return {
      products: Array,
    };
  },
  created() {
    Services.getAllProducts((data) => {
      this.products = data;
    });
  },
  methods: {
    onAddToCart(product) {
      Services.addProductToCart(product);
    },
  },
});
</script>
