import { setSelectedStoreId, setStores } from "../store/storeSlice"
import { setUser } from "../user/userSlice"
import { logOut } from "./authSlice"

export const appLogOut = (dispatch: any) => {
  dispatch(setUser({ email: null, username: null, uuid: null }))
  dispatch(setSelectedStoreId(null))
  dispatch(setStores([]))
  dispatch(logOut())
}