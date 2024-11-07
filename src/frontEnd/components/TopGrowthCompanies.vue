<template>
  <div>
    <Card>
      <template #title>Top 3 Growth Companies</template>
      <template #content>
        <InvestmentTable :investments="investments" />
      </template>
    </Card>
  </div>
</template>
<script>
import Card from "primevue/card";
import InvestmentTable from "./InvestmentTable.vue";

export default {
  props: ["investments"],
  components: {
    InvestmentTable,
    Card,
  },
};
</script>
