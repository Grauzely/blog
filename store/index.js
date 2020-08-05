export const state = () => ({
  valueSearch: null,
})

export const mutations = {
  SET_VALUE_SEARCH(state, valueSearch) {
    state.valueSearch = valueSearch
  },
}

export const getters = {
  getValueSearch: (state) => () => state.valueSearch,
}
