<template>
  <div class="tasks-container">
    <p class="title title_bold tasks-container_title">События</p>
    <ul class="task-items" data-cy="task-items">
      <itemTask
        v-for="task in getCurrentDateTasks"
        :task="task"
        :key="task.id"
        @change="change"
      ></itemTask>
    </ul>
    <addTask :taskState="getAddTaskState" @btnHandler="btnHandler"></addTask>
  </div>
</template>

<script>
import "./style.sass";
import itemTask from "./ItemTask/ItemTask";
import addTask from "./AddTask/AddTask";
import { isSameDay } from "date-fns";
export default {
  components: {
    itemTask,
    addTask
  },
  props: {
    tasks: {
      type: Array,
      required: true,
      default: function() {
        return [];
      }
    },
    currentDate: {
      type: Date,
      required: false
    }
  },
  computed: {
    getCurrentDateTasks() {
      return this.tasks.filter(task => isSameDay(task.date, this.currentDate));
    },
    getAddTaskState() {
      return this.$store.getters["tasks/getAddTaskState"];
    }
  },
  methods: {
    btnHandler({ event, time, text }) {
      switch (event) {
        case "addTask":
          this.$store.commit("tasks/setAddTaskState", false);
          return;
        case "cancelTask":
          this.$store.commit("tasks/setAddTaskState", true);
          return;
        case "saveTask":
          this.$store.dispatch("tasks/addTask", {
            time,
            text,
            date: this.currentDate
          });
          return;
      }
    },
    change(task) {
      this.$store.dispatch("tasks/changeTask", task);
    }
  }
};
</script>
