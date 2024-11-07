<template>
  <Card>
    <template #title>Investment Portfolio</template>
    <template #content>
      <InvestmentTable :investments="investments" />
    </template>
  </Card>
</template>
<script>
import InvestmentTable from "./InvestmentTable.vue";
import Card from "primevue/card";

export default {
  props: {
    investments: {
      type: Array,
      required: true,
    },
  },
  components: {
    InvestmentTable,
    Card
  },
 
};
</script>
