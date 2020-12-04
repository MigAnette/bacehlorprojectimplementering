<template>
  <v-row>
      <v-col cols="5">
        <v-text-field :prefix="energyPrefix" width="100" v-model="energyLevel" suffix="%" outlined type="number"></v-text-field>
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
import { Component, Vue } from 'vue-property-decorator';

@Component({
})

export default class FormEnergyLevel extends Vue {
  energyPrefix = '-';
  energyLevel = '1';

  minusColor = 'grey';
  plusColor = 'grey';

  changeLevel(level: string) {
    this.energyPrefix = level;
    if (level == '+') {
      this.plusColor = '#006685';
      this.minusColor = 'grey';
    } else if (level == '-') {
      this.minusColor = '#006685';
      this.plusColor = 'grey';
    }
  }

  created() {
    if (this.energyPrefix == '-') {
      this.minusColor = '#006685';
      this.plusColor = 'grey';
    } else if (this.energyPrefix == '+') {
      this.plusColor = '#006685';
      this.minusColor = 'grey';
    }
  }

}
</script>
