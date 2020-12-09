<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on }">
        <v-btn v-if="plusBtn" right bottom outlined icon elevation="2" v-on="on"><v-icon>{{ buttonValue }}</v-icon></v-btn>
        <v-btn v-if="updateBtn" icon v-on="on"><v-icon>{{ buttonValue }}</v-icon></v-btn>
        <a v-if="textBtn" v-on="on" class="text-decoration-underline"> {{ buttonValue }} </a>
    </template>

    <v-card>
        <v-container>

        <v-row class="ma-0" justify="end" @click="dialog = false">
            <v-btn icon large><v-icon>mdi-close</v-icon></v-btn>
        </v-row>
    
        <v-form>

            <!-- Title -->
            <form-title @changeTitle="changeTitle" :addTitle="changedTask.title" label="Titel"></form-title>
        
            <!-- Steps -->
            <v-row class="ma-0">
                <p>her skal form add steps være</p>
            </v-row>

            <!-- Energy -->
            <form-energy-level :changedEnergyLevel="changedTask.energyLevel" :changedEnergyOutcome="changedTask.energyOutcome" @energyLevel="changeEnergy"></form-energy-level>
        
            <!-- Repeat -->
            <form-repeat-task @changedDate="changedRepeat" @changedWeekday="changedRepeat" @chosenDaily="changedRepeat" :chosenDay="task.date" chosenRepeat="Enkeltstående"></form-repeat-task> 
            
            <!-- Start and Finish -->
            <v-row class="ma-0">
                <v-col>
                    <form-start-and-finish menuLabel="Start" :addTime="changedTask.startTime" @saveTime="startTime"></form-start-and-finish>    
                </v-col>
                <v-col>
                    <form-start-and-finish menuLabel="Slut" :addTime="changedTask.finishTime" @saveTime="finishTime"></form-start-and-finish>    
                </v-col>    
            </v-row>

            <!-- Category -->
            <form-add-category :chosenCategory="changedTask.category" @selectedCategory="sendCategory"></form-add-category>

            <!-- Reminder -->
            <form-reminder-selector @changeReminder="changeReminder"></form-reminder-selector>

            <!-- Note -->
            <form-add-note :addNote="changedTask.note" @changeNote="changeNote"></form-add-note>
        </v-form>

        <v-row class="ma-0" justify="center">
            <blue-button @clickButton="handleTask" value="Opret"></blue-button>
        </v-row>

        </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import BlueButton from '@/components/BlueButton.vue';
import FormTitle from '@/components/FormTitle.vue';
import FormEnergyLevel from '@/components/FormEnergyLevel.vue';
import FormRepeatTask from '@/components/FormRepeatTask.vue';
import FormStartAndFinish from '@/components/FormStartAndFinish.vue';
import FormAddCategory from '@/components/FormAddCategory.vue';
import FormReminderSelector from '@/components/FormReminderSelector.vue';
import FormAddNote from '@/components/FormAddNote.vue';

export interface Task {
  title: string;
  steps: { title: string; done: boolean }[];
  energyLevel: number;
  energyOutcome: string;
  repeat: string;
  date?: string;
  startTime: string;
  finishTime: string;
  diffTime: {
    min: number;
    hour: number;
  };
  category: {
    name: string;
    color: string;
  };
  reminder?: string;
  note?: string;
  done: boolean;
}

@Component({
  components: {
    BlueButton,
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
  dialog = false;
  @Prop({
    required: true,
  })
  task!: Task;

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

  changedTask: Task = this.task;

  handleTask() {
    this.$emit('handleTask', this.changedTask);
    this.dialog = false;
    console.log(this.changedTask);
  }

  /**
   * Title
   * Changes the title
   */
  changeTitle(title: string) {
    this.changedTask.title = title;
    console.log(title);
  }

  /**
   * Energy
   * Changes level and outcome
   */
  changeEnergy(energy: { energyLevel: number; energyOutcome: string}) {
    this.changedTask.energyLevel = energy.energyLevel;
    this.changedTask.energyOutcome = energy.energyOutcome;
    console.log(`${energy.energyLevel} ${energy.energyOutcome}`);
  }

  /**
   * Repeat
   * Changes repeat and date
   */
  changedRepeat(value: {date?: string; repeat: string}) {
    this.changedTask.repeat = value.repeat;
    this.changedTask.date = value.date;
    console.log(`${value.date} ${value.repeat}`);
  }

  /**
   * Start Time
   * Changes the start time 
   */
  startTime(start: string) {
    this.changedTask.startTime = start;
    console.log(start);
  }

  /**
   * Finish Time
   * Changes the finish time
   * 
   * Also calculates the amount of time from start to finsih
   */
  finishTime(finish: string) {
    this.changedTask.finishTime = finish;
    console.log(finish);

    /**
     * Getting hours from the chosen time:
     */
    const timeStart = new Date("01/01/2020 " + this.changedTask.startTime).getHours();
    const timeEnd = new Date("01/01/2020 " + finish).getHours();

    /**
     * Getting Minutes from the chosen time:
     */
    const minStart = new Date("01/01/2020 " + this.changedTask.startTime).getMinutes();
    const minEnd = new Date("01/01/2020 " + finish).getMinutes();

    /**
     * Calculating the difference in time:
     */
    let minDiff = minEnd - minStart;
    let hourDiff = timeEnd - timeStart;

    /**
     * Checking if mins and hous is less than 0,
     * to add 24 hour ekstra to ensure correct return
     */
    if (minDiff < 0) {
      minDiff = 24 + minDiff;
    }

    if (hourDiff < 0) {
        hourDiff = 24 + hourDiff;
    }

    /**
     * Changing min and hour in task to show on task element.
     */
    this.changedTask.diffTime.min = minDiff;
    this.changedTask.diffTime.hour = hourDiff;

    console.log(`${timeStart} ${timeEnd} ${hourDiff}`);
    console.log(`${minStart} ${minEnd} ${minDiff}`);
  }

  /**
   * Category
   * Changing name and color
   */
  sendCategory(category: { name: string; color: string }) {
    this.changedTask.category.name = category.name;
    this.changedTask.category.color = category.color;
    console.log(`${category.name} ${category.color}`);
  }

  /**
   * Reminder
   * Changes the reminder
   */
  changeReminder(reminder: string){
    this.changedTask.reminder = reminder;
    console.log(reminder);
  }

  /**
   * Note
   * Changes the note
   */
  changeNote(note: string) {
    this.changedTask.note = note;
    console.log(note);  
  }
}
</script>