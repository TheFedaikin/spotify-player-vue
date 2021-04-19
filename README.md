# Modern Re-imagining of [How to Build A Spotify Player with React in 15 Minutes](https://levelup.gitconnected.com/how-to-build-a-spotify-player-with-react-in-15-minutes-7e01991bc4b6)

## Notable points:

- This project was time-boxed, so many things are missing
- Uses yarn as a package manager
- This project setup is based on the Vite template for Vue 3 with Sass and Typescript
- ESLint, Prettier, Husky and Commitlint are configured
- [Deployed to Vercel](https://spotify-player-vue.vercel.app/}
- Only Vue as a production dependency
- SSR friendly wrappers for window
- Was tested on Node LTS
- Storybook would be an overkill here, IMO

## Pitfalls of the setup:

- Unit-testing is a very shallow at this moment because at the time of writing I wasn't able to do a proper setup. I've added tests for the simplest component that doesn't use any aliases or import.meta stuff because all others are braking or not targets for the tests. The setup that would work with aliases, ES modules and, more importantly Vite was not achieved in the time frame, so I dropped it. Every time I try to fix these issues one of them kept breaking. This error in particular is impossible to fix without major hacks and ugly workaround, EVEN with mocking of the modules:

```
The 'import.meta' meta-property is only allowed when the '--module' option is 'es2020', 'esnext', or 'system'.
```

- E2E testing is not here
- Has **_some_** architecture, but nothing layered/onion-like. For the purposes of this demo it should be enough, I'd also argue that further division into layers for this simple app is probably over-engineering

### This setup will most likely evolve after issues with ESM, Vite and Aliases. Different test runner would be great, but for now @web-test/runner is not working with Vite+Vue
