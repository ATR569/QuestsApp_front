import { notification } from 'antd'
import { ApiException } from '../domain/exceptions/exception'

interface INotificationBody {
    message?: string
    description?: string
}

const openNotification = (type: string, body: INotificationBody) => {
    notification[type]({
        ...body
    })
}

export const openErrorNotification = (json: any) => {
    const exception = new ApiException().fromJSON(json)
    
    const notificationBody: INotificationBody = {
        message: exception.message,
        description: exception.description
    }

    return openNotification('error', notificationBody)
}

export const openSuccessNotification = (message: string) => {
    const notificationBody: INotificationBody = {
        message
    }

    return openNotification('success', notificationBody)
}

 