export const state = () => ({
  application: null
})

export const mutations = {
  setApplication(s, p) {
    s.application = p
  }
}

export const actions = {
  async create({ commit, dispatch }, params) {
    try {
      const { data } = await this.$axios.post('/api/v1/applications', params)
      commit('setApplication', data.data)

      return { error: false }
    } catch (err) {
      return { error: true, errors: err.response.data.errors }
    }
  }
}

export const getters = {
  application: s => {
    return s.application
  }
}
