<template>
  <nav
    id="fixedNav"
    class="navbar has-background-white has-shadow is-fixed-top"
  >
    <div class="container">
      <div class="navbar-brand">
        <nuxt-link class="navbar-item" to="/account">
          <img src="~assets/img/ssiprlogo1.png" class="kreatifmarket" />
        </nuxt-link>
        <span class="navbar-burger burger" data-target="navbarMenu">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
      <div id="navbarMenu" class="navbar-menu">
        <div class="navbar-end nav-spacer">
          <b-dropdown position="is-bottom-left" aria-role="menu">
            <a slot="trigger" class="navbar-item" role="button">
              <span>{{ currentUser.email }}</span>
              <b-icon icon="menu-down"></b-icon>
            </a>
            <b-dropdown-item aria-role="listitem" @click="logout()">
              Logout
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    currentUser: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {
    logout() {
      this.$store.dispatch('applicant/logout')
      this.$router.push('/')
    }
  }
}
</script>
