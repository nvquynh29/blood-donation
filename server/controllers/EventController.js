import Event from '../models/Event.js'

const createEvent = async (req, res) => {
  const {
    name, startDate, duration, address, organizationID,
  } = req.body
  let newEvent = new Event({
    name,
    start_date: startDate,
    duration,
    address,
    organization_id: organizationID,
  })
  try {
    newEvent = await newEvent.save()
    return res.status(200).json(newEvent)
  } catch (e) {
    return res.status(500).json(e)
  }
}

const getAllEvent = async (req, res) => {
  try {
    let events = Event.find({
      start_date: {
        $gt: new Date(new Date().getTime()),
        $lte: new Date(new Date().getTime() + 1000 * 86400 * 30),
      },
    }, {
      volunteers: 0,
      donation_books: 0,
    }).sort({
      start_date: 1,
    }).populate('organization_id', {
      admin: 0,
      list_blood_requests: 0,
    })
    if (req.query.limit) {
      events = events.limit(parseInt(req.query.limit, 10))
    }
    events = await events.exec()
    return res.status(200).json(events)
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const EventController = {
  createEvent,
  getAllEvent,
}
