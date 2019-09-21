<template>
  <li class="task-item">
    <label :for="`checkbox_${task.id}`">
      <input
        type="checkbox"
        :id="`checkbox_${task.id}`"
        :checked="task.complete"
        @change="change"
      />
      <span class="checkmark"></span>
      <p class="title title_bold">
        <span>{{ task.time }} </span>
        <span>{{ task.text }}</span>
      </p>
    </label>
  </li>
</template>

<script>
import "./style.sass";
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  methods: {
    change(event) {
      this.$emit("change", { id: this.task.id, checked: event.target.checked });
    }
  }
};
</script>
