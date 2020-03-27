<template>
  <div class="columns is-gapless">
    <b-loading
      :is-full-page="true"
      :active.sync="isLoading"
      :can-cancel="true"
    ></b-loading>

    <div class="column is-half">
      <div class="hero is-danger is-fullheight with-bg is-hidden-mobile">
        <div class="hero-body"></div>
      </div>
    </div>
    <div class="column is-half">
      <div class="hero is-white h100vh overflowauto">
        <div class="hero-head">
          <nav class="navbar has-shadow">
            <div class="navbar-brand logo-top">
              <nuxt-link class="navbar-item" to="/">
                <img src="~assets/img/logo-ssipr.png" alt="Logo" />
              </nuxt-link>

              <span
                :class="{ 'is-active': showNav }"
                @click="showNav = !showNav"
                class="navbar-burger burger"
                data-target="navbarMenuHeroA"
              >
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
            <!-- <div class="navbar-menu" :class="{ 'is-active': showNav }">
              <div class="navbar-end">
                <nuxt-link class="navbar-item" :to="authBtn[1]">
                  {{ authBtn[0] }}
                </nuxt-link>
                  <b-dropdown
                  hoverable
                  position="is-bottom-left"
                  aria-role="menu"
                >
                  <a slot="trigger" class="navbar-item" role="button">
                    <span class="is-uppercase">{{ currLocale }}</span>
                    <b-icon icon="menu-down"></b-icon>
                  </a>
                  <nuxt-link class="navbar-item" :to="switchLocalePath('my')">
                    {{ $t('l.my') }}
                  </nuxt-link>
                  <nuxt-link class="navbar-item" :to="switchLocalePath('en')">
                    {{ $t('l.en') }}
                  </nuxt-link>
                </b-dropdown> 
              </div>
            </div> -->
          </nav>
          <!-- <span class="tag is-light" style="margin-top:5px; margin-left:2.5px;"
            >Skim Air Darul Ehsan</span
          > -->
        </div>
        <div class="hero-body">
          <div class="container">
            <div class="columns">
              <nuxt />
            </div>
          </div>
        </div>

        <div class="notice-wrap">
          <div class="notice-reso">
            Paparan terbaik menggunakan Google Chrome 79 dan Mozilla Firefox 72
            <br />
            dengan resolusi melebihi 1200 x 1024.
          </div>
          <div class="notice-update">
            KEMASKINI TERAKHIR: <b>26 MARCH 2020</b>
          </div>
        </div>
        <div class="hero-foot">
          <footer class="footer footpad has-text-centered">
            <div class="content">
              <p>© 2020 <strong>SSIPR</strong> {{ $t('l.copyright') }}</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      showNav: false
    }
  },
  computed: {
    ...mapGetters({
      authBtn: 'auth_layout/authBtn',
      isLoading: 'loader/isLoading'
    }),
    currLocale() {
      return 'my'
    }
  }
}
</script>
<style scoped>
.with-bg {
  background: url('~assets/img/checking-sade.jpg');
  background-size: 100%;
  background-repeat: no-repeat;
}
.footpad {
  padding: 1rem;
}
.h100vh {
  height: 100vh;
}
.overflowauto {
  overflow: auto;
}
.loginbtn {
  padding: 10px 0;
}
.hero-body {
  padding: 1rem 1.5rem;
}
.semakan-wrap {
  padding: 50px;
}
.navbar-item img {
  max-height: 80px !important;
}
.logo-top {
  margin: auto;
}
.notice-icon img {
  width: 30px;
}
.notice-icon li {
  display: inline-table;
}
.notice-wrap {
  text-align: center;
  padding: 40px;
}
.notice-sub {
  border-top: 1px solid #eaeaea;
  padding-top: 15px;
  width: 70%;
  text-transform: uppercase;
  margin: 15px auto 0px auto;
}
.modal.is-full-screen > .animation-content {
  width: 45%;
  margin: 50px 0px;
  background: #ffffff;
}
.card.result-search {
  background: transparent;
  box-shadow: none;
}
.card.result-search .card-footer {
  display: none;
}
.notice-reso {
  font-size: 14px;
  margin-bottom: 10px;
}
.modal.is-full-screen > .animation-content {
  width: 50%;
  height: auto;
  max-height: initial;
  background: #fff;
}
@media only screen and (max-width: 768px) {
  .semakan-wrap {
    padding: 20px;
  }
  .navbar-item img {
    max-height: 50px !important;
  }
}
</style>
