import { Box, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Radio, Input, Space } from 'antd'
import { CheckCircleOutlined, CheckCircleTwoTone } from '@ant-design/icons'
const gifts = [
  {
    id: 3,
    imgURl:
      'https://media.istockphoto.com/photos/teddy-bear-with-a-red-heart-isolated-over-white-background-valentines-picture-id1291681199?b=1&k=20&m=1291681199&s=170667a&w=0&h=YZ72DAEjZ3T5wNt1vBK7eZeVLRnAFH_jKC5-E1xsG6Q=',
    name: 'Qua 250cc',
    type: '250',
  },
  {
    id: 6,
    imgURl:
      'https://media.istockphoto.com/photos/teddy-bear-with-a-red-heart-isolated-over-white-background-valentines-picture-id1291681199?b=1&k=20&m=1291681199&s=170667a&w=0&h=YZ72DAEjZ3T5wNt1vBK7eZeVLRnAFH_jKC5-E1xsG6Q=',
    name: 'Qua 350cc',
    type: '350',
  },
  {
    id: 2,
    imgURl:
      'https://media.istockphoto.com/photos/teddy-bear-with-a-red-heart-isolated-over-white-background-valentines-picture-id1291681199?b=1&k=20&m=1291681199&s=170667a&w=0&h=YZ72DAEjZ3T5wNt1vBK7eZeVLRnAFH_jKC5-E1xsG6Q=',
    name: 'Qua 250cc',
    type: '250',
  },
  {
    id: 3,
    imgURl:
      'https://media.istockphoto.com/photos/teddy-bear-with-a-red-heart-isolated-over-white-background-valentines-picture-id1291681199?b=1&k=20&m=1291681199&s=170667a&w=0&h=YZ72DAEjZ3T5wNt1vBK7eZeVLRnAFH_jKC5-E1xsG6Q=',
    name: 'Qua 450cc',
    type: '450',
  },
  {
    id: 1,
    imgURl:
      'https://media.istockphoto.com/photos/teddy-bear-with-a-red-heart-isolated-over-white-background-valentines-picture-id1291681199?b=1&k=20&m=1291681199&s=170667a&w=0&h=YZ72DAEjZ3T5wNt1vBK7eZeVLRnAFH_jKC5-E1xsG6Q=',
    name: 'Qua 350cc',
    type: '350',
  },
]

function Gifts(props) {
  const [selected, setSelected] = useState(0)
  const [filter, setFilter] = useState(props.capacity || '')
  const [filteredGifts, setFilteredGifts] = useState([])
  const giftFilter = (value) => {
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
    setFilteredGifts(giftFilter(props.capacity))
  }, [props.capacity])
  return (
    <div>
      <Box sx={{ flexGrow: 1 }} className="my-10 ">
        <Radio.Group onChange={onSelect} value={selected} name="selectGift">
          <Space className="!grid !justify-center xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 !gap-5">
            {filteredGifts.map(
              (item, index) =>
                item.imgURl && (
                  <Radio.Button
                    key={index}
                    value={item.id}
                    className="!h-0 !border-none !p-0 !m-0"
                  >
                    <Paper {...(item.id === selected ? { elevation: 15 } : {})}>
                      <Box>
                        <div
                          className={`${
                            item.id === selected
                              ? 'absolute font-Dosis right-3 top-1 animate-bounce'
                              : 'hidden'
                          }`}
                        >
                          <CheckCircleTwoTone
                            className="text-xl"
                            twoToneColor="#1976d2"
                          />
                        </div>
                        <img src={item.imgURl} alt="" />
                        <Typography variant="h6" className="text-center">
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
