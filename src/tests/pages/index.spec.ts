import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Index from '~/pages/index.vue'

Vue.config.ignoredElements = ['b-icon']

// const head = (): MetaInfo => {
//   return null
// }

describe('HomePage', () => {
  const wrapper = mount(Index)

  it('Home page loaded sucessfully', () => {
    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.find('h1'))
  })

  // it('check page title', () => {
  //   // const spy = jest.spyOn(Index, 'head')
  //   // @ts-ignore
  //   expect(wrapper.vm.head()).toHaveBeenCalled()
  // })
})
