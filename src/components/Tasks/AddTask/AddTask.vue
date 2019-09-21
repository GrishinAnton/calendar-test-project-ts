<template>
  <div class="add-task">
    <Button
      v-if="taskState"
      @click="$emit('btnHandler', { event: 'addTask' })"
      color="blue"
      data-cy="add-task-button"
      >Добавить</Button
    >
    <template v-else>
      <div class="add-task__parts">
        <input
          class="input"
          type="text"
          :value="time"
          @input="timeChange"
          placeholder="Время"
          data-cy="input-time"
        />
        <input
          class="input"
          :disabled="!timeValid"
          type="text"
          v-model.trim="text"
          placeholder="Текст"
          data-cy="input-text"
          @keyup.enter="saveTask"
        />

        <p v-if="errorValid">{{ errorValidationMessage }}</p>
      </div>
      <div class="add-task__control">
        <Button color="blue" @click="cancelTask">Отмена</Button>
        <Button
          :disabled="!(time && text)"
          color="blue"
          @click="saveTask"
          data-cy="save-task-button"
          >Сохранить</Button
        >
      </div>
    </template>
  </div>
</template>

<script>
import Button from "./../../../elements/Button/Button";
import "./style.sass";
import "./../../../assets/styles/elements/_input.sass";

export default {
  components: {
    Button
  },
  props: {
    taskState: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      time: "",
      text: "",
      timeValid: false,
      timeValidationPattern: /[0-2][0-9]:[0-5][0-9]/,
      errorValid: false,
      errorValidationMessage: "Формат ввода времени 01:25"
    };
  },
  methods: {
    async timeChange(e) {
      let value = e.target.value;
      this.time = value;

      function delay(ms) {
        return new Promise(resolve => {
          setTimeout(resolve, ms);
        });
      }

      try {
        let result;

        if (value.length === 5) {
          result = await delay(2000).then(() => this.timeValidation(value));
        }

        if (result) {
          this.timeValid = true;
        } else {
          this.timeValid = false;
        }
      } catch (e) {
        console.log(e);
      }
    },
    timeValidation(time) {
      let valid = this.timeValidationPattern.test(time);
      return valid;
    },
    saveTask() {
      this.$emit("btnHandler", {
        event: "saveTask",
        time: this.time,
        text: this.text
      });
      this.clear();
    },
    cancelTask() {
      this.$emit("btnHandler", { event: "cancelTask" });
      this.clear();
    },
    clear() {
      this.time = "";
      this.text = "";
      this.timeValid = false;
    }
  }
};
</script>
