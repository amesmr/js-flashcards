import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { withNotes } from '@storybook/addon-notes';
import App from '../App';
import FlashCard from '../components/FlashCard'
import FlashCardContainer from '../containers/FlashCardContainer';
import LandingPageContainer from '../containers/LandingPageContainer/LandingPageContainer';
import MenuForm from '../components/MenuForm';
import QuizQuestion from '../components/QuizQuestion';


storiesOf("App", module)
    .add("default", () => (
        <App />
    ));

storiesOf("FlashCard", module)
    .add("quiz card", () => (
        <FlashCard
          question="This is a crazy question, holy shit"
          answers ={["Answer A", "Answer B","Answer C","Answer D"]}
          numberInSet={1}
          answer="Answer B"
          lesson="This is the lesson"
          goal="This is the goal"
          cpName="Checkpoint 5000"
          hoverSwitch="off"
          />
    ))

storiesOf("FlashCard", module)
    .add("flash/hover card", () => (
        <FlashCard
          question="This is a crazy question, holy shit"
          answers ={["Answer A", "Answer B","Answer C","Answer D"]}
          numberInSet={1}
          answer="Answer B"
          lesson="This is the lesson"
          goal="This is the goal"
          cpName="Checkpoint 5000"
          hoverSwitch="on"
          />
    ))
    
storiesOf("FlashCardContainer", module)
    .add("container for flashcard", () => (
        <FlashCardContainer />
    ))

storiesOf("LandingPageContainer", module)
    .add("container for landing page", () => (
        <LandingPageContainer />
    ))

storiesOf("MenuForm", module)
    .add("container for landing page form", () => (
        <MenuForm />
    ))
  
storiesOf("QuizQuestion", module)
    .add("question format for quiz component", () => (
        <QuizQuestion />
    ))