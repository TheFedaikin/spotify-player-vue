// * Testing is a little shallow, and should be expanded and more precise...
// * But it should be enough considering the demo status and time-constraints.

import { mount } from '@vue/test-utils'
import Player from './Player.vue'
import { SongEntity } from '@entities'

describe('Player', () => {
  it('should display loading message with the default props', () => {
    const wrapper = mount(Player)

    expect(wrapper.find('main').text()).toEqual('App is loading, please wait!')
  })

  it('should display loading message', () => {
    const props = { status: 'LOADING' }
    const wrapper = mount(Player, { props })

    expect(wrapper.find('main').text()).toEqual('App is loading, please wait!')
  })

  it('should display idle message', () => {
    const props = { status: 'IDLE' }
    const wrapper = mount(Player, { props })

    expect(wrapper.find('main').text()).toEqual('Start playing music to see it here!')
  })

  it('should display error message', () => {
    const props = { status: 'ERROR' }
    const wrapper = mount(Player, { props })

    expect(wrapper.find('main').text()).toEqual(
      'We encountered a fatal error. :( Probably something has changed in the api. We are aware of it and will be resolving our issue quickly!',
    )
  })

  it('should display AD message', () => {
    const props = { status: 'AD' }
    const wrapper = mount(Player, { props })

    expect(wrapper.find('main').text()).toEqual('Ad is currently playing')
  })

  it('should display paused track status with an empty cover', () => {
    const props = { status: 'TRACK', song: SongEntity.createSongInfo({}) }
    const wrapper = mount(Player, { props })

    expect(wrapper.find('main').text()).toEqual('Paused')
    expect(wrapper.find('figure').classes()).toEqual(['figure', 'empty'])
  })

  it('should display playing track status with an album cover', () => {
    const props = {
      status: 'TRACK',
      song: SongEntity.createSongInfo({
        is_playing: true,
        item: { album: { images: [{}, { url: 'hello url' }, {}] } },
      }),
    }
    const wrapper = mount(Player, { props })

    expect(wrapper.find('main').text()).toEqual('Playing')
    expect(wrapper.find('figure').classes()).toEqual(['figure'])
  })
})
