import instance from './axios'

export const getOrganization = (id) => {
  return instance.get(`/organization/${id}`)
}
export const getAdmins = () => instance.get('/organization/admins')
export const getDashbroad = () => instance.get('/organization/dashboard')
export const getOrgAdmins = (id) => instance.get(`/organization/admins/${id}`)
export const getAllOrganizations = () => instance.get('/organization')
export const getFile = (url) => instance.get('/getFile', url)
export const addOrganization = (arg) => {
  const fd = new FormData()
  arg.img_path.fieldname = 'organization_image'
  fd.append('organization_image', arg.img_path)
  fd.append('name', arg.name)
  fd.append('isBloodBank', arg.is_blood_bank)
  fd.append('address', arg.address)
  fd.append('description', arg.description)

  return instance.post('/organization', fd, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
export const updateOrganization = (id, arg) => {
  const fd = new FormData()
  if (arg.img_path != undefined) {
    arg.img_path.fieldname = 'organization_image'
    fd.append('organization_image', arg.img_path)
  }
  fd.append('name', arg.name)
  fd.append('isBloodBank', arg.is_blood_bank)
  fd.append('address', arg.address)
  fd.append('description', arg.description)

  return instance.put(`/organization/${id}`, fd, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const deleteOrganization = (id) => instance.delete(`/organization/${id}`)
