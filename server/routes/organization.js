import express from 'express'
import { OrganizationController } from '../controllers/OrganizationController.js'

const organizationRouter = express.Router()
organizationRouter.post('/',  OrganizationController.createOrganization)

export default organizationRouter 