import { shallowMount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import ChartData from "@/frontEnd/components/ChartData.vue";


describe('ChartComponent', () => {
  it('renders the Chart component', () => {
    const wrapper = shallowMount(ChartData, {
      props: {
        sustainabilityScores: {
          sustainabilityScore: 85,
          environmentalScore: 90,
          socialScore: 80,
          governanceScore: 75,
        },
        company: 'Test Company',
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('displays the correct chart labels and data', () => {
    const wrapper = shallowMount(ChartData, {
      props: {
        sustainabilityScores: {
          sustainabilityScore: 85,
          environmentalScore: 90,
          socialScore: 80,
          governanceScore: 75,
        },
        company: 'Test Company',
      },
    });

    const chartData = wrapper.vm.chartData;
    expect(chartData.labels).toEqual([
      'Sustainability',
      'Environmental',
      'Social',
      'Governance',
    ]);
    expect(chartData.datasets[0].data).toEqual([85, 90, 80, 75]);
  });
});