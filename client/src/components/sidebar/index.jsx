import React from 'react'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav'
import '@trendmicro/react-sidenav/dist/react-sidenav.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCalendar, faTint, faUniversity } from '@fortawesome/free-solid-svg-icons'

const SideBar = () => {
    return (
        <SideNav
            onSelect={(selected) => {
                // Add your code here
            }}
        >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="home">
                <NavItem eventKey="home">
                    <NavIcon>
                        {/* <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} /> */}
                        <FontAwesomeIcon icon={faHome} style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Trang chủ
                    </NavText>
                </NavItem>
                {/* <NavItem eventKey="charts">
                    <NavIcon>
                        <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Charts
                    </NavText>
                    <NavItem eventKey="charts/linechart">
                        <NavText>
                            Line Chart
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="charts/barchart">
                        <NavText>
                            Bar Chart
                        </NavText>
                    </NavItem>
                </NavItem> */}
                <NavItem eventKey="event">
                    <NavIcon>
                        {/* <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} /> */}
                        <FontAwesomeIcon icon={faCalendar} style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Sự kiện
                    </NavText>
                   
                </NavItem>
                <NavItem eventKey="waitForBlood">
                    <NavIcon>
                        {/* <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} /> */}
                        <FontAwesomeIcon icon={faTint} style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Đơn đợi máu 
                    </NavText>
                </NavItem>
                <NavItem eventKey="organization">
                    <NavIcon>
                        {/* <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} /> */}
                        <FontAwesomeIcon icon={faUniversity} style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                    Tổ chức  
                    </NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav>          
    )
}
export default SideBar