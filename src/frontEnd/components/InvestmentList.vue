<template>
  <Card>
    <template #title>Investment Portfolio</template>
    <template #content>
      <DataTable
        size="small"
        tableStyle="min-width: 50rem"
        scrollable
        scrollHeight="400px"
        dataKey="symbol"
        v-model:filters="filters"
        v-model:selection="selectedProduct"
        selectionMode="single"
        :value="investments"
        removableSort
        :globalFilterFields="[
          'company',
          'symbol',
          'shares',
          'sector',
          'country',
        ]"
        filterDisplay="row"
        @rowSelect="selectCompany"
      >
        <Column field="company" header="Company" sortable>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              placeholder="Search by country"
            />
          </template>
        </Column>
        <Column field="symbol" header="Symbol" sortable>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              placeholder="Search by symbol"
            /> </template
        ></Column>
        <Column field="shares" header="Shares" sortable>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              placeholder="Search by shares"
            />
          </template>
        </Column>
        <Column field="sector" header="Sector" sortable>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              placeholder="Search by sector"
            />
          </template>
        </Column>
        <Column field="country" header="Country" sortable>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              placeholder="Search by country"
            />
          </template>
        </Column>
      </DataTable>
      <SustainabilityScoreModal
        v-if="selectedCompany"
        :company="selectedCompany"
        :visible="selectedCompany ? true : false"
        @close="selectedCompany = null"
      />
    </template>
  </Card>
</template>
<script>
import axios from "axios";
import SustainabilityScoreModal from "./SustainabilityScoreModal.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Card from "primevue/card";
import FloatLabel from "primevue/floatlabel";
import { FilterMatchMode } from "@primevue/core/api";

export default {
  components: {
    SustainabilityScoreModal,
    DataTable,
    Column,
    Button,
    InputText,
    FloatLabel,
    Card,
  },
  data() {
    return {
      investments: [],
      countryFilter: "",
      selectedCompany: null,
      selectedProduct: null,
      filters: {
        company: { value: null, matchMode: FilterMatchMode.CONTAINS },
        symbol: { value: null, matchMode: FilterMatchMode.CONTAINS },
        shares: { value: null, matchMode: FilterMatchMode.CONTAINS },
        sector: { value: null, matchMode: FilterMatchMode.CONTAINS },
        country: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
    };
  },
  computed: {
    filteredInvestments() {
      return this.investments.filter((investment) =>
        investment.country
          .toLowerCase()
          .includes(this.countryFilter.toLowerCase())
      );
    },
  },
  methods: {
    selectCompany(item) {
      this.selectedCompany = item;
    },
    async fetchInvestments() {
      try {
        const response = await axios.get("http://localhost:3000/investments");
        this.investments = response.data;
      } catch (error) {
        console.error("Error fetching investments:", error);
      }
    },
    onRowSelect(event) {
      this.selectedProduct = event.data;
    },
  },
  created() {
    this.fetchInvestments();
  },
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
