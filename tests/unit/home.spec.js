import { shallowMount } from '@vue/test-utils';
import Home from '@/views/Home.vue';

/**
 * Home Component should have a 'div' element
 * with class of home as a wrapper element.
 */

describe('Home Component', () => {
  it('Renders a div wrapper component', () => {
    const wrapper = shallowMount(Home, {
      global: {
        stubs: ['router-view', 'el-col', 'el-row', 'el-card'],
      },
    });
    const div = wrapper.find('div');
    expect(div.exists()).toBe(true);
  });
});

/**
 * Home Component should have deleteDialog
 * and facts as a data.
 */

describe('Home Component', () => {
  it('Home Component should have deleteDialog', () => {
    const wrapper = shallowMount(Home, {
      global: {
        stubs: ['router-view', 'el-col', 'el-row', 'el-card'],
      },
      props: {
        deleteDialog: 'deleteDialog',
        facts: 'facts',
      },
    });
    expect(wrapper.props('deleteDialog')).toBe('deleteDialog');
    expect(wrapper.props('facts')).toBe('facts');
  });
});
