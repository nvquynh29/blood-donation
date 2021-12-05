import { CheckCircleOutlined, CheckOutlined } from '@ant-design/icons'
import {
  Box,
  FormControl,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import React from 'react'
const questions = [
  {
    title: 'Trước đây bạn đã từng hiến máu chưa?',
    subquestion: [],
  },
  {
    title:
      'Quý vị đã từng mắc các bệnh  như  thần kinh, hô hấp, vàng da/viêm gan, tim mạch, huyết áp thấp/cao, bệnh thận, ho kéo dài, bệnh máu,  lao, ung thư,v.v??',
  },
  {
    title: 'Trong vòng 6 tháng gần đây, Quí vị có:',
    subquestion: [
      {
        title: 'Sút cân >= 4kg không rõ nguyên nhân? Nổi hạch kéo dài?',
      },
      {
        title: 'Phẫu thuật?',
      },
      {
        title: 'Xăm hình, xỏ lỗ tai, xỏ lỗ mũi,châm cứu?',
      },
      {
        title: 'Được truyền máu, chế phẩm máu?',
      },
      {
        title: 'Sử dụng ma túy, tiêm chích?',
      },
      {
        title:
          'Quan hệ tình dục với người nhiễm hoặc có nguy cơ nhiễm HIV/AIDS, viêm gan',
      },
      {
        title:
          'Quan hệ tình dục với nhiều người và/hoặc không có biện pháp an toàn tránh lây nhiễm?',
      },
      {
        title: 'Tiêm vác xin phòng bệnh?',
      },
      {
        title:
          'Có liên quan đến/ở vùng có dịch lưu hành(sốt xuất huyết, sốt rét, bò điên,...?',
      },
    ],
  },
  {
    title: 'Trong vòng 1 tuần gần đây, Quí vị có:',
    subquestion: [
      {
        title: 'Bị cúm, ho, nhức đầu, sốt?',
      },
      {
        title: 'Dùng thuốc khác sinh, Aspirin, Corticoid?',
      },
      {
        title: 'Xăm hình, xỏ lỗ tai, xỏ lỗ mũi,châm cứu?',
      },
      {
        title: 'Đi khám sức khỏe, làm xét nghiệm, chữa răng?',
      },
    ],
  },
  {
    title:
      ' Quý vị hiện là đối tượng tàn tật hoặc hưởng trợ cấp tàn tật hoặc nạn nhân chất độc màu da cam không?',
  },
]
function index() {
  const onChecked = (e) => {
    console.log(e.target.value)
  }
  return (
    <div>
      <Paper className="w-full px-3  ">
        <Box sx={{ flexGrow: 1 }} className="p-5 pb-10 flex flex-col ">
          <Typography variant="h4" className="mb-5 font-Dosis">
            Câu hỏi hiến máu
          </Typography>
          <div className="flex items-center">
            XIN QUÝ VỊ VUI LÒNG TÍCH DẤU{' '}
            {<CheckOutlined className="text-xl px-2" />} VÀO Ô
            {<CheckCircleOutlined className="text-xl px-2" />}THÍCH HỢP
          </div>
          <Typography variant="p" className="italic my-2 ">
            <span className="text-red-500 font-bold">Chú ý: </span>
            Để đảm bảo an toàn sức khỏe cho quý vị và người bệnh nhận máu, xin
            quý vị trả lời trung thực và chính xác. Nếu có bất cứ nghi ngờ nào
            về nguy cơ mắc bệnh lây truyền, XIN QUÝ VỊ HÃY KHÔNG HIẾN MÁU!
          </Typography>
          <hr className="h-[1px] bg-gray-900" />
          <div className="flex flex-col">
            {questions.map((item, index) => (
              <div key={index + item} className="">
                <Typography
                  variant="h5"
                  className="mb-2 flex text-xl justify-between font-Dosis break-words"
                >
                  <span className="font-bold">
                    <span>{index + 1}.</span> {item.title}
                    {/* {item.subquestion?.length} */}
                  </span>
                  {!item.subquestion || item.subquestion.length < 1 ? (
                    <FormControl required>
                      <RadioGroup
                        name={item.title}
                        required
                        class="flex !flex-row !flex-nowrap"
                      >
                        <Radio
                          defaultChecked={false}
                          value={true}
                          onChange={onChecked}
                        />
                        <Radio
                          defaultChecked={false}
                          value={false}
                          onChange={onChecked}
                        />
                      </RadioGroup>
                    </FormControl>
                  ) : null}
                </Typography>

                <div key={index + 1} className="">
                  {item.subquestion?.map((subitem, subindex) => (
                    <div key={subindex + index} className="flex flex-col">
                      <Typography
                        variant="h6"
                        className=" flex justify-between pl-5 text-[18px] font-Dosis"
                      >
                        <span className="font-[400]">
                          <span>{subindex + 1}.</span> {subitem.title}
                        </span>
                        {item.subquestion ? (
                          <FormControl>
                            <RadioGroup
                              required
                              name={subitem.title}
                              class="flex !flex-row !flex-nowrap"
                            >
                              <Radio
                                // name={index + '-' + subindex}
                                defaultChecked={false}
                                value={true}
                                onChange={onChecked}
                              />
                              <Radio
                                // name={index + '-' + subindex}
                                defaultChecked={false}
                                value={false}
                                onChange={onChecked}
                              />
                            </RadioGroup>
                          </FormControl>
                        ) : null}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Box>
      </Paper>
    </div>
  )
}

export default index
