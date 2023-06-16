<template>
  <q-card class="my-card bg-grey-9 text-white">
    <q-img
      @mouseenter="isMouseOver = true"
      @mouseleave="isMouseOver = false"
      :src="`${
        isMouseOver ? product.images.detail_image : product.images.display_image
      }`"
      style="max-height: 400px; max-width: 400px"
    />
    <q-separator color="red" size="0.3rem" />
    <q-card-section class="row q-pa-sm">
      <div class="col-md-12 justify-center" style="display: flex">
        <div class="text-overline text-weight-bold">
          {{ truncate(product.name, 100) }}
        </div>
      </div>
    </q-card-section>
    <q-card-section class="row q-pa-sm">
      <div class="col-md-12 justify-center" style="display: flex">
        <div class="text-h6 text-weight-bolder" style="color: #d10024">
          {{ formatPrice(product.price) }}
        </div>
      </div>
    </q-card-section>
    <q-card-section class="row q-pa-sm">
      <div
        class="col-md-12 justify-center product-rating"
        style="display: flex"
      >
        <q-rating
          :model-value="product.rating.rate"
          max="5"
          size="1.2em"
          color="red"
          icon="star_border"
          class="product-rating-star"
          icon-selected="star"
          icon-half="star_half"
        />
      </div>
    </q-card-section>
    <q-card-section>
      <div class="text-subtitle2">{{ truncate(product.description, 500) }}</div>
    </q-card-section>

    <q-separator dark />
    <q-card-actions class="justify-center q-pa-md q-gutter-sm q-mr-sm">
      <q-btn flat rounded align="around" @click="addToCart()"
        >Add to Cart <q-icon name="fa-solid fa-cart-plus" class="q-ml-sm"
      /></q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  data() {
    return {
      isMouseOver: false,
    };
  },
  props: {
    product: Object,
    rating: Number,
    logado: Boolean,
  },
  created() {
    console.log("ProductCard: " + JSON.stringify(this.product));
  },
  methods: {
    truncate(value, length) {
      if (value.length > length) {
        return value.substring(0, length) + "...";
      } else {
        return value;
      }
    },
    formatPrice(value) {
      var formatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      });
      return formatter.format(value);
    },
    addToCart() {
      this.$emit("addToCart", this.product);
    },
  },
};
</script>

<style></style>
