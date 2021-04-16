<template>
  <PlayerContainer />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PlayerContainer from '@pages/index.vue'

export default defineComponent({
  components: { PlayerContainer },
})
</script>

<style>
#app {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
  background-color: var(--color-secondary);
  color: var(--color-main);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
