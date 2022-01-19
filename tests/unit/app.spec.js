import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';
import BaseNavigation from '@/components/BaseNavigation.vue';

/**
 * App Component should have a 'div' element
 * as a wrapper element.
 */
describe('App Component', () => {
  it('Renders a div wrapper component', () => {
    const wrapper = shallowMount(App, {
      global: {
        stubs: ['router-view'],
      },
    });
    const div = wrapper.find('div');
    expect(div.exists()).toBe(true);
  });
});

/**
 * App Component should be able to find
 * BaseNavigation Component.
 */
describe('App Component', () => {
  it('Contains Base Navigation', () => {
    const wrapper = shallowMount(App, {
      global: {
        stubs: ['router-view'],
      },
    });
    const baseNavigation = wrapper.findComponent(BaseNavigation);
    expect(baseNavigation.exists()).toBe(true);
  });
});
