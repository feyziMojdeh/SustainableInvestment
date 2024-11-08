import { mount, shallowMount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import InvestmentTable from "@/frontEnd/components/InvestmentTable.vue";
import SustainabilityScoreModal from "@/frontEnd/components/SustainabilityScoreModal.vue";
import PrimeVue from "primevue/config";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";

describe("InvestmentTable.vue", () => {
  const investmentsMock = [
    { company: "Company A", symbol: "CMPA", shares: 100, growth: 15, sector: "Tech", country: "USA" },
    { company: "Company B", symbol: "CMPB", shares: 200, growth: 25, sector: "Finance", country: "Canada" },
  ];

  it("renders DataTable with the correct number of rows", () => {
    const wrapper = shallowMount(InvestmentTable, {
      props: { investments: investmentsMock },
      global: {
        plugins: [PrimeVue],
        components: { DataTable, Column, InputText },
      },
    });

    const table = wrapper.findComponent(DataTable);
    expect(table.exists()).toBe(true);
    expect(wrapper.props("investments").length).toBe(2);
  });

  it("updates filters correctly when input is provided", async () => {
    const wrapper = shallowMount(InvestmentTable, {
      props: { investments: investmentsMock },
      global: {
        plugins: [PrimeVue],
        components: { DataTable, Column, InputText },
      },
    });

    await wrapper.setData({
      filters: {
        company: { value: "Company A", matchMode: "contains" },
      },
    });

    expect(wrapper.vm.filters.company.value).toBe("Company A");
  });

  it("opens SustainabilityScoreModal with correct data on row selection", async () => {
    const wrapper = shallowMount(InvestmentTable, {
      props: { investments: investmentsMock },
      global: {
        plugins: [PrimeVue],
        components: { DataTable, Column, SustainabilityScoreModal },
      },
    });

    const companyToSelect = investmentsMock[0];
    await wrapper.vm.selectCompany(companyToSelect);

    expect(wrapper.vm.selectedCompany).toEqual(companyToSelect);
    const modal = wrapper.findComponent(SustainabilityScoreModal);
    expect(modal.exists()).toBe(true);
    expect(modal.props("company")).toEqual(companyToSelect);
  });
});
