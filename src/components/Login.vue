<template>
  <a
    :href="loginLink"
    class="login-button"
    role="navigation"
    type="button"
    aria-pressed="false"
    aria-describedby="Login"
    tabindex="1"
  >
    Login to Spotify
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { config } from '@config'

export default defineComponent({
  setup() {
    return { loginLink: config.loginLink }
  },
})
</script>

<style lang="scss" scoped>
.login-button {
  border-radius: 500px;
  border: 0px;
  box-sizing: border-box;
  color: var(--color-text);
  background-color: var(--color-main);
  cursor: pointer;
  display: inline-block;
  font-size: inherit;
  outline: none;
  padding: 14px 32px;
  position: relative;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  touch-action: manipulation;
  transition-duration: 33ms;
  transition-property: border-color, box-shadow, filter, transform;
  user-select: none;
  vertical-align: middle;
  will-change: transform;
  z-index: 10;
  &:active,
  &:hover {
    background-color: var(--color-highlight);
  }
  &:hover {
    transform: scale(1.04);
  }
  &:focus {
    &::before {
      border-width: 3px;
    }
  }
  &::before {
    transition-duration: 33ms;
    transition-property: border-color;
    box-sizing: border-box;
    display: block;
    content: '';
    position: absolute;
    top: -6px;
    left: -6px;
    width: calc(100% + 12px);
    height: calc(100% + 12px);
    border-radius: 500px;
    z-index: 0;
    border: 0 solid var(--color-white);
  }
}
</style>
