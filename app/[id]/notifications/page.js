import { authApi } from '../../../src/axiosApiBoilerplates/authApi'
import Notifications from '../../../src/components/notifications_components/Notifications'
import { getServerAuthToken } from '../../../src/utils/auth.server'
import {redirect} from "next/navigation"
import logger from '../../../src/utils/logger'

const NotificationsPage = async({searchParams}) => {
	const sParams = await searchParams
	if (!sParams?.status) redirect("?status=unread")
  const token = await getServerAuthToken()
  const notifications = await authApi(token).get("/notifications")
  logger.log("Notifications Logs", notifications.data)

  return (
    <>
    <Notifications notifications={notifications?.data ?? []} />
    </>
  )
}

export default NotificationsPage