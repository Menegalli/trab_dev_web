<template>
  <q-item clickable>
    <q-item-section avatar>
      <q-icon size="64px" :name="`img:${product.images.detail_image}`">
      </q-icon>
    </q-item-section>

    <q-item-section class="text-white">
      <q-item-label class="text-bold">{{ product.name }}</q-item-label>
      <q-item-label class="text-italic text-grey" caption>{{
        truncate(product.description, 100)
      }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProductItem",
  props: {
    product: Object,
  },
  methods: {
    truncate(value, length) {
      if (value.length > length) {
        return value.substring(0, length) + "...";
      } else {
        return value;
      }
    },
  },
});
</script>
