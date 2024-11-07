<template>
  <div>
    <Chart type="bar" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { ref } from "vue";
import Chart from "primevue/chart";

export default {
  props: ["sustainabilityScores", "company"],
  components: { Chart },

  setup(props) {
    const chartData = ref({
          labels: ["Sustainability", "Environmental", "Social", "Governance"],
          datasets: [
            {
              label: "Sustainability Score",
              backgroundColor:[ "#42A5F5", "#66BB6A", "#FFA726", "#FFCA28"],
              data: [
                props.sustainabilityScores.sustainabilityScore,
                props.sustainabilityScores.environmentalScore,
                props.sustainabilityScores.socialScore,
                props.sustainabilityScores.governanceScore,
              ],
            }
          ]
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
.chart-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}
</style>
