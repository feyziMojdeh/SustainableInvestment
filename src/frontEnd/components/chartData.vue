<template>
  <div>
    <Chart type="bar" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { ref } from "vue";

import Chart from "primevue/chart";

export default {
  props: ["sustainabilityScores"],
  components: { Chart },
  setup() {
    // Chart data formatted for PrimeVue's Chart component
    const chartData = ref({
      labels: this.sustainabilityScores.map((item) => item.company),
      datasets: [
        {
          label: "Sustainability Score",
          backgroundColor: "#42A5F5",
          data: this.sustainabilityScores.map((item) => item.sustainabilityScore),
        },
        {
          label: "Environmental Score",
          backgroundColor: "#66BB6A",
          data: this.sustainabilityScores.map((item) => item.environmentalScore),
        },
        {
          label: "Social Score",
          backgroundColor: "#FFA726",
          data: this.sustainabilityScores.map((item) => item.socialScore),
        },
        {
          label: "Governance Score",
          backgroundColor: "#FFCA28",
          data: this.sustainabilityScores.map((item) => item.governanceScore),
        },
      ],
    });

    // Chart options
    const chartOptions = ref({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          enabled: true,
        },
      },
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
          beginAtZero: true,
          max: 100,
        },
      },
    });

    return { chartData, chartOptions };
  },
};
</script>

<style>
/* Optional: Style adjustments for the chart container */
.chart-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}
</style>
