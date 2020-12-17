<template>
  <v-progress-linear :elevation="24" background-color="white" height="30px" :color="barColors.color" class="rounded-pill" :value="value" rounded>
      <template v-slot:default="{ value }">
          <strong :class="barColors.text"> {{ value }}% </strong>
      </template>
  </v-progress-linear>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
})

export default class EnergyBar extends Vue {
  
  @Prop({

  })
  energySpend!: number;
  
  get value(): number {
    if (this.energySpend) {
        return 100 - this.energySpend;
    } else {
        return 100;
    }
  }

  get barColors(): { color: string; text: string } {
    if (this.value < 0 && this.value <  25) {
      this.$emit('energyIsLow', { color: '#DD2C00', low: true });
      return {
        color: '#DD2C00',
        text: 'black--text',
      };
    } else if (this.value > 25 && this.value < 50) {
      this.$emit('energyIsLow', { color: '#FFEB3B', low: true });
      return {
        color: '#FFEB3B',
        text: 'black--text',
      };
    } else if (this.value >= 50 && this.value < 55) {
      return {
        color: '#38BB52',
        text: 'black--text',
      };
    } else if (this.value > 55) {
        return {
          color: '#38BB52',
          text: 'white--text',
        };
    } else {
        return {
          color: 'black',
          text: 'white--text',
        };
    }
  }
}
</script>
