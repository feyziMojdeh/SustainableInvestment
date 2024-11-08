import { shallowMount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import axios from "axios";
import Investment from "@/frontEnd/components/Investment.vue";

vi.mock("axios");

describe("Investment", () => {
  const mockInvestments = [
    { id: 1, name: "Company A", growth: 25 },
    { id: 2, name: "Company B", growth: 22 },
    { id: 3, name: "Company C", growth: 30 },
    { id: 4, name: "Company D", growth: 15 },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockInvestments });
  });

  it("match snapshot", async () => {
    const wrapper = shallowMount(Investment);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("fetches investments on created hook", async () => {
    const wrapper = shallowMount(Investment);

    await wrapper.vm.$nextTick();

    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/investments");
    expect(wrapper.vm.investments).toEqual(mockInvestments);
  });

  it("computes filteredInvestments correctly", async () => {
    const wrapper = shallowMount(Investment);

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.filteredInvestments).toEqual([
      { id: 3, name: "Company C", growth: 30 },
      { id: 1, name: "Company A", growth: 25 },
      { id: 2, name: "Company B", growth: 22 },
    ]);
  });
});
