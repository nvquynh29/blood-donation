import React, { useState, useEffect} from 'react'
import MainLayout from '../../layouts/main-layout/Default'
import {getAllEvent} from '../../api/event'
import EventList from '../../components/event-list'


const Event = () => {
    const [events, setEvents] = useState([])
    useEffect(() => {
        try {
            getAllEvent().then(res => {
                setEvents(res.data)
            })
        } catch (err) {
            console.log(err)
        }
    }, [])
    return (
        <MainLayout>
            <EventList events={events}/>
        </MainLayout>
    )
}
export default Event
