<template>
  <v-row>
    <v-select v-model="item" :items="categories" label="Outlined style" outlined item-text="name">
          <template  v-slot="{ item }" >
              <v-list-item>
                    <v-list-item-content>
                        <v-list-item-icon><v-icon :color="item.color">mdi-circle</v-icon></v-list-item-icon>
                         <v-list-item-title> {{ item.name }} </v-list-item-title>
                    </v-list-item-content>
              </v-list-item>
              
          </template>
    </v-select>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class FormAddCategory extends Vue {
  @Prop({
     required: true, 
  })
  categories!: {name: string; color: string}[];
  
  item = 'Arbejde';
    
}
</script>
