<template>
  <div>
    <v-row> <v-btn v-for="(sandbox, index) in sandboxes" :key="index" :to="{ name: sandbox }"> {{ sandbox }} </v-btn> </v-row>
    Sandbox1
    
    
    <certainty-dialog yesColor="red" noColor="#006685" btnText="Slet opgave" title="Slet din opgave" subTitle="Er du sikker på du vil slette?" @confirmAsk="logConsole"></certainty-dialog>
    
    <task-dialog :updateBtn="true" buttonValue="mdi-pencil"></task-dialog>

    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import CertaintyDialog from '@/components/CertaintyDialog.vue';
import TaskDialog from '@/components/TaskDialog.vue';

@Component({
  components: {
    CertaintyDialog,
    TaskDialog,
  }
})

export default class Sandbox1 extends Vue {
  sandboxes: string[] = ["Sandbox1", "Sandbox2", "Sandbox3"];

  logConsole() {
    console.log('Yes you deleted congrats');
    
  }
}
</script>
