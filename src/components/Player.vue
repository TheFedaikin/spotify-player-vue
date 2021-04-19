<!-- The last part should be moved to the Song.vue component... 
But because of time constraints (and how I did the styling) I've decided against that for the demo-->
<template>
  <transition name="fade" mode="out-in">
    <main v-if="status === 'LOADING'" key="loading">
      <span>App is loading, please wait!</span>
    </main>
    <main v-else-if="status === 'IDLE'" key="not-playing">
      <span>Start playing music to see it here!</span>
    </main>
    <main v-else-if="status === 'ERROR'" key="error">
      <span>We encountered a fatal error. :(</span>
      <p>
        Probably something has changed in the api. We are aware of it and will be resolving our
        issue quickly!
      </p>
    </main>
    <main v-else-if="status === 'AD'">
      <figure class="figure empty" />
      <aside>
        <h2>Ad is currently playing</h2>
      </aside>
    </main>
    <main v-else key="content">
      <figure v-if="!song.albumCover" key="empty" class="figure empty" />
      <figure v-else key="cover" class="figure" :style="{ backgroundImage: song.albumCover }" />

      <aside>
        <h2>
          {{ song?.name }}
        </h2>
        <h3 class="artist">
          {{ song?.artist }}
        </h3>
        <div v-if="song?.isPlaying" class="status">Playing</div>
        <div v-else class="status">Paused</div>
        <input type="range" min="0" max="100" step="1" :value="progress" disabled />
      </aside>
    </main>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { SongEntity } from '@entities'

// * Default props are set because we might use this player component outside of PlayerContainer
export default defineComponent({
  props: {
    status: { type: String, default: 'LOADING' },
    song: {
      type: Object,
      default: () => SongEntity.createSongInfo(),
    },
    progress: { type: Number, default: 0 },
  },
})
</script>

<style lang="scss" scoped>
@mixin track {
  width: 100%;
  height: 11px;
  cursor: pointer;
  background: var(--color-main);
  border-radius: 6px;
  box-shadow: inset 0 1px 3px var(--color-transparent);
}

@mixin thumb {
  -webkit-appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: var(--color-white);
  cursor: pointer;
  margin-top: -4px;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

main {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  margin: 0 2rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
}

aside {
  margin: 0;
  margin-left: 2rem;

  @media screen and (max-width: 768px) {
    margin: 0;
  }
}

.figure {
  width: 300px;
  height: 300px;
  background-position: center;
  background-size: cover;
  margin: 0;
  padding: 0;
  // * This can be an SVG icon for placeholder
  background-color: var(--color-transparent);

  &.empty {
    background: linear-gradient(-45deg, var(--color-main), var(--color-text), var(--color-white));
    background-size: 400% 400%;
    animation: gradient 10s ease infinite;
  }
}

h2 {
  padding: 0;
  margin: 0;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 2.5rem;
}

.artist {
  padding: 0;
  margin: 0;
  font-weight: 600;
  line-height: 2.3rem;
  font-size: 1.3rem;
  margin-bottom: 1rem;
}

.status {
  margin-bottom: 1rem;
}

input[type='range'] {
  -webkit-appearance: none;
  background: transparent;

  &:focus {
    outline: none;
  }

  &::-webkit-slider-thumb {
    @include thumb;
  }

  &::-moz-range-thumb {
    @include thumb;
  }

  &::-webkit-slider-runnable-track {
    @include track;
  }

  &::-moz-range-track {
    @include track;
  }
}
</style>
