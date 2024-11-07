<template>
  <div class="card">
    <Tabs value="0">
      <TabList>
        <Tab value="0">Investment Portfolio</Tab>
        <Tab value="1">Top Growth Companies</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <InvestmentPortfolio :investments="investments"/>
        </TabPanel>
        <TabPanel value="1">
          <TopGrowthCompanies :investments="filteredInvestments" />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<script>
import axios from "axios";
import InvestmentPortfolio from "./InvestmentPortfolio.vue";
import Tabs from "primevue/tabs";
import TabList from "primevue/tablist";
import Tab from "primevue/tab";
import TabPanels from "primevue/tabpanels";
import TabPanel from "primevue/tabpanel";
import TopGrowthCompanies from "./TopGrowthCompanies.vue";

export default {
  components: {
    InvestmentPortfolio,
    TopGrowthCompanies,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
  },
  data() {
    return { investments: [] };
  },
  computed: {
    filteredInvestments() {
      return this.investments
        .filter((company) => company.growth > 21)
        .sort((a, b) => b.growth - a.growth)
        .slice(0, 3);
    },
  },
  methods: {
    async fetchInvestments() {
      try {
        const response = await axios.get("http://localhost:3000/investments");
        this.investments = response.data;
      } catch (error) {
        console.error("Error fetching investments:", error);
      }
    },
  },
  created() {
    this.fetchInvestments();
  },
};
</script>
