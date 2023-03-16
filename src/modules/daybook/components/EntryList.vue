<template>
  <div class="entry-list-container">
    <div class="px-2 pt-2">
        <input type="text"
        class="form-control"
        placeholder="Buscar entradas"/>

    </div>
    <div class="entry-scrollarea">
        <Entry v-for="item in 100" :key="item"
        >Entry</Entry>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
export default {
    components: {
        Entry: defineAsyncComponent(() => import("./Entry-single.vue"))
    },


}
</script>

<style lang="scss" scoped>
input {
    border: none;
    border-bottom: 1px solid #2c3e50;
    background-color: transparent;
    color: #2c3e50;
}
.entry-list-container {
    border-right: 1px solid #2c3e50;
    height: calc(100vh - 56px);

}
.entry-scrollarea {
    height: calc(100vh - 110px);
    overflow: scroll;
}
</style>

