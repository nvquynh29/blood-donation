import path from 'path'
import fs from 'fs'
import Gift from '../models/Gift.js'

const getAllGift = async (req, res) => {
  try {
    const gifts = await Gift.find({})
    return res.status(200).json(gifts)
  } catch (error) {
    return res.status(500).json(error)
  }
}

const addGift = async (req, res) => {
  try {
    console.log(req.body)
    console.log(req.file)
    const newGift = new Gift({
      name: req.body.name,
      type: req.body.type,
      image_path: req.file.path,
    })
    const result = await newGift.save()
    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json(error)
  }
}
const updateGift = async (req, res) => {
  try {
    const updateInput = {
      name: req.body.name,
      type: req.body.type,
    }
    if (req.file) {
      const { image_path } = await Gift.findById(req.params.id)
      const giftUseSameImg = await Gift.find({ image_path })
      if (giftUseSameImg.length <= 1) {
        fs.unlink(path.join(path.resolve(), image_path), (err) => {
          if (err) return console.log(err)
          console.log('file deleted successfully')
        })
      }
      updateInput.image_path = req.file.path
    }

    const gift = await Gift.findOneAndUpdate(
      { _id: req.params.id },
      updateInput,
      { new: true },
    )
    return res.status(200).json(gift)
  } catch (error) {
    return res.status(500).json(error)
  }
}
const getGift = async (req, res) => {
  try {
    const gift = await Gift.findById(req.params.id)
    return res.status(200).json(gift)
  } catch (error) {
    return res.status(500).json(error)
  }
}

const deleteGift = async (req, res) => {
  try {
    const { image_path } = await Gift.findById(req.params.id)
    const giftUseSameImg = await Gift.find({ image_path })
    if (giftUseSameImg.length <= 1) {
      fs.unlink(path.join(path.resolve(), image_path), (err) => {
        if (err) return console.log(err)
        console.log('file deleted successfully')
      })
    }
    const result = await Gift.findOneAndDelete({ _id: req.params.id })
    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const GiftController = {
  getAllGift,
  addGift,
  updateGift,
  deleteGift,
  getGift,
}
