import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@mui/material'
import React, { useEffect, useState, memo, useRef } from 'react'
import { getAllProvinces } from '../../../api/province'

function ProvinceSelector(props) {
  const [localData, setLocalData] = useState({})
  const [provinces, setProvinces] = useState([])
  const [fliterProvince, setFliterProvince] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [formState, setFormState] = useState({})
  const ref = useRef()
  const getAllProvincesData = async () => {
    const res = await getAllProvinces()
    setProvinces(res.data)
    setFliterProvince(res.data)
  }

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
      formatSearch(item.name).includes(formatSearch(event.target.value)),
    )

    console.log(suggestedProvince)
    setFliterProvince(suggestedProvince)
  }
  useEffect(() => {
    getAllProvincesData()
  }, [])

  useEffect(() => {
    setLocalData(props.localStorageData)
  }, [props.localStorageData])

  const handleOnChange = (e) => {
    // changeOnlyLocal(e)
    e.preventDefault()
    e.stopPropagation()
    const { name, value } = e.target
    setLocalData({ ...localData, [name]: value })
    console.log({ [name]: value.name || value })
    setFormState((pre) => {
      props.onChange({
        ...Object.assign({}, pre),
        [name]: value.name || value,
      })
      return {
        ...Object.assign({}, pre),
        [name]: value.name || value,
      }
    })

    switch (name) {
      case `city_${props.ProvinceSelectorID}`:
        const prvData = provinces.find((item) => item.name === value).districts
        setDistricts(prvData)
        return
      case `district_${props.ProvinceSelectorID}`:
        const disData = districts.find((item) => item.name === value).wards
        setWards(disData)
        return
      case `ward_${props.ProvinceSelectorID}`:
        return
      default:
        break
    }
  }
  useEffect(() => {
    if (localData['city_' + props.ProvinceSelectorID]) {
      const currentProvince = provinces.find(
        (item) => item.name === localData['city_' + props.ProvinceSelectorID],
      )
      if (currentProvince) {
        setDistricts(currentProvince.districts)
      }
    }
  })
  useEffect(() => {
    const currentDistrict = districts.find(
      (item) => item.name === localData['district_' + props.ProvinceSelectorID],
    )
    if (currentDistrict) {
      setWards(currentDistrict.wards)
    }
  }, [districts])

  const stopImmediatePropagation = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }

  useEffect(() => {
    props.onChange(formState)
  }, [formState])
  return (
    <div>
      <Paper className="px-5 pb-10 pt-5 ">
        <span className=" text-[#888888] text-lg font-extrabold">
          {props.title}
        </span>
        {/* left form */}
        <div className="grid gap-3">
          {/* tinh thanh */}
          <FormControl fullWidth variant="standard" required>
            <InputLabel id="province-1">Tỉnh/Thành phố</InputLabel>
            <Select
              labelId="province-1"
              required
              disabled={props.disabled}
              variant="standard"
              className="w-full"
              displayEmpty
              onChange={handleOnChange}
              label="Tỉnh/Thành phố"
              {...(localData['city_' + props.ProvinceSelectorID]
                ? { value: localData['city_' + props.ProvinceSelectorID] }
                : { value: '' })}
              name={'city_' + props.ProvinceSelectorID}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: fliterProvince.length * 4.5,
                    minHeight: 100,
                  },
                },
              }}
            >
              <MenuItem
                // value=""
                onClickCapture={stopImmediatePropagation}
                className="sticky top-0 z-50 bg-opacity-100 !bg-white !shadow-md pb-3 !pt-0"
                onKeyDown={(e) => e.stopPropagation()}
                onChange={searchProvinces}
              >
                <Input
                  fullWidth
                  type="text"
                  variant="standard"
                  placeholder="Tìm kiếm"
                  className="w-full h-full bg-white"
                />
              </MenuItem>
              {fliterProvince.map((item) => (
                <MenuItem key={item.code} name={item.name} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* huyen  */}
          <FormControl fullWidth variant="standard" required>
            <InputLabel id="district-1">Huyện/Quận</InputLabel>
            <Select
              labelId="district-1"
              defaultValue=""
              required
              disabled={props.disabled}
              {...(localData['district_' + props.ProvinceSelectorID]
                ? { value: localData['district_' + props.ProvinceSelectorID] }
                : { value: '' })}
              onChange={handleOnChange}
              label="Huyện/Quận"
              name={'district_' + props.ProvinceSelectorID}
            >
              {districts.map((item) => (
                <MenuItem key={item.code} name={item.name} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* xa phuong */}
          <FormControl fullWidth variant="standard" required>
            <InputLabel id="ward-1">Xã/Phường</InputLabel>
            <Select
              disabled={props.disabled}
              labelId="ward-1"
              required
              {...(localData['ward_' + props.ProvinceSelectorID]
                ? { value: localData['ward_' + props.ProvinceSelectorID] }
                : { value: '' })}
              onChange={handleOnChange}
              label="Xã/Phường"
              name={'ward_' + props.ProvinceSelectorID}
            >
              {wards.map((item) => (
                <MenuItem key={item.code} name={item.name} value={item.name}>
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
              required
              disabled={props.disabled}
              name={'address_' + props.ProvinceSelectorID}
              label="Địa chỉ"
              {...(localData['address_' + props.ProvinceSelectorID]
                ? {
                    value: localData['address_' + props.ProvinceSelectorID],
                  }
                : { value: '' })}
              variant="standard"
              onChange={handleOnChange}
              required
            />
          </FormControl>
          <FormControl fullWidth variant="standard">
            <TextField
              className="pt-5"
              fullWidth
              disabled={props.disabled}
              {...(localData['fulladdress_' + props.ProvinceSelectorID]
                ? {
                    value: localData['fulladdress_' + props.ProvinceSelectorID],
                  }
                : { value: '' })}
              name={'fulladdress_' + props.ProvinceSelectorID}
              placeholder="Địa chỉ đầy đủ"
              variant="standard"
              onChange={handleOnChange}
              // error
            />
          </FormControl>
        </div>
      </Paper>
    </div>
  )
}

export default memo(ProvinceSelector)
