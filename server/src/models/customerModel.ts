import { ApplicationObjects } from "../entity/ApplicationObjeacts"

export class customerDetails {

    customerId: number

    customerName: string

    customerDetails: string

    contactNumber: string

    email: string

    birthDate: Date

    customerPhotoPath: string

    customerTypeId: number

    customerType: ApplicationObjects;

    isActive: boolean

    customerRoleId: number

    customerRole: ApplicationObjects;

    statusId: number

    createdBy: number

    createdAt: Date

    updatedBy: number

    updatedAt: Date

    userIpAddress: string
}
