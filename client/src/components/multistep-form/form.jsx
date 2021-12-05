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
import { notification } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

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
  const [trickger, setTrickger] = useState(false)
  const [subClick, setSubClick] = useState(false)
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
    console.log(activeStep)
    console.log(totalSteps())
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
    return { data: data }
  }
  const handleReset = () => {
    setActiveStep(0)
    setCompleted({})
  }
  const openNotification = (message) => {
    return notification.open({
      message: 'Cảnh báo',
      icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
      description: message,
      onClick: () => {
        console.log('Notification Clicked!')
      },
    })
  }
  const handleSumbit = (e) => {
    setTrickger(true)
    e.preventDefault()
    const steps = ['step1', 'step2']
    const allStepState = []
    steps.forEach((step) => {
      allStepState.push({ [step]: JSON.parse(localStorage.getItem(step)) })
    })
    const form = Array.from(e.target)
    const questionData = form.filter(
      (element) => element.type === 'radio' && element.checked,
    )
    let step3 = {}

    if (questionData.length < 16) {
      return openNotification('Vui lòng trả lời hết câu hỏi')
    } else {
      questionData.forEach((element) => {
        if (element.name === 'selectGift') return
        const { name, value } = element
        step3 = { ...step3, [name]: value }
      })
    }
    allStepState.push({ step3: step3 })
    console.log(...allStepState)
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
        {
          <form autoComplete="off" onSubmit={handleSumbit}>
            <React.Fragment>
              <div
                className={
                  activeStep === 0 ? '' : activeStep === 3 ? '' : 'hidden'
                }
              >
                <Step1Container callback={getStepContent} />
              </div>
              <div
                className={
                  activeStep === 1 ? '' : activeStep === 3 ? '' : 'hidden'
                }
              >
                <Step2Container callback={getStepContent} />
              </div>
              <div
                className={
                  activeStep === 2 ? '' : activeStep === 3 ? '' : 'hidden'
                }
              >
                <Step3Container callback={getStepContent} />
              </div>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Quay lại
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />

                {/* <p>{activeStep}</p> */}
                <Button
                  type={activeStep === 3 ? 'submit' : 'button'}
                  onClick={activeStep === 3 ? null : handleNext}
                >
                  {activeStep === 3 ? 'Đăng ký' : 'Tiếp theo'}
                  {/* {completedSteps() === tottotalStepsalSteps() - 1
                    ? 'Finish'
                    : 'Tiếp theo'} */}
                </Button>
              </Box>
            </React.Fragment>
          </form>
        }
      </div>
    </Box>
  )
}
