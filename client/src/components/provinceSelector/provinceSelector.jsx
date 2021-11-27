import { Input, FormControl, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material'
import React, { useState, useEffect, useRef } from 'react'
import { getAllProvinces } from '../../../api/province'

function ProvinceSelector() {
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])

  const [formState, setFormState] = useState({})
  const ref = useRef()
  ref.current = formState
  const getAllProvincesData = async () => {
    const res = await getAllProvinces()
    setProvinces(res.data)
  }
  // function search() {
  //   input = document.getElementById('myInput')
  //   filter = input.value

  //   for (i = 0; i < tr.length; i++) {
  //     td = tr[i].getElementsByTagName('td')[1]
  //     if (td) {
  //       txtValue = td.textContent || td.innerText
  //       if (
  //         txtValue
  //           .toUpperCase()
  //           .normalize('NFD')
  //           .replace(/[\u0300-\u036f]/g, '')
  //           .replace(/đ/g, 'd')
  //           .replace(/Đ/g, 'D')
  //           .indexOf(filter) > -1
  //       ) {
  //         tr[i].style.display = ''
  //       } else {
  //         tr[i].style.display = 'none'
  //       }
  //     }
  //   }
  // }
  const formatSearch = (text) => {
    return text
      .toUpperCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .trim()
  }

  const searchProvinces = (event) => {
    const suggestedProvince = provinces.filter((item) =>
      formatSearch(item.name).includes(formatSearch(event.target.value))
    )

    console.log(suggestedProvince)
  }
  useEffect(() => {
    getAllProvincesData()
  }, [])

  const handleOnChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    setFormState((pre) => ({ ...Object.assign({}, pre), [name]: value }))
    switch (name) {
      case 'city':
        setDistricts(value.districts ?? [])
        return
      case 'district':
        setWards(value.wards ?? [])
        return
      case 'ward':
        return
      default:
        break
    }
  }
  useEffect(() => {
    // console.log(formState)
  }, [formState])
  return (
    <div>
      <Paper className="px-5 py-10 ">
        {/* left form */}
        <div className="grid gap-3">
          {/* tinh thanh */}
          <FormControl fullWidth variant="standard" required>
            <InputLabel id="province-1">Tỉnh/Thành phố*</InputLabel>

            <Select
              labelId="province-1"
              defaultValue=""
              // value={formState?.city?.name || 'helllo'}
              onChange={handleOnChange}
              label="Tỉnh/Thành phố*"
              name="city"
            >
              <Input fullWidth type="text" variant="standard" disabled placeholder="Tìm kiếm" />
              {provinces.map((item) => (
                <MenuItem key={item.code} name={item.name} value={item}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* huyen  */}
          <FormControl fullWidth variant="standard" required>
            <InputLabel id="district-1">Huyện/Quận*</InputLabel>
            <Select
              labelId="district-1"
              defaultValue=""
              // value={currentDistrict.name}
              onChange={handleOnChange}
              label="Huyện/Quận*"
              name="district"
            >
              {districts.map((item) => (
                <MenuItem key={item.code} name={item.name} value={item}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* xa phuong */}

          <FormControl fullWidth variant="standard" required>
            <InputLabel id="ward-1">Xã/Phường*</InputLabel>
            <Select
              labelId="ward-1"
              defaultValue=""
              // value={currentWard.name}
              onChange={handleOnChange}
              label="Xã/Phường*"
              name="ward"
            >
              {wards.map((item) => (
                <MenuItem key={item.code} name={item.name} value={item}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* dia chi cu the */}
          <FormControl fullWidth variant="standard" required>
            <TextField
              className="pt-2"
              fullWidth
              name="address"
              label="Địa chỉ*"
              variant="standard"
              onChange={handleOnChange}
              defaultValue=""
            />
          </FormControl>
          <FormControl fullWidth variant="standard">
            <TextField
              className="pt-5"
              fullWidth
              name="fulladdress"
              placeholder="Địa chỉ đầy đủ"
              variant="standard"
              onChange={handleOnChange}
              defaultValue=""
            />
          </FormControl>
        </div>
      </Paper>
    </div>
  )
}

export default ProvinceSelector
