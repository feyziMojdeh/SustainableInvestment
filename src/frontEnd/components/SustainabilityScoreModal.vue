<template>
  <div class="card flex justify-center">
    <Dialog
      v-bind:visible="visible"
      modal
      :header="getHeader"
      :style="{ width: '25rem' }"
    >
      
      <div v-if="scores">
        <!-- <p>Environmental: {{ scores.environmental }}</p>
        <p>Social: {{ scores.social }}</p>
        <p>Governance: {{ scores.governance }}</p> -->
        <ChartData :sustainabilityScores="scores" />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="visible = false"
        ></Button>
      </div>
    </Dialog>
  </div>
</template>

<!-- <div class="modal">
        <h2>{{ company }} - Sustainability Scores</h2>
        <div v-if="scores">
            <p>Environmental: {{ scores.environmental }}</p>
            <p>Social: {{ scores.social }}</p>
            <p>Governance: {{ scores.governance }}</p>
        </div>
        <button @click="$emit('close')">Close</button>
    </div> -->
<!-- </template> -->

<script>
import axios from "axios";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import ChartData from "./chartData.vue";

export default {
  components: {
    Dialog,
    Button,
    ChartData
  },
  props: ["company", "visible"],
  data() {
    return {
      scores: null,
    };
  },
  computed: {
    getHeader() {
      return `${this.company.data.company} Sustainability Scores`;
    },
  },
  async created() {
    const response = await axios.get(
      `http://localhost:3000/investments?company=${this.company.data.company}`
    );
    console.log(response.data);
    this.scores = response.data[0].sustainabilityScore;
  },
};
</script>
