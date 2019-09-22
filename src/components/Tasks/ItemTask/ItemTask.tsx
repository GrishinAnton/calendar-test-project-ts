import { Component, Prop } from 'vue-property-decorator';
import { VueComponent } from '../../../shims-vue';

import './style.sass';

interface Props {
  task: object;
  onChange?: any;
}

@Component
export default class ItemTask extends VueComponent<Props> {

  @Prop()
  public readonly task!: object;

  public change(event) {
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
