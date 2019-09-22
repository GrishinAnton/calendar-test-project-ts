import { Component, Prop } from 'vue-property-decorator';
import { VueComponent } from '../../shims-vue';

import './style.sass';

interface Props {
  color?: string;
  onClick?: any;
  disabled?: any;
}

@Component
export default class Button extends VueComponent<Props> {

  @Prop({ default: 'blue' }) public readonly color!: string;

  public render() {
    return (
      <button class={`btn btn_${this.color}`} onClick={() => this.$emit('click')} >
        <span>{this.$slots.default}</span>
      </button >
    );
  }
}
