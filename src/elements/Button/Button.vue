<template>
  <button :class="`btn btn_${color}`" @click="$emit('click')">
    <span><slot /></span>
  </button>
</template>

<script>
import "./style.sass";
export default {
  props: {
    color: {
      type: String,
      required: false,
      default: "blue"
    }
  }
};
</script>
