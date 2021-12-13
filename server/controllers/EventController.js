import Event from '../models/Event.js'
import User from '../models/User.js'
import Donation from '../models/Donation.js'

const createEvent = async (req, res) => {
  const { _id } = req.user
  const { organization_id } = await User.findOne({ _id })
  const {
    name, startDate, duration, address,
  } = req.body
  let newEvent = new Event({
    name,
    start_date: startDate,
    duration,
    address,
    organization_id: organization_id,
  })
  try {
    newEvent = await newEvent.save()
    return res.status(200).json(newEvent)
  } catch (e) {
    return res.status(500).json(e)
  }
}

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params
    const response = await Event.findOneAndDelete({ _id: id })
    await Donation.updateMany({ event_id: id }, { $set: { event_id: null } })
    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json(error)
  }
}
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params
    const event = await Event.findOneAndUpdate({ _id: id }, req.body, { new: true })
    return res.status(200).json(event)
  } catch (error) {
    return res.status(500).json(error)
  }
}

const getOngoingAndFutureEvent = async (req, res) => {
  try {
    let events = Event.find({
      $expr: {
        $or: [
          {
            $and: [
              { $gt: ['$start_date', new Date(new Date().getTime())] },
              { $lte: ['$start_date', new Date(new Date().getTime() + 1000 * 86400 * 30)] },
            ],
          },
          {
            $and: [
              {
                $lte: [
                  '$start_date', {
                    $add: [
                      '$$NOW', {
                        $multiply: [
                          1, 7 * 60 * 60000,
                        ],
                      },
                    ],
                  },
                ],
              }, {
                $gt: [
                  {
                    $add: [
                      '$start_date', {
                        $multiply: [
                          '$duration', 24 * 60 * 60000,
                        ],
                      },
                    ],
                  }, {
                    $add: [
                      '$$NOW', {
                        $multiply: [
                          1, 7 * 60 * 60000,
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    }, {
      volunteers: 0,
      donation_books: 0,
    }).sort({
      start_date: 1,
    })
    if (!req.query.no_org) {
      events = events.populate('organization_id', {
        admin: 0,
        list_blood_requests: 0,
      })
    }
    if (req.query.limit) {
      events = events.limit(parseInt(req.query.limit, 10))
    }
    events = await events.exec()
    return res.status(200).json(events)
  } catch (error) {
    return res.status(500).json(error)
  }
}

const getEventDetail = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
    return res.status(200).json(event)
  } catch (error) {
    return res.status(500).json(error)
  }
}

const getEventVolunteerId = async (req, res) => {
  try {
    const { volunteers } = await Event.findById(req.params.id).populate('volunteers').exec()
    return res.status(200).json(volunteers)
  } catch (error) {
    return res.status(500).json(error)
  }
}

const getAllEvent = async (req, res) => {
  try {
    const { _id } = req.user
    const { organization_id } = await User.findOne({ _id })
    const events = await Event.find({ organization_id }, {
      volunteers: 0,
    })
    return res.status(200).json(events)
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const EventController = {
  createEvent,
  getOngoingAndFutureEvent,
  updateEvent,
  deleteEvent,
  getEventDetail,
  getEventVolunteerId,
  getAllEvent,
}
