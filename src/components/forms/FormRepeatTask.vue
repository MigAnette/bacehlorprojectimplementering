<template>
  <v-row class="ma-0">
      
      <v-select label="Gentag" @change="chosenDaily" v-model="selectedRepeat" outlined :items="repeats"></v-select>

      <!-- SingleEvent hooked up to 'Enkeltstående' -->
      <single-event v-if="selectedRepeat == 'Enkeltstående'" :chosenSingleDate="chosenDay" @changedDate="changedDate"></single-event>

      <!-- A select to select which day of the week, weekly task should be on -->
      <v-select @change="changeWeekday" label="Vælg Dag" v-if="selectedRepeat == 'Ugentlig'" :items="weekDays" v-model="selectedWeekday"></v-select>

  </v-row>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import SingleEvent from '@/components/repeatTask/SingleEvent.vue';

@Component({
  components: {
    SingleEvent,
  }
})
export default class FormRepeatTask extends Vue {

  @Prop({
    
  })
  chosenDay!: string;

  @Prop({
  
  })
  chosenRepeat!: string;

  weekDays: string[] = [ "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag" ];
  selectedWeekday = this.chosenDay;

  repeats: string[] = [ "Enkeltstående", "Daglig", "Ugentlig" ];
  selectedRepeat = this.chosenRepeat;

  changedDate(date: string) {
    this.$emit('changedDate', { date: date, repeat: this.selectedRepeat });
    console.log(`FormRepeatTask ${date}`);
  }

  changeWeekday() {
    this.$emit('changedWeekday', { date: this.selectedWeekday, repeat: this.selectedRepeat });
    console.log(`FormRepeatTask ${this.selectedWeekday} ${this.selectedRepeat}`);
  }

  chosenDaily() {
    if (this.selectedRepeat == 'Daglig') {
      this.$emit('chosenDaily', { date: 'daglig', repeat: 'Daglig' });
    }
  }

}
</script>
