// import the progress bar
import StepProgressBar from 'react-step-progress'
// import the stylesheet
import 'react-step-progress/dist/index.css'
import TEST from './test1'
// render the progress bar
import React from 'react'

function index() {
  // setup the step content
  const step1Content = <h1>Step 1 Content</h1>
  const step2Content = <h1>Step 2 Content</h1>
  const step3Content = <h1>Step 3 Content</h1>

  // setup step validators, will be called before proceeding to the next step
  function step2Validator() {
    // return a boolean
  }

  function step3Validator() {
    // return a boolean
  }

  function onFormSubmit() {
    // handle the submit logic here
    // This function will be executed at the last step
    // when the submit button (next button in the previous steps) is pressed
  }
  const steps = [
    {
      label: 'Step 1',
      subtitle: 'x1',
      name: 'step 1',
      content: step1Content,
    },
    {
      label: 'Step 2',
      subtitle: 'x2',
      name: 'step 2',
      content: <TEST></TEST>,
      // validator: step2Validator,
    },
    {
      label: 'Step 3',
      subtitle: 'x3',
      name: 'step 3',
      content: step3Content,
      // validator: step3Validator,
    },
  ]

  return (
    <div>
      <StepProgressBar
        startingStep={0}
        wrapperClass="progress-wrapper-custom"
        submitBtnName="Υποβολή"
        previousBtnName="Πίσω"
        nextBtnName="Επόμενο"
        onSubmit={onFormSubmit}
        steps={steps}
      />
    </div>
  )
}

export default index
