import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepButton from '@mui/material/StepButton'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Step1Container from './step-1'
import Step2Container from './step-2'
import Step3Container from './step-3'
const steps = [
  'Thông tin cá nhân',
  'Hình thức hiến máu',
  'Trả lời câu hỏi',
  'Xác nhận các thông tin và đăng ký hiến máu',
]
function getStepCompnent(step, callback) {
  console.log(step)
  switch (step) {
    case 0:
      return <Step1Container callback={callback} />
    case 1:
      return <Step2Container />
    case 2:
      return <Step3Container />
    case 3:
      return (
        <div>
          <Step1Container callback={callback} />
          <Step2Container />
          <Step3Container />
        </div>
      )

    default:
      break
  }
  // return (
  //   <div>
  //     <Step1Container className={step===0 ??"hidden"} callback={callback} />
  //     <Step2Container className={step===1 ??"hidden"} />
  //     <Step3Container className={step===2 ??"hidden"}/>
  //   </div>
  // )
}
export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = useState(0)
  const [completed, setCompleted] = useState({})
  const [allStepState, setAllStepState] = useState({})
  const totalSteps = () => {
    return steps.length
  }

  const completedSteps = () => {
    return Object.keys(completed).length
  }

  const isLastStep = () => {
    return activeStep === totalSteps() - 1
  }

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps()
  }

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1
    setActiveStep(newActiveStep)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStep = (step) => {
    console.log(step)
    setActiveStep(step)
  }

  const handleComplete = () => {
    const newCompleted = completed
    newCompleted[activeStep] = true
    setCompleted(newCompleted)
    handleNext()
  }
  const getStepContent = (data) => {
    // console.log(data)
  }
  const handleReset = () => {
    setActiveStep(0)
    setCompleted({})
  }

  return (
    <Box sx={{ width: '100%' }} className="p-6 bg-[#f5f5f5]">
      <Stepper className="mb-3" nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton
              color="inherit"
              onClick={() => {
                handleStep(index)
              }}
            >
              <span className="max-w-[20ch] font-Dosis text-lg overflow-ellipsis inline-block ">
                {label}
              </span>
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className={activeStep === 0 ? '' : activeStep === 3 ? '' : 'hidden'}>
              <Step1Container callback={getStepContent} />
            </div>
            <div className={activeStep === 1 ? '' : activeStep === 3 ? '' : 'hidden'}>
              <Step2Container callback={getStepContent} />
            </div>
            <div className={activeStep === 2 ? '' : activeStep === 3 ? '' : 'hidden'}>
              <Step3Container callback={getStepContent} />
            </div>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {/* <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button> */}
              {/* {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                  </Button>
                ))}                 */}
              <Button onClick={handleComplete}>
                {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Tiếp theo'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  )
}
