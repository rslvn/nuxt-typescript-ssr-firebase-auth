import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Index from '~/pages/index.vue'

Vue.config.ignoredElements = ['b-icon']

// const head = (): MetaInfo => {
//   return null
// }

describe('HomePage', () => {
  const wrapper = mount(Index)

  it('is a Vue component', () => {
    expect(wrapper.vm).toBeTruthy()
    // expect(wrapper.vm.$meta()).toBeCalled()
  })

  // it('check page title', () => {
  //   // const spy = jest.spyOn(Index, 'head')
  //   // @ts-ignore
  //   expect(wrapper.vm.head()).toHaveBeenCalled()
  // })
})
