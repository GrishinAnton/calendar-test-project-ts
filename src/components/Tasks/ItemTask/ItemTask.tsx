import { Component, Prop } from 'vue-property-decorator';
import { VueComponent } from '../../../shims-vue';
// import Types from '../../../lib/type/type'

import './style.sass';

interface Task { id: string; time: string; text: string; complete: boolean; date: Date; }

interface Props {
  task: Task;
  onChange?: any;
}

@Component
export default class ItemTask extends VueComponent<Props> {

  @Prop()
  public readonly task!: Task;

  public change(event: { target: { checked: boolean; }; }) {
    this.$emit('change', { id: this.task.id, checked: event.target.checked });
  }

  public render() {

    return (
      <li class='task-item'>
        <label for={`checkbox_${this.task.id}`}>
          <input
              type='checkbox'
              id={`checkbox_${this.task.id}`}
              checked={this.task.complete}
              onChange={this.change}
          />
          <span class='checkmark'></span>
            <p class='title title_bold'>
              <span>{ this.task.time } </span>
              <span>{ this.task.text }</span>
            </p>
        </label>
      </li >
    );
  }
}
