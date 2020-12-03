<template>
  <v-container>
      <v-row> <v-btn v-for="(sandbox, index) in sandboxes" :key="index" :to="{ name: sandbox }"> {{ sandbox }} </v-btn> </v-row>
      Sandbox2
      <form-add-note @changeNote="changeNote" addNote="sss">

      </form-add-note>

      <form-reminder-selector @changeReminder="changeReminder" :reminders="reminders">

      </form-reminder-selector>
    
      <form-add-category :categories="categories"></form-add-category>
      
      </v-container>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import FormAddNote from '@/components/FormAddNote.vue';
import FormReminderSelector from '@/components/FormReminderSelector.vue';
import FormAddCategory from '@/components/FormAddCategory.vue';

@Component({
  components: {
    FormAddNote,
    FormReminderSelector,
    FormAddCategory,
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

}
</script>
