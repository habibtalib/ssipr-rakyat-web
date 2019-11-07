<template>
  <aside class="menu">
    <p class="menu-label">
      Menu
    </p>
    <ul class="menu-list">
      <li>
        <nuxt-link to="/account" exact-active-class="is-active">
          Dashboard
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/account/profile" exact-active-class="is-active">
          Profil
        </nuxt-link>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  props: {
    currentUser: {
      type: Object,
      required: true
    },
    isVerifiedApplicant: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
