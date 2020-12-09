<template>
  <div>
    <v-row> <v-btn v-for="(sandbox, index) in sandboxes" :key="index" :to="{ name: sandbox }"> {{ sandbox }} </v-btn> </v-row>
    Sandbox1
    
    
    <certainty-dialog yesColor="red" noColor="#006685" btnText="Slet opgave" title="Slet din opgave" subTitle="Er du sikker på du vil slette?" @confirmAsk="logConsole"></certainty-dialog>
    
    <task-dialog @handleTask="postTask" :updateBtn="true" buttonValue="mdi-pencil" :task="task"></task-dialog>

    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import CertaintyDialog from '@/components/CertaintyDialog.vue';
import TaskDialog from '@/components/TaskDialog.vue';
import { Task } from '@/components/TaskDialog.vue';

@Component({
  components: {
    CertaintyDialog,
    TaskDialog,
  }
})

export default class Sandbox1 extends Vue {
  sandboxes: string[] = ["Sandbox1", "Sandbox2", "Sandbox3"];

  task: Task = {
    title: '',
    steps: [
      { title: '', done: false },
    ],
    energyLevel: 1,
    energyOutcome: 'negative',
    startTime: '',
    finishTime: '',
    diffTime: {
      min: 0,
      hour: 0,
    },
    repeat: 'Enkeltstående',
    date: new Date().toISOString().substr(0, 10),
    category: {
      name: '',
      color: '',
    },
    note: '',
    done: false,
  }

  postTask(task: Task) {
    console.log(task);
  }

  logConsole() {
    console.log('Yes you deleted congrats');
    
  }
}
</script>
