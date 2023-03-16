<template>
  <button class="btn btn-primary">
    <i class="fa fa-2x "
      :class="icon"></i>
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: 'fa-plus',
    },
  },

}
</script>

<style lang="scss" scoped>
button {
  align-items: center;
  border-radius: 50%;
  bottom: 20px;
  display: flex;
  height: 50px;
  justify-content: center;
  position: fixed;
  right: 20px;
  width: 50px;

}

</style>