import Event from '../models/Event.js'

const createEvent = async (req, res) => {
    const { name,
         start_date,
          duration,
           address,
         organization_id,
     } = req.body
    let newEvent = new Event({
        name, start_date, duration, address,organization_id
    })
    try {
        newEvent = await newEvent.save()
        return res.status(200).json(newEvent)
    } catch (e) {
        return res.status(500).json(e)
    }
}

export const EventController = {
    createEvent,
}


