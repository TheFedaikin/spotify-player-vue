<!-- In real world this would be a Player Page, but since we don't have other pages here, it'll be index-->
<template>
  <Logo />

  <transition name="fade" mode="out-in">
    <Player
      v-if="state.token"
      key="player"
      :song="state.song"
      :status="state.status"
      :progress="progress"
    />
    <Login v-else key="login" />
  </transition>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { createPlayerStore } from '@store'
import Player from '@components/Player.vue'
import Login from '@components/Login.vue'
import Logo from '@components/Logo.vue'

export default defineComponent({
  components: { Player, Logo, Login },
  setup() {
    const store = createPlayerStore()
    const progress = computed(() => (store.state.song.progress / store.state.song.duration) * 100)

    return { state: store.state, progress }
  },
})
</script>
