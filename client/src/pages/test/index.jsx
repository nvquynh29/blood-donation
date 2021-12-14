import { Paper, Box, Typography, Button } from '@mui/material'
import React from 'react'
import MultiStepForm from '../../components/multistep-form/allstep'
import OrganizationDetail from '../organization/[id]/index'

function index() {
  return (
    <div>
      {/* <OrganizationDetail /> */}
      {/* <MultiStepForm /> */}
      <Paper className="max-w-xl mx-auto my-4 p-3">
        <Box p={3}>
          <Typography
            variant="h5"
            component="h3"
            className="text-[#1f1e45] mb-5"
          >
            Chào mừng bạn đến với <span className="text-[red]">Giọt hồng</span>!
          </Typography>
          <Typography component="p" className="text-[#1f1e45] mb-5">
            Bạn đã được mời tham gia vào đội ngũ của chúng tôi.
          </Typography>
          <div className="flex items-center justify-center my-10">
            <Button
              variant="contained"
              color="primary"
              className="rounded-2xl bg-[red] py-[7px] w-[230px] hover:bg-[red] hover:text-[#fff] "
            >
              Xác nhận
            </Button>
          </div>
          <Typography component="p" className="text-[#1f1e45] mb-5">
            Bạn đã được mời tham gia vào đội ngũ của chúng tôi.
          </Typography>
          <hr className="h-[1px] w-full bg-gray-400" />
          <Typography component="p" className="text-[#1f1e45] my-5">
            Liên hệ với chúng tôi nếu bạn có bất kỳ câu hỏi nào.
          </Typography>
          <a
            href="mail:jteam@gmail.com"
            className="text-[#1f1e45] text-lg hover:text-[red]"
          >
            jteam@gmail.com
          </a>
        </Box>
      </Paper>
    </div>
  )
}

export default index
