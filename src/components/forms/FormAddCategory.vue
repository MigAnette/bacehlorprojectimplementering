<template>
  <v-row class="ma-0">
    <v-select v-model="category" :items="categories" label="Kategori" return-object outlined item-text="name" @change="selectedCategory">
          <template  v-slot:item="{ item, on, attrs }">
              <v-list-item v-bind="attrs" v-on="on">
                    <v-list-item-icon><v-icon :color="item.color"> mdi-circle </v-icon></v-list-item-icon>
                    <v-list-item-content>
                         <v-list-item-title> {{ item.name }} </v-list-item-title>
                    </v-list-item-content>
              </v-list-item>
          </template>

          <template v-slot:selection="{ item }">
            <v-list-item>
                    <v-list-item-icon class="my-3"><v-icon :color="item.color"> mdi-circle </v-icon></v-list-item-icon>
                    <v-list-item-content>
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
  categories: { name: string; color: string }[] = [
    { name: 'Arbejde', color: '#3F51B5' },
    { name: 'Pligter', color: '#0000ff' },
    { name: 'Fritid', color: '#C506B2' },
    { name: 'Rutine', color: '#205493' },
  ];

  @Prop({
    
  })
  categoryName!: string;
  
  @Prop({
   
  })
  chosenCategory!: {name: string; color: string};

  category = this.chosenCategory;

  selectedCategory() {
    this.$emit('selectedCategory', this.category);
  }
}
</script>
