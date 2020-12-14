<template>
  <div>
    <v-row> <v-btn v-for="(sandbox, index) in sandboxes" :key="index" :to="{ name: sandbox }"> {{ sandbox }} </v-btn> </v-row>
    Sandbox1
    
    
    <certainty-dialog yesColor="red" noColor="#006685" btnText="Slet opgave" title="Slet din opgave" subTitle="Er du sikker på du vil slette?" @confirmAsk="logConsole"></certainty-dialog>
    
    <task-dialog @handleTask="postTask" :updateBtn="true" buttonValue="mdi-pencil" :task="task"></task-dialog>

    <task-card @clickCard="openDialog" class="mb-7" @clickCheck="taskDone" :task="task"></task-card>
    <open-task-dialog @closeDialog="closeDialog" @stepDone="stepDone" :task="openTask" :openDialog="dialog"></open-task-dialog>

    <v-card class="pa-2" color="#006685">
      <energy-bar @energyIsLow="showText" :energySpend="60"></energy-bar>
      <v-row v-if="showWarning">
        <v-icon :color="colorIcon">mdi-exclamation-thick</v-icon>
        <p>Warning take care of yourself today</p>
      </v-row>
    </v-card>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import CertaintyDialog from '@/components/CertaintyDialog.vue';
import TaskDialog from '@/components/TaskDialog.vue';
import { Task } from '@/lib/type';
import TaskCard from '@/components/TaskCard.vue';
import EnergyBar from '@/components/EnergyBar.vue';
import OpenTaskDialog from '@/components/OpenTaskDialog.vue';

@Component({
  components: {
    CertaintyDialog,
    TaskDialog,
    TaskCard,
    EnergyBar,
    OpenTaskDialog,
  }
})

export default class Sandbox1 extends Vue {
  sandboxes: string[] = ["Sandbox1", "Sandbox2", "Sandbox3"];

  task: Task = {
    id: '2',
    title: 'Lav hjemmeside',
    steps: [
      { title: 'Trin 1', done: false },
      { title: 'Trin 2', done: true },
    ],
    energyLevel: 36,
    energyOutcome: 'negative',
    startTime: '09:00',
    finishTime: '15:01',
    diffTime: {
      min: 1,
      hour: 6,
    },
    repeat: 'Ugentlig',
    date: 'Mandag',
    category: {
      name: 'Arbejde',
      color: '#2196F3',
    },
    done: false,
  }

  stepDone(step: { index: number; done: boolean}) {
    this.task.steps[step.index].done = step.done;
  }

  showWarning = false;
  colorIcon = '';

  dialog = false;
  openTask = {};
  openDialog(task: Task) {
    this.dialog = true;
    this.openTask = task;
    console.log(this.openTask);
  }

  closeDialog(close: boolean) {
    this.dialog = close;
  }

  showText(energy: { color: string; low: boolean }) {
    this.showWarning = energy.low;
    this.colorIcon = energy.color;
    console.log(`${energy.color} ${energy.low}`);
  }

  taskDone(done: boolean) {
    this.task.done = done;
    console.log(done);
  }

  postTask(task: Task) {
    console.log(task);
  }

  logConsole() {
    console.log('Yes you deleted congrats');
    
  }
}
</script>
