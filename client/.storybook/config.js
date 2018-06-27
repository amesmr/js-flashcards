import { configure } from '@storybook/react';
import '../node_modules/materialize-css/dist/css/materialize.css'

function loadStories() {
  require('../src/stories/index.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);