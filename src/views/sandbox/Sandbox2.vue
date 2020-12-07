<template>
  <v-container>
      <v-row> <v-btn v-for="(sandbox, index) in sandboxes" :key="index" :to="{ name: sandbox }"> {{ sandbox }} </v-btn> </v-row>
      Sandbox2
      <form-add-note @changeNote="changeNote" addNote="sss">

      </form-add-note>

      <form-reminder-selector @changeReminder="changeReminder" :reminders="reminders">

      </form-reminder-selector>
    
      <form-add-category @selectedCategory="selectedCategory" :chosenCategory="categories[1]" categoryName="Tilføj kategori" :categories="categories"></form-add-category>
      
      <form-repeat-task :chosenRepeat="'Enkeltstående'" @chosenDaily="chosenDaily" @changedDate="changedDate" @changedWeekday="changedWeekday"></form-repeat-task>

      </v-container>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import FormAddNote from '@/components/FormAddNote.vue';
import FormReminderSelector from '@/components/FormReminderSelector.vue';
import FormAddCategory from '@/components/FormAddCategory.vue';
import FormRepeatTask from '@/components/FormRepeatTask.vue';

@Component({
  components: {
    FormAddNote,
    FormReminderSelector,
    FormAddCategory,
    FormRepeatTask,
    }
})
export default class Sandbox2 extends Vue {

  sandboxes: string[] = ["Sandbox1", "Sandbox2", "Sandbox3"];
  
  reminders: string[] = ["I dag", "I morgen", "Næste uge", 'Tilpas'];

  categories: {name: string; color: string}[]=[
    {name: 'Arbejde', color: 'blue'},
    {name: 'Pligter', color: 'magenta'},
    {name: 'Fritid', color: 'green'},
    {name: 'Eventyr', color: 'yellow'},
  ]

  changeNote(note: string){
    console.log(`test ${note}`);
  }
  changeReminder(item: string){
    console.log(`test ${item}`);
  }

  selectedCategory(category: { name: string; color: string }) {
    console.log(`${category.name} ${category.color}`);
  }

  changedDate(date: { date: string; repeat: string }) {
    console.log(`sandbox ${date.date} ${date.repeat}`);
  }

  changedWeekday(week: { weekday: string; repeat: string }) {
    console.log(`sandbox ${week.weekday} ${week.repeat}`);
    
  }

  chosenDaily(repeat: string) {
    console.log(`sandbox ${repeat}`);
    
  }

}
</script>
