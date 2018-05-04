import { getInitialData } from '../utils/api'
import { receiveUsers } from './users'
import { receiveTweets } from './tweets'
import { setAuthedUser } from './authedUser'

const AUTHED_ID = 'dan_abramov'

export function handleInitialData() {
  return dispatch => {
    getInitialData().then(({ tweets, users }) => {
      dispatch(receiveTweets(tweets))
      dispatch(receiveUsers(users))
      dispatch(setAuthedUser(AUTHED_ID))
    })
  }
}
