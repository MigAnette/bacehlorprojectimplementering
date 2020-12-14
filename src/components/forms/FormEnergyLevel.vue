<template>
  <v-row class="ma-0">
      <v-col cols="6">
        <v-text-field label="Sæt energi" @change="changeEnergyLevel" :prefix="energyPrefix" width="100" v-model="newEnergyLevel" suffix="%" outlined type="number"></v-text-field>
      </v-col>
      <v-col>
        <v-btn outlined fab small @click="changeLevel('+')" :color="plusColor"><v-icon>mdi-plus</v-icon></v-btn>
      </v-col>
      <v-col>
        <v-btn outlined fab small @click="changeLevel('-')" :color="minusColor"><v-icon>mdi-minus</v-icon></v-btn>
      </v-col>
  </v-row>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
})

export default class FormEnergyLevel extends Vue {
  @Prop({
    
  })
  changedEnergyLevel!: number;
  
  @Prop({
    
  })
  changedEnergyOutcome!: string;

  energyPrefix = '-';
  energyOutcome = this.changedEnergyOutcome;
  energyLevel = this.changedEnergyLevel;

  get newEnergyOutcome() { return this.changedEnergyOutcome }
  set newEnergyOutcome(value) { this.energyOutcome = value }

  get newEnergyLevel() { return this.changedEnergyLevel }
  set newEnergyLevel(value) { this.energyLevel = value }

  minusColor = 'grey';
  plusColor = 'grey';

  changeLevel(level: string) {
    this.energyPrefix = level;
    if (level == '+') {
      this.plusColor = '#006685';
      this.minusColor = 'grey';
      this.newEnergyOutcome = 'positive';
    } else if (level == '-') {
      this.minusColor = '#006685';
      this.plusColor = 'grey';
      this.energyOutcome = 'negative';
    }
    this.$emit('energyLevel', { energyLevel: this.energyLevel, energyOutcome: this.energyOutcome });
  }

  changeEnergyLevel() {
    this.$emit('energyLevel', { energyLevel: this.energyLevel, energyOutcome: this.energyOutcome });
  }

  created() {
    if (this.energyOutcome == 'negative' ) {
      this.minusColor = '#006685';
      this.plusColor = 'grey';
      this.energyPrefix = '-';
    } else if (this.energyOutcome == 'positive') {
      this.plusColor = '#006685';
      this.minusColor = 'grey';
      this.energyPrefix = '+';
    } else {
      this.minusColor = '#006685';
      this.plusColor = 'grey';
      this.energyPrefix = '-';
    }
  }

}
</script>
