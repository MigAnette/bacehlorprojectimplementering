<template>
  <v-card rounded class="rounded-lg" :color="taskColor" :style="{ 'border': cardBorder }" @click="clickCard">
        <v-row class="ma-0">
            <v-card-title class="pl-2 py-0 ma-0 subtitle-1 white--text font-weight-medium"> {{ task.title }} </v-card-title>
            <v-icon color="white" v-if="task.reminder">mdi-bell</v-icon>
            <v-icon color="white" v-if="returnRepeat">mdi-repeat</v-icon>
            <v-spacer></v-spacer>
            <v-card-subtitle class="ma-0 pr-2 pa-0 white--text"> {{ task.category.name }} </v-card-subtitle>
        </v-row>

      <!-- The white part of the card begins here: -->
      <v-sheet class="rounded-b-lg roundCard">
        <v-row class="ma-0">
            <v-col class="pa-2">
              <!-- Checkmark button -->
              <v-card-actions>
                <v-btn outlined icon @click.stop="clickCheck"><v-icon v-if="done">mdi-check</v-icon></v-btn>
              </v-card-actions>
            </v-col>

            <!-- Starttime and hours or minutes are here -->
            <v-col class="pa-0" v-if="showTime.time">           
                <p class="mb-0 mt-0"> {{ task.startTime }} </p>
                <p class="mb-0" v-if="showTime.diffTime"> {{ returnTime }} </p>
            </v-col>

            <!-- Shows steps if there are steps -->
            <v-col>
                <p v-if="showSteps">
                    <v-icon>mdi-check-circle</v-icon>
                    <span> {{ returnSteps }} </span>
                </p>
            </v-col>

            <!-- Energylevel -->
            <v-col>
                <v-chip class="rounded-md white--text" :color="returnEnergy.color"> {{ returnEnergy.level }} </v-chip>
            </v-col>

        </v-row>
      </v-sheet>

  </v-card>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Task } from '@/lib/type';

@Component({
})

export default class TaskCard extends Vue {
  @Prop({

  })
  task!: Task;

  /**
   * Used to change the done field. 
   */
  done = false;

  /**
   * The color of the task is added here, to make it possible to change the color when the checkmark has been checked.
   */
  taskColor = this.task.category.color ? this.task.category.color : '#006685';

  /**
   * The cardborder is made to be able to change the color dynamically.
   * It has been but in the inline style of the card.
   */
  cardBorder = `3px solid ${this.taskColor}`;

  /**
   * Created is used here to change the color if the task is done. 
   * Its basically a failsafe in case the grey doesnt stick the first time.
   */
  created() {
    if (this.task.done == true) {
      this.taskColor = 'grey';
      this.done = this.task.done;
    } 
  }

  /**
   * clickCheck changes the color and the done, and emits the boolean.
   */
  clickCheck() {
    this.done = !this.done;
    if (this.done == true) {
      this.taskColor = 'grey';
    } else {
      this.taskColor = this.task.category.color ? this.task.category.color : '#006685';
    }
    this.$emit('clickCheck', this.done);
    // console.log(this.done);
    
  }

  /**
   * sending the task back in emit to be able to send through clicked card, if needed.
   */
  clickCard() {
    this.$emit('clickCard', this.task);
    console.log(`klikket ${this.task.id}`);
  }

  /**
   * Checks to show the element if either Daglig or Ugenlig is in repeat.
   */
  get returnRepeat(): boolean {
    if (this.task.repeat == 'Daglig' || this.task.repeat == 'Ugentlig') {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Checks to show steps elements if there are more than 1 or 1. 
   */
  get showSteps(): boolean {
    if (this.task.steps.length >= 1) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Checks to see what the energyotucome is and returns an object with the "correct" color and proper 
   * string decorations.
   */
  get returnEnergy(): { color: string; level: string } {
    if (this.task.energyOutcome == 'negative') {
        return {
          color: '#cd2026',
          level: `- ${this.task.energyLevel}%`,
        }
    } else if (this.task.energyOutcome == 'positive') {
        return {
          color: '#2e8540',
          level: `+ ${this.task.energyLevel}%`,
        }
    } else {
        return {
          color: '',
          level: '',
        }
    }
  }

  /**
   * A for each on steps checks each step to see if it is done.
   * If it is the doneStep is added with 1.
   * and then showing the done step next to the length of the steps array.
   */
  get returnSteps() {
    let doneStep = 0;
    this.task.steps.forEach(step => {
      if (step.done == true) {
        doneStep += 1;  
      }
    });
    return `${doneStep}/${this.task.steps.length}`;
  }

  /**
   * returns the time, if hour is 0 it returns the min. Otherwise it returns the hour.
   */
  get returnTime() {
    if (this.task.diffTime.hour == 0) {
      return `${this.task.diffTime.min} min`;
    } else {
      return `${this.task.diffTime.hour} timer`;
    }
  }

  get showTime() {
    if (this.task.startTime && this.task.finishTime) {
      return {
        time: true,
        diffTime: true,
      };
    } else if (this.task.finishTime == '') {
      return {
        time: true,
        diffTime: false,
      };
    } else {
      return {
        time: false,
        diffTime: false,
      };
    }
  }
}
</script>