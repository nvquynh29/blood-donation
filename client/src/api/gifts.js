import instance from './axios'

export const getAllGifts = async () => instance.get('/gift')
export const getGift = async (id) => instance.get(`/gift/${id}`)
export const addGift = (arg) => {
    const fd = new FormData()
    arg.img.fieldname = 'gift_image'
    fd.append('gift_image', arg.img)
    fd.append('name', arg.name)
    fd.append('type', arg.type)

    return instance.post('/gift',  fd, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
}

export const updateGift = (id, arg) => {
    const fd = new FormData()
    if (arg.img != undefined) {
      arg.img.fieldname = 'gift_image'
      fd.append('gift_image', arg.img)
    }
    fd.append('name', arg.name)
    fd.append('type', arg.type)
  
    return instance.put(`/gift/${id}`,  fd, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
  }

  export const deleteGift = (id) => instance.delete(`/gift/${id}`)
