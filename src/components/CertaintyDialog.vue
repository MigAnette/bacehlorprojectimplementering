<template>
  <v-dialog v-model="dialog" persistent :max-width="400">

    <template v-slot:activator="{ on }">
        <v-btn v-on="on" icon>
          <v-icon v-if="btnIcon"> {{ btnIcon }} </v-icon>
        </v-btn>
    </template>

    <v-card>
        <v-row class="ma-0" justify="center">
            <v-card-title> {{ title }} </v-card-title>
        </v-row>

        <v-card-text>
            <p> {{subTitle}} </p>
        </v-card-text>

        <v-row class="ma-0" justify="center">
            <v-card-actions>
                <v-col>
                    <v-btn :color="yesColor" rounded class="white--text mr-4" @click="confirmDelete">Ja</v-btn>
                </v-col>
                <v-col>
                    <v-btn :color="noColor" rounded class="white--text ml-4" @click="dialog = false">Nej</v-btn>
                </v-col>
            </v-card-actions>
        </v-row>
    </v-card>

  </v-dialog>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
})

export default class CertaintyDialog extends Vue {

  dialog = false;

  confirmDelete() {
    this.$emit('confirmAsk');
    this.dialog = false;
  }

  @Prop({
    required: true,
  })
  yesColor!: string;

  @Prop({
    required: true,
  })
  noColor!: string;

  @Prop({
    required: true,
  })
  title!: string;

  @Prop({
  
  })
  btnText!: string;

  @Prop({
    
  })
  btnIcon!: string;

  @Prop({
    
  })
  subTitle!: string;
}
</script>
