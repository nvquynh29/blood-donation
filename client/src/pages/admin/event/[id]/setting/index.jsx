import React from 'react'
import { Tabs } from 'antd'
import VolunteerList from '../../../../../components/volunteer-list'
import MiniDrawer from '../../../../../layouts/trial/MiniDrawer'

const { TabPane } = Tabs
function EventSetting() {
  return (
    <MiniDrawer>
      <Tabs defaultActiveKey="1" size="large">
        <TabPane tab="Đơn hiến máu" key="1">
          <div>a</div>

        </TabPane>

        <TabPane tab="Tình nguyện viên" key="2">
          <VolunteerList />

        </TabPane>
        <TabPane tab="Phần quà" key="3">
          <div>a</div>
        </TabPane>
      </Tabs>
    </MiniDrawer>
  )
}
export default EventSetting