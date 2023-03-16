<template>
  <div class="entry-title d-flex justify-content-between p2">
    <div>
      <span class="text-success fs-5 fw-bold">14</span>
      <span class="mx-1 fs-5">Marzo</span>
      <span class="mx-2 fw-light">2023, Martes</span>
    </div>
    <div>
      <button class="btn btn-danger mx-2">
        Borrar
        <i class="fas fa-trash-alt"></i>
      </button>
      <button class="btn btn-primary">
        Subir foto
        <i class="fas fa-upload"></i>
      </button>
    </div>
  </div>
  <hr />
  <div class="d-flex flex-column px-3 h-75">
    <textarea placeholder="¿Qué sucedió hoy?"></textarea>
  </div>
  <Fab icon="fa-save" />
  <img
    src="https://cf.ltkcdn.net/es-feng-shui/images/orig/241562-1600x1030-peces-koi.jpg"
    alt="entry-picture"
    class="img-thumbnail"
  />
</template>

<script>
import { defineAsyncComponent } from "vue";
export default {
  components: {
    Fab: defineAsyncComponent(() => import("../components/Fab-button.vue")),
  },
};
</script>

<style lang="scss" scoped>
textarea {
  border: none;
  outline: none;
  resize: none;
  font-size: 20px;
  font-weight: 500;
  height: 100%;
  &:focus {
    border: none;
    outline: none;
  }
}
img {
  width: 200px;
  position: fixed;
  bottom: 150px;
  right: 20px;
  box-shadow: 0px 5px 10px rgba($color: #000, $alpha: 0.2);
}
</style>