<template>
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
    :globalFilterFields="['company', 'symbol', 'shares', 'sector', 'country', 'growth']"
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
          @input="filterCallback()"
          placeholder="Search by symbol"
        /> </template
    ></Column>
    <Column field="shares" header="Shares" sortable>
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          v-model="filterModel.value"
          type="text"
          @input="filterCallback()"
          placeholder="Search by shares"
        />
      </template>
    </Column>
    <Column field="growth" header="Growth" sortable>
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          v-model="filterModel.value"
          type="text"
          @input="filterCallback()"
          placeholder="Search by growth"
        />
      </template>
    </Column>
    <Column field="sector" header="Sector" sortable>
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          v-model="filterModel.value"
          type="text"
          @input="filterCallback()"
          placeholder="Search by sector"
        />
      </template>
    </Column>
    <Column field="country" header="Country" sortable>
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          v-model="filterModel.value"
          type="text"
          @input="filterCallback()"
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
<script>
import axios from "axios";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Card from "primevue/card";
import FloatLabel from "primevue/floatlabel";
import { FilterMatchMode } from "@primevue/core/api";
import SustainabilityScoreModal from "./SustainabilityScoreModal.vue";

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
  props: ["investments"],
  data() {
    return {
      selectedCompany: null,
      selectedProduct: null,
      filters: {
        company: { value: null, matchMode: FilterMatchMode.CONTAINS },
        symbol: { value: null, matchMode: FilterMatchMode.CONTAINS },
        shares: { value: null, matchMode: FilterMatchMode.CONTAINS },
        sector: { value: null, matchMode: FilterMatchMode.CONTAINS },
        growth: { value: null, matchMode: FilterMatchMode.CONTAINS },
        country: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
    };
  },
  methods: {
    selectCompany(item) {
      this.selectedCompany = item;
    },
    onRowSelect(event) {
      this.selectedProduct = event.data;
    },
  }
};
</script>
