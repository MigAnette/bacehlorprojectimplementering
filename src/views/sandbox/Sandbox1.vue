<template>
  <div>
    <v-row> <v-btn v-for="(sandbox, index) in sandboxes" :key="index" :to="{ name: sandbox }"> {{ sandbox }} </v-btn> </v-row>
    Sandbox1
    
    
    <certainty-dialog yesColor="red" noColor="#006685" btnText="Slet opgave" title="Slet din opgave" subTitle="Er du sikker på du vil slette?" @confirmAsk="logConsole"></certainty-dialog>
    
    <task-dialog @handleTask="postTask" :updateBtn="true" buttonValue="mdi-pencil" :task="task"></task-dialog>

    <task-card @clickCheck="taskDone" :task="task"></task-card>

    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import CertaintyDialog from '@/components/CertaintyDialog.vue';
import TaskDialog from '@/components/TaskDialog.vue';
import { Task } from '@/components/TaskDialog.vue';
import TaskCard from '@/components/TaskCard.vue';

@Component({
  components: {
    CertaintyDialog,
    TaskDialog,
    TaskCard,
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
    repeat: 'Daglig',
    date: 'daglig',
    category: {
      name: 'Arbejde',
      color: '#2196F3',
    },
    done: false,
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
