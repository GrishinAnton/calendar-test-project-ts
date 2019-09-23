import { Component, Prop } from 'vue-property-decorator';
import { VueComponent } from '../../../shims-vue';
import Button from './../../../elements/Button/Button';
import './style.sass';
import './../../../assets/styles/elements/_input.sass';

import './style.sass';

interface Props {
  taskState: boolean;
  onBtnHandler?: any;
}

@Component
export default class AddTask extends VueComponent<Props> {

  @Prop()
  public readonly taskState!: boolean;

  public time: string = '';
  public text: string = '';
  public timeValid: boolean = false;
  public timeValidationPattern: RegExp = /[0-2][0-9]:[0-5][0-9]/;

  public async timeChange(e: { target: { value: string; }; }) {
    const value = e.target.value;
    this.time = value;

    function delay(ms: number) {
      return new Promise((resolve) => {
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
      return e;
    }
  }

  public textChange(e: { target: { value: string; }; }) {
    this.text = e.target.value;
  }

  public timeValidation(time: string) {
    const valid = this.timeValidationPattern.test(time);
    return valid;
  }

  public saveTaskOnEnter(e: { charCode: number; }) {
    if (e.charCode === 13) {
      this.saveTask();
    }
    return;
  }

  public saveTask() {

    this.$emit('btnHandler', {
      event: 'saveTask',
      time: this.time,
      text: this.text,
    });
    this.clear();
  }

  public cancelTask() {
    this.$emit('btnHandler', { event: 'cancelTask' });
    this.clear();
  }

  public clear() {
    this.time = '';
    this.text = '';
    this.timeValid = false;
  }

  public render() {
    let container;

    if (this.taskState) {
      container = <Button
        onClick={() => this.$emit('btnHandler', { event: 'addTask' })}
        color='blue'
        data-cy='add-task-button'
      >Добавить</Button>;
    } else {
      container =
      <div>
        <div class='add-task__parts'>
          <input
            class='input'
            type='text'
            onValue={this.time}
            onInput={this.timeChange}
            placeholder='Время'
            data-cy='input-time'
          />
          <input
            class='input'
            disabled={!this.timeValid}
            type='text'
            onValue={this.text}
            onInput={this.textChange}
            placeholder='Текст'
            data-cy='input-text'
            onKeypress={this.saveTaskOnEnter}
        />
            </div>
        <div class='add-task__control'>
          <Button
            color='blue'
            onClick={this.cancelTask}>Отмена</Button>
        < Button
              disabled={!(this.time && this.text)}
              color='blue'
              onClick={this.saveTask}
              data-cy='save-task-button'
              >Сохранить</Button>
          </div>
      </div>;

    }

    return (
      <div class='add-task'>
        { container }
      </div >
    );
  }
}
