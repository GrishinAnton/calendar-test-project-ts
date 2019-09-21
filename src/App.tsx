import { Component, Vue } from 'vue-property-decorator';
import Calendar from "./components/Calendar/Calendar";
// import Tasks from "./components/Tasks/Tasks";


@Component
export default class App extends Vue {
  render() {
    return (
      <div id="app">
        <div class="container container_tasks">
          <Calendar
            startDate="new Date()"
          // changeMonth="changeMonth"
          // changeDay="changeDay"
          // tasks="getTasks"
          ></Calendar>
          {/* <Tasks  tasks="getCurrentDayTasks" currentDate="currentDate" /> */}
        </div>
      </div>
    )
  }
}