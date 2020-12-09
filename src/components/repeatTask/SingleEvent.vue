<template>
  <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            :value="date"
            label="Vælg dato"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          locale="da"
          no-title
          scrollable
          type="date"
          @change="pickDate"
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
})
export default class SingleEvent extends Vue {
  @Prop({
    
  })
  chosenSingleDate!: string;

  menu = false;
  date =  this.chosenSingleDate;

  pickDate() {
    this.$emit('changedDate', this.date);
    console.log(`SingleEvent ${this.date}`);
  }
  
}
</script>
