export default (actions = {}) => (state = null, action = {}) => {
  const getState = () => state
  const transform = actions[action.type] || getState

  return transform(state)
}
