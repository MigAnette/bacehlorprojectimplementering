<template>
  <div>
    <v-card class="pa-2" color="#006685">
      <v-row class="ma-0">
        <v-card-title class="white--text pa-0 pb-1 ma-0">Godmorgen</v-card-title>
      </v-row>
      <v-row class="ma-0">
          <energy-bar @energyIsLow="showText" :energySpend="energyExpenditure"></energy-bar>
      </v-row>
      <v-row v-if="showWarning">
        <v-icon :color="colorIcon">mdi-exclamation-thick</v-icon>
        <p class="white--text">Warning take care of yourself today</p>
      </v-row>
    </v-card>
    <task-dialog useButton="Opret" @handleTask="postTask" :task="task" :plusBtn="true" buttonValue="mdi-plus"></task-dialog>

    <task-card @clickCard="openDialog" class="my-3" v-for="task in tasks" :key="task.id" :task="task"></task-card>
    <open-task-dialog @closeDialog="closeDialog" :task="openTask" :openDialog="dialog"></open-task-dialog>

  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import TaskDialog from '@/components/TaskDialog.vue';
import { Task } from '@/lib/type';
import db from '@/firebase/init';
import TaskCard from '@/components/TaskCard.vue';
import EnergyBar from '@/components/EnergyBar.vue';
import OpenTaskDialog from '@/components/OpenTaskDialog.vue';

@Component({
  components: {
    TaskDialog,
    TaskCard,
    EnergyBar,
    OpenTaskDialog,
  }
})

export default class Home extends Vue {
  showWarning = false;
  colorIcon = '';

  dialog = false;
  openTask = {};

  showText(energy: { color: string; low: boolean }) {
    this.showWarning = energy.low;
    this.colorIcon = energy.color;
    console.log(`${energy.color} ${energy.low}`);
  }

  openDialog(task: Task) {
    this.dialog = true;
    this.openTask = task;
    console.log(this.openTask);
  }

  closeDialog(close: boolean) {
    this.dialog = close;
  }

  tasks: Task[] = [];

  task: Task = {
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

  get energyExpenditure() {
    let sum = 0;
    this.tasks.forEach(task => {
      if (task.energyOutcome == 'negative') {
        sum += Number(task.energyLevel);
      } else if (task.energyOutcome == 'positive') {
        sum -= Number(task.energyLevel);
      }
    })
    return sum;
  }

  today = new Date().toISOString().substr(0, 10);
  day = new Date().getDay();

  get weekday() {
    if (this.day == 1) {
      return 'Mandag';
    } else if (this.day == 2) {
      return 'Tirsdag';
    } else if (this.day == 3) {
      return 'Onsdag';
    } else if (this.day == 4) {
      return 'Torsdag';
    } else if (this.day == 5) {
      return 'Fredag';
    } else if (this.day == 6) {
      return 'Lørdag';
    } else if (this.day == 7) {
      return 'Søndag';
    } else {
      return '';
    }
  }

  async getTasksData() {
    db.collection("tasks")
    .where("date", "in", [this.today, "daglig", this.weekday])
    .onSnapshot(
      snapshot => {
        const queryTasks: Task[] = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          data.id = doc.id;
          queryTasks.push(data as Task);
        });
        this.tasks = queryTasks;
      },
      error => {
        console.log(error);
      }
    )
  }

  created() {
    this.getTasksData();
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
