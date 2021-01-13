<template>
  <v-dialog v-model="openDialog" @click:outside="closeDialog" height="600px">
    <v-card height="600px">
        <v-container>
            
            <v-row class="ma-0">
              <v-card-title class="ma-0 pa-0"> {{ task.title }} </v-card-title>
              <v-spacer></v-spacer>
              <task-dialog @handleTask="updateTask" useButton="Opdater" :task="task" :updateBtn="true" buttonValue="mdi-pencil-outline"></task-dialog>
            </v-row>

            <v-divider color="#006685"></v-divider>

            <v-row class="ma-0 my-4">
                <p> {{ task.startTime }} - {{ task.finishTime }} </p>
                <v-chip class="rounded-lg white--text mx-3" :color="task.category ? task.category.color : '#006685'"> {{ task.category ? task.category.name : 'Ingen' }} </v-chip>
                <v-chip class="rounded-lg white--text" :color="returnEnergy.color"> {{ returnEnergy.level }} </v-chip>
     
            </v-row>

            <v-row class="ma-0 my-4" v-if="task.reminder">
              <span>
                <v-icon>mdi-bell</v-icon>
                <p> {{ task.reminder }} </p>
              </span>
            </v-row>

            <v-row class="ma-0 my-4" v-if="returnRepeat"> 
              <v-icon>mdi-repeat</v-icon>
              <p class="mb-0" v-if="task.repeat == 'Daglig'">Daglig</p>
              <p class="mb-0" v-if="task.repeat == 'Ugentlig'">Ugentlig</p>
            </v-row>

            <v-col class="ma-0 my-4">
              <v-card-subtitle v-if="showSteps" class="ma-0 pa-0 font-italic">Trin</v-card-subtitle>
              <v-row class="ma-0 ml-5" v-for="(step, index) in task.steps" :key="index">
                <v-btn :color="step.done ? 'grey' : '#006685'" @click="stepDone(index, !step.done)" icon small outlined>
                  <v-icon v-if="step.done">mdi-check</v-icon>
                </v-btn>
                <p class="ml-2" :class="{ 'text-decoration-line-through': step.done}">{{ step.title }}</p>
              </v-row>
            </v-col>

            <v-col v-if="task.note">
              <v-card-subtitle class="ma-0 pa-0 font-italic">Note</v-card-subtitle>
              <v-divider></v-divider>
              <p>{{ task.note }}</p>
            </v-col>
            
            <v-row class="ma-0 my-4" justify="center">
              <v-btn outlined color="#006685" @click="closeDialog">Luk opgave</v-btn>
              <certainty-dialog @confirmAsk="deleteTask" yesColor="red" noColor="#006685" btnIcon="mdi-trash-can-outline" title="Slet din opgave" subTitle="Er du sikker på du vil slette?"></certainty-dialog>
            </v-row>

        </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang='ts'>
import { Task } from '@/lib/type';
import { Component, Prop, Vue } from 'vue-property-decorator';
import TaskDialog from '@/components/TaskDialog.vue';
import CertaintyDialog from '@/components/CertaintyDialog.vue';
import db from '@/firebase/init';

@Component({
  components: {
    TaskDialog,
    CertaintyDialog,
  }
})

export default class OpenTaskDialog extends Vue {
  @Prop({
    required: true,
  })
  openDialog!: boolean;

  @Prop({
    required: true,
  })
  task!: Task;

  openTask = this.task;

  get showSteps() {
    if (!Array.isArray(this.task.steps) || !this.task.steps.length) {
      return false;
    } else {
      return true;
    }
  }

  async updateTask(task: Task) {
    try {
      const parse = await db.collection('tasks').doc(task.id).set(task);
      console.log(parse);
    } catch (error) {
      console.error(error.message);
    }
    console.log(task);
  }

  async deleteTask() {
    this.closeDialog();
    try {
      await db.collection('tasks').doc(this.task.id).delete();
    } catch (error) {
      console.error(error);
    }
    console.log('slet opgave');
  }

  closeDialog() {
    this.$emit('closeDialog', false);
  }

  stepDone(index: number, done: boolean) {
    const steps = this.task.steps;

    steps[index].done = done;

    console.log(steps);
    
    try {
      db.collection('tasks').doc(this.task.id).update({steps: steps});
    } catch (error) {
      console.error(error);
    }
    console.log(index);
  }

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

  get returnRepeat(): boolean {
    if (this.task.repeat == 'Daglig' || this.task.repeat == 'Ugentlig') {
      return true;
    } else {
      return false;
    }
  }
}
</script>
