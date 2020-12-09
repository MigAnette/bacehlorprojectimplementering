<template>
  <v-dialog>
    <template v-slot:activator="{ on }">
        <v-btn v-if="plusBtn" right bottom outlined icon elevation="2" v-on="on"><v-icon>{{ buttonValue }}</v-icon></v-btn>
        <v-btn v-if="updateBtn" icon v-on="on"><v-icon>{{ buttonValue }}</v-icon></v-btn>
        <a v-if="textBtn" v-on="on" class="text-decoration-underline"> {{ buttonValue }} </a>
    </template>

    <v-card>
        <v-container>

        <v-row class="ma-0" justify="end">
            <v-btn icon large><v-icon>mdi-close</v-icon></v-btn>
        </v-row>
    
        <form-title addTitle="Hej" label="Titel"></form-title>
     
        <v-row class="ma-0">
            <p>her skal form add steps være</p>
        </v-row>
        <form-energy-level :changedEnergyLevel="1" @energyLevel="changeEnergy"></form-energy-level>
     
        <form-repeat-task @changedDate="changedRepeat" @changedWeekday="changedRepeat" @chosenDaily="changedRepeat" chosenRepeat="Enkeltstående"></form-repeat-task> 
        
        <v-row class="ma-0">
            <v-col>
                <form-start-and-finish menuLabel="Start" @saveTime="saveTime"></form-start-and-finish>    
            </v-col>
            <v-col>
                <form-start-and-finish menuLabel="Slut" @saveTime="saveTime"></form-start-and-finish>    
            </v-col>    
        </v-row>

        <form-add-category @selectedCategory="sendCategory"></form-add-category>

        <form-reminder-selector @changeReminder="changeReminder"></form-reminder-selector>

        <form-add-note @changeNote="changeNote"></form-add-note>

        </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import FormTitle from '@/components/FormTitle.vue';
import FormEnergyLevel from '@/components/FormEnergyLevel.vue';
import FormRepeatTask from '@/components/FormRepeatTask.vue';
import FormStartAndFinish from '@/components/FormStartAndFinish.vue';
import FormAddCategory from '@/components/FormAddCategory.vue';
import FormReminderSelector from '@/components/FormReminderSelector.vue';
import FormAddNote from '@/components/FormAddNote.vue';

export interface Task {
  title: string;
  energyLevel: number;
  energyOutcome: string;
  repeat: string;
  date?: string;
  startTime: string;
  finishTime: string;
  amountTime: number;
  category: {
    name: string;
    color: string;
  };
  reminder?: string;
  note?: string;
}

@Component({
  components: {
    FormTitle,
    FormEnergyLevel,
    FormRepeatTask,
    FormStartAndFinish,
    FormAddCategory,
    FormReminderSelector,
    FormAddNote,
  }
})

export default class TaskDialog extends Vue {
  @Prop({
    
  })
  plusBtn!: boolean;

  @Prop({

  })
  textBtn!: boolean;

  @Prop({
    required: true,
  })
  buttonValue!: string;

  @Prop({
    
  })
  updateBtn!: boolean;

  changeEnergy(energy: { energyLevel: string; energyOutcome: string}) {
    console.log(`${energy.energyLevel} ${energy.energyOutcome}`);
  }

  changedRepeat(value: {date?: string; repeat: string}) {
    console.log(`${value.date} ${value.repeat}`);
  }

  saveTime(start: string) {
    console.log(start);
  }

  sendCategory(category: { name: string; color: string }) {
    console.log(`${category.name} ${category.color}`);
  }

  changeReminder(reminder: string){
    console.log(reminder);
  }

  changeNote(value: string) {
    console.log(value);  
  }
}
</script>
