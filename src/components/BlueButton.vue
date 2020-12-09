<template>
  <v-btn @click="clickButton" class="white--text" color="#006685"> {{ value }} </v-btn>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
})

export default class BlueButton extends Vue {
  @Prop({
    required: true,
  })
  value!: string;

  clickButton() {
    this.$emit('clickButton');
  }
}
</script>
