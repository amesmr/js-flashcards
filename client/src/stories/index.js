import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { withNotes } from '@storybook/addon-notes';
import App from '../App';
import FlashCard from '../components/FlashCard'


storiesOf("App", module)
    .add("default", () => (
        <App />
    ));

storiesOf("FlashCard", module)
    .add("default", () => (
        <FlashCard
          question="This is a crazy question, holy shit"
          answers ={["Answer A", "Answer B","Answer C","Answer D"]}
          numberInSet={1}
          answer="Answer B"
          lesson="This is the lesson"
          goal="This is the goal"
          cpName="Checkpoint 5000"
          />
    ))
  
  
  