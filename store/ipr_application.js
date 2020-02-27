export const state = () => ({
  application: null,
  tawas: null,
  emas: null,
  skw: null,
  airSelangor: null
})

export const mutations = {
  setApplication(s, p) {
    s.application = p
  },
  setTawas(s, p) {
    s.tawas = p
  },
  setEmas(s, p) {
    s.emas = p
  },
  setSkw(s, p) {
    s.skw = p
  },
  setAirSelangor(s, p) {
    s.airSelangor = p
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
  },
  async checkTawas({ commit, dispatch }, params) {
    try {
      const { data } = await this.$axios.get(
        `http://ssipr-yawas-api-dev.ap-southeast-1.elasticbeanstalk.com/pawas/${params}`
      )
      commit('setTawas', data.data)

      return { error: false }
    } catch (err) {
      return { error: true, errors: err.response.data.errors }
    }
  },
  async checkEmas({ commit, dispatch }, params) {
    try {
      const { data } = await this.$axios.get(
        `http://ssipr-yawas-api-dev.ap-southeast-1.elasticbeanstalk.com/pawas/${params}`
      )
      commit('setEmas', data.data)

      return { error: false }
    } catch (err) {
      return { error: true, errors: err.response.data.errors }
    }
  },
  async checkSkw({ commit, dispatch }, params) {
    try {
      const { data } = await this.$axios.get(
        `http://ssipr-yawas-api-dev.ap-southeast-1.elasticbeanstalk.com/skw/${params}`
      )
      commit('setSkw', data.data)

      return { error: false }
    } catch (err) {
      return { error: true, errors: err.response.data.errors }
    }
  },
  async checkAirSelangor({ commit, dispatch }, params) {
    try {
      const { data } = await this.$axios.get(
        `http://ssipr-yawas-api-dev.ap-southeast-1.elasticbeanstalk.com/sade/${params}`
      )
      commit('setAirSelangor', data)

      return { error: false }
    } catch (err) {
      return { error: true, errors: err.response.data.errors }
    }
  }
}

export const getters = {
  application: s => {
    return s.application
  },
  tawas: s => {
    return s.tawas
  },
  emas: s => {
    return s.emas
  },
  skw: s => {
    return s.skw
  },
  airSelangor: s => {
    return s.airSelangor
  }
}
