<template>
  <v-dialog v-model="openDialog" @click:outside="closeDialog">
    <v-card>
        <v-container>
            
            <v-row class="ma-0">
              <v-card-title class="ma-0 pa-0"> {{ task.title }} </v-card-title>
              <v-spacer></v-spacer>
              <task-dialog :task="task" :updateBtn="true" buttonValue="mdi-pencil-outline"></task-dialog>
            </v-row>

            <v-divider color="#006685"></v-divider>

            <v-row class="ma-0">
              <p> {{ task.startTime }} - {{ task.finishTime }} </p>
              <v-chip class="rounded-lg white--text" :color="returnCategory.color"> {{ returnCategory.name }} </v-chip>
              <v-chip class="rounded-lg white--text" :color="returnEnergy.color"> {{ returnEnergy.level }} </v-chip>
            </v-row>

            <v-row class="ma-0" v-if="task.reminder">
              <span>
                <v-icon>mdi-bell</v-icon>
                <p> {{ task.reminder }} </p>
              </span>
            </v-row>

            <v-row class="ma-0" v-if="returnRepeat"> 
              <v-icon>mdi-repeat</v-icon>
              <p class="mb-0" v-if="task.repeat == 'Daglig'">Daglig</p>
              <p class="mb-0" v-if="task.repeat == 'Ugentlig'">Ugentlig</p>
            </v-row>

            <v-col class="ma-0">
              <v-card-subtitle class="ma-0 pa-0 font-italic">Trin</v-card-subtitle>
              <v-row class="ma-0 ml-5" v-for="(step, index) in task.steps" :key="index">
                <v-btn icon small outlined :color="step.done ? 'grey' : '#006685'" @click="stepDone(index, step.done)"><v-icon v-if="step.done">mdi-check</v-icon></v-btn>
                <p :class="{ 'text-decoration-line-through': step.done}">{{ step.title }}</p>
              </v-row>
            </v-col>

            <v-col v-if="task.note">
              <v-card-subtitle class="ma-0 pa-0 font-italic">Note</v-card-subtitle>
              <v-divider></v-divider>
              <p>{{ task.note }}</p>
            </v-col>

            <v-row class="ma-0">
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

  deleteTask() {
    this.closeDialog();
    console.log('slet opgave');
  }

  closeDialog() {
    this.$emit('closeDialog', false);
  }

  stepDone(index: number, done: boolean) {
    this.$emit('stepDone', {index: index, done: !done}); // this should be changed for database update
    console.log(index);
  }

  get returnCategory() {
    if (this.task.category.color == undefined && this.task.category.name == undefined) {
        return {
          name: 'Ingen',
          color: '#006685',
        }
    } else {
        return {
          name: this.task.category.name,
          color: this.task.category.color,
        }
    }
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
