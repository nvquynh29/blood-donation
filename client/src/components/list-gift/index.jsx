import { CheckCircleTwoTone } from '@ant-design/icons'
import { Box, Paper, Typography } from '@mui/material'
import { Radio, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { env } from '../../../next.config'
import { getAllGifts } from '../../api/gifts'

function Gifts(props) {
  const [selected, setSelected] = useState(0)
  const [gifts, setGifts] = useState([])

  const [filteredGifts, setFilteredGifts] = useState([])
  const giftFilter = (value) => {
    if (value === '') return gifts
    return gifts.filter((gift) => gift.type === value)
  }
  const onSelect = (e) => {
    const { name, value } = e.target
    const step2 = JSON.parse(localStorage.getItem('step2'))
    localStorage.setItem(
      'step2',
      JSON.stringify({
        ...step2,
        [name]: value,
      }),
    )
    setSelected(value)
  }

  useEffect(() => {
    setFilteredGifts(giftFilter(props.amount))
  }, [props.amount, gifts])
  useEffect(() => {
    const getGifts = async () => {
      const res = await getAllGifts()
      setGifts(res.data)
    }
    getGifts()
  }, [])
  return (
    <div>
      <Box sx={{ flexGrow: 1 }} className="my-10 ">
        <Radio.Group onChange={onSelect} value={selected} name="selectGift">
          <Space className="!grid !justify-center xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 !gap-5">
            {filteredGifts.map(
              (item, index) =>
                item.image_path && (
                  <Radio.Button
                    key={index}
                    value={item._id}
                    className="!h-0 !border-none !p-0 !m-0"
                  >
                    <Paper
                      {...(item._id === selected ? { elevation: 15 } : {})}
                    >
                      <Box>
                        <div
                          className={`${
                            item._id === selected
                              ? 'absolute font-Dosis right-3 top-1 animate-bounce'
                              : 'hidden'
                          }`}
                        >
                          <CheckCircleTwoTone
                            className="text-xl"
                            twoToneColor="#1976d2"
                          />
                        </div>
                        <img
                          class="w-full object-contain max-h-64 h-full "
                          style={{
                            width: 'fit-content',
                          }}
                          src={
                            item.image_path
                              ? `${env.API_URL}/getFile?img_path=${item.image_path}`
                              : '../images/slider-1.jpg'
                          }
                          alt="Man looking at item at a store"
                        />
                        <Typography
                          variant="h6"
                          className="text-center font-Dosis"
                        >
                          {item.name}
                        </Typography>
                      </Box>
                    </Paper>
                  </Radio.Button>
                ),
            )}
          </Space>
        </Radio.Group>
      </Box>
    </div>
  )
}

export default Gifts
