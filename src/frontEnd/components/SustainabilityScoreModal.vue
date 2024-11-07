<template>
  <div class="card flex justify-center">
    <Dialog
      v-bind:visible="visible"
      modal
      :header="getHeader"
      :style="{ width: '40rem', height: '25rem' }"
      dismisableMask="true"
    >
      
      <div v-if="scores">
        <ChartData :sustainabilityScores="scores" :company="getCompany"/>
      </div>
      <div class=" gap-2">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="$emit('close')"></Button>
      </div>
    </Dialog>
  </div>
</template>

<script>
import axios from "axios";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import ChartData from "./ChartData.vue";

export default {
  components: {
    Dialog,
    Button,
    ChartData
  },
  props: ["company", "visible"],
  data() {
    return {
      scores: null
    };
  },
  computed: {
    getHeader() {
      return `${this.company.data.company} Sustainability Scores`;
    },
    getCompany(){
      return this.company.data.company
    }
  },
  async created() {
    const response = await axios.get(
      `http://localhost:3000/investments?company=${this.company.data.company}`
    );
    this.scores = response.data[0].sustainabilityScore;
  },
};
</script>
