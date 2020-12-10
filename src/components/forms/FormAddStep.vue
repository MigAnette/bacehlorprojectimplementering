<template>
  <div>
    <v-row v-for="(step, index) in steps" class="ma-0" :key="index" justify="center" align-content="center">
        <v-text-field class="pt-2" prepend-icon="mdi-checkbox-blank-circle-outline" label="Tilføj Trin" @change="editStep(index)" v-model="step.title">
            <template v-slot:append>
                <v-btn small icon color="red" @click="removeStep(index)"><v-icon>mdi-trash-can-outline</v-icon></v-btn>
            </template>
        </v-text-field>
    </v-row>
    
    <v-btn small icon outlined @click="addStep"><v-icon>mdi-plus</v-icon></v-btn>

  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
})

export default class FormAddStep extends Vue {

  @Prop({

  })
  taskSteps!: { title: string; done: boolean }[];

  steps: { title: string; done: boolean }[] = this.taskSteps;

  addStep() {
    const step = {
      title: '',
      done: false,
    };

    this.steps.push(step);
  }

  editStep(index: number) {
    this.$emit('changeSteps', this.steps);
    console.log(index + ' ' + this.steps[index].title);
  }

  removeStep(index: number) {
    this.$emit('changeSteps', this.steps);
    this.steps.splice(index, 1);
  }
}
</script>
