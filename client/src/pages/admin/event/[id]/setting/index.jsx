import React from 'react'
import { Tabs } from 'antd'


const { TabPane } = Tabs
export default function EventSetting() {
    return (
        <Tabs defaultActiveKey="1"  size="large">
            <TabPane tab="Đơn hiến máu" key="1">
            <div>a</div>
        
            </TabPane>
        
            <TabPane tab="Tình nguyện viên" key="2">
            <div>a</div>

            </TabPane>
            <TabPane tab="Phần quà" key="3">
              <div>a</div>
            </TabPane>
          </Tabs>
    )
}