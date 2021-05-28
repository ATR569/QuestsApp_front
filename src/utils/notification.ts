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

export const openErrorNotification = (err: any) => {
    let exception: ApiException

    if (err !== undefined && err.response !== undefined && err.response.data !== undefined)
        exception = new ApiException().fromJSON(err.response.data)
    else
        exception = new ApiException().fromJSON({})
    
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
 