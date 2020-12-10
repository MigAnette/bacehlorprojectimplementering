<template>
  <div>Home
    <task-dialog @handleTask="postTask" :task="task" :plusBtn="true" buttonValue="mdi-plus"></task-dialog>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import TaskDialog, { Task } from '@/components/TaskDialog.vue';
import db from '@/firebase/init';

@Component({
  components: {
    TaskDialog,
  }
})

export default class Home extends Vue {

  task: Task = {
    id: '1',
    title: '',
    steps: [],
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
    category: {},
    done: false,
  }

  async postTask(task: Task) {
    try {
      const parse = await db.collection('tasks').add(task);
      console.debug(parse)
    } catch (error) {
      console.error(error.message);
    }
    console.log(task); 
  }
}
</script>
