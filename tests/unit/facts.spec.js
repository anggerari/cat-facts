import { shallowMount } from '@vue/test-utils';
import Facts from '@/views/Facts.vue';

/**
 * Facts Component should have a 'div' element
 * with class of facts as a wrapper element.
 */

describe('Facts Component', () => {
  it('Renders a div wrapper component', () => {
    const wrapper = shallowMount(Facts, {
      global: {
        stubs: ['router-view', 'el-table', 'el-form-item', 'el-dialog', 'el-input', 'el-button', 'el-divider', 'el-table-column', 'el-col', 'el-row'],
      },
    });
    const div = wrapper.find('div');
    expect(div.exists()).toBe(true);
  });
});

/**
 * Facts Component should have deleteDialog,
 * editDialog, facts, newFact, selectedFactId,
 * selectedFactValue, Upload
 */
