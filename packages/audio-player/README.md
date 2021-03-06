## Irving Audio Player
A persistent audio player is one of the most unique features that Irving offers. Since Irving functions as a single page application after being hydrated, we can easily offer an audio player that travels with the user and offers a seamless experience.

### Installation
1. `npm install @irvingjs/audio-player --save`
2. Add necessary components your project `componentMap.js`
3. Package includes a component called `<AudioElement>` to connect/interface with the HTML audio element. This component:
    * Should only have a single instance appear on the page. Because of this, we recommend you include it directly in your project's `<App>` component.
    * As described below, this package does not contain any user interface for controlling the `<AudioElement>` beyond a simple play/pause button. Volume, scrubbing, next/prev buttons, etc. are up to you—there are, however, redux actions provided for managing that functionality.

### Components
* `<AudioElement>` - HTML `<audio>` tag and relevant hooks for controlling it via redux state. Note that beyond the `<PlayPauseButton />` component (below) this package does not provide a UI for controlling audio.
* `<PlayPauseButton />` - Component for loading, playing, and pausing an audio file. The state of this button will be synced with the state of the `<AudioElement />` via redux.
