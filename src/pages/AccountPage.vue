<template>
  <q-page class="flex flex-center bg-grey-10">
    <div class="q-pa-md items-start justify-center items-start q-gutter-md">
      <div class="row text-h4 q-pa-lg text-weight-bold text-white">
        <div class="col-md-6 items-center justify-start">
          <p>My Account</p>
        </div>
      </div>
      <q-separator dark />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
// import Services from "src/services";

export default defineComponent({
  components: {},
  name: "AccountPage",
  data() {
    return {
      user: Object,
    };
  },
  created() {
    // Services.getAllProducts((data) => {
    //   this.products = data;
    // });
  },
});
</script>
