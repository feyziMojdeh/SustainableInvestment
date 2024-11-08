import { shallowMount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import SustainabilityScoreModal from "@/frontEnd/components/SustainabilityScoreModal.vue";
import PrimeVue from "primevue/config";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import axios from "axios";
import ChartData from "@/frontEnd/components/ChartData.vue";

vi.mock("axios");

describe("SustainabilityScoreModal.vue", () => {
  const mockCompany = { data: { company: "Test Company" } };
  const mockScores = {
    sustainabilityScore: 85,
    environmentalScore: 90,
    socialScore: 80,
    governanceScore: 75,
  };

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: [{ sustainabilityScore: mockScores }] });
  });

  it("renders Dialog component and shows header", async () => {
    const wrapper = shallowMount(SustainabilityScoreModal, {
      props: { company: mockCompany, visible: true },
      global: {
        components: { Dialog, Button, ChartData },
      },
    });

    const dialog = wrapper.findComponent(Dialog);
    expect(dialog.exists()).toBe(true);
    expect(wrapper.vm.getHeader).toBe("Test Company Sustainability Scores");
  });

  it("fetches scores on mount and sets `scores` data", async () => {
    const wrapper = shallowMount(SustainabilityScoreModal, {
      props: { company: mockCompany, visible: true },
      global: {
        plugins: [PrimeVue],
        components: { Dialog, Button, ChartData },
      },
    });

    await wrapper.vm.$nextTick();

    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:3000/investments?company=Test Company"
    );
    expect(wrapper.vm.scores).toEqual(mockScores); 
  });


  it("does not render ChartData component if scores is null", () => {
    const wrapper = shallowMount(SustainabilityScoreModal, {
      props: { company: mockCompany, visible: true },
      global: {
        components: { Dialog, Button, ChartData },
      },
      data() {
        return { scores: null };
      },
    });

    expect(wrapper.findComponent(ChartData).exists()).toBe(false);
  });
});
