<template>
  <div>
    <div class="columns">
      <div class="column">
        <div class="card">
          <div class="card-content dashb">
            <div class="content has-text-centered">
              <b-icon icon="hands" pack="fas" size="is-medium"> </b-icon>
              <hr />
              <h4 class="dashb has-text-weight-light">
                8 IPR Ditawarkan
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card">
          <div class="card-content dashb">
            <div class="content has-text-centered">
              <b-icon icon="pen-fancy" pack="fas" size="is-medium"> </b-icon>
              <hr />
              <h4 class="dashb has-text-weight-light">
                {{ submittedApplications.length }} IPR Dimohon
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card">
          <div class="card-content dashb">
            <div class="content has-text-centered">
              <b-icon icon="smile" pack="fas" size="is-medium"> </b-icon>
              <hr />
              <h4 class="dashb has-text-weight-light">0 IPR Lulus</h4>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card">
          <div class="card-content dashb">
            <div class="content has-text-centered">
              <b-icon icon="frown" pack="fas" size="is-medium"> </b-icon>
              <hr />
              <h4 class="dashb has-text-weight-light">
                0 IPR Ditolak
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card">
          <div class="card-content dashb">
            <div class="content has-text-centered">
              <b-icon icon="bell" pack="fas" size="is-medium"> </b-icon>
              <hr />
              <h4 class="dashb has-text-weight-light">
                0 Notifikasi
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <h1 class="has-text-weight-semibold">
          Senarai Program Layak Dimohon
        </h1>
      </div>
      <div class="column">
        <h1 class="has-text-weight-semibold">
          Senarai Program Dimohon
        </h1>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <a @click="isCardModalActive = true">
          <div class="card" aria-id="contentIdForA11y3">
            <div class="card-header" role="button">
              <p class="card-header-title">
                Skim Air Darul Ehsan
              </p>
            </div>
          </div>
        </a>

        <br />
        <a>
          <div class="card" aria-id="contentIdForA11y3" @click="linkKISS()">
            <div class="card-header" role="button">
              <p class="card-header-title">
                Kasih Ibu Smart Selangor (KISS)
              </p>
            </div>
          </div>
        </a>

        <br />
        <a>
          <div class="card" aria-id="contentIdForA11y3">
            <div class="card-header" role="button">
              <p class="card-header-title">
                Tabung Warisan Anak Selangor (TAWAS)
              </p>
            </div>
          </div>
        </a>

        <br />
        <a>
          <div class="card" aria-id="contentIdForA11y3">
            <div class="card-header" role="button">
              <p class="card-header-title">
                Skim Mesra Usia Emas (SMUE)
              </p>
            </div>
          </div>
        </a>

        <br />
        <a>
          <div class="card" aria-id="contentIdForA11y3">
            <div class="card-header" role="button">
              <p class="card-header-title">
                Skim Kesihatan Wanita (Mammosel)
              </p>
            </div>
          </div>
        </a>

        <br />
        <a>
          <div class="card" aria-id="contentIdForA11y3">
            <div class="card-header" role="button">
              <p class="card-header-title">
                Bantuan Sihat Selangor
              </p>
            </div>
          </div>
        </a>

        <br />
        <a>
          <div class="card" aria-id="contentIdForA11y3">
            <div class="card-header" role="button">
              <p class="card-header-title">
                Skim Rumah Selangorku
              </p>
            </div>
          </div>
        </a>

        <br />
        <a>
          <div class="card" aria-id="contentIdForA11y3">
            <div class="card-header" role="button">
              <p class="card-header-title">
                Skim Peduli Sihat (SPS)
              </p>
            </div>
          </div>
        </a>

        <b-modal :active.sync="isCardModalActive" :width="640" scroll="keep">
          <div class="card">
            <div class="card-image">
              <figure class="image">
                <img src="~assets/img/SADE_banner.jpg" alt="Image" />
              </figure>
            </div>
            <div class="card-content">
              <div class="content" style="max-height: 300px; overflow: auto;">
                <p class="title is-5">Syarat Permohonan</p>

                <ul>
                  <li>
                    Pemohon mestilah warganegara Malaysia dan menetap di Negeri
                    Selangor.
                  </li>
                  <li>
                    Pendapatan bulanan isi rumah RM4,000.00 dan ke bawah
                    (pendapatan suami dan isteri, tiada pasangan, atau bujang).
                  </li>
                  <li>
                    Premis kediaman adalah meter individu dan meter pukal
                    (Pangsapuri Kos Rendah)
                  </li>
                  <li>
                    Penghuni Pangsapuri Kos Rendah yang menerima bekalan air
                    melalui meter pukal perlu mendapat pengesahan Badan
                    Pengurusan Bersama (JMB) / Perbadanan Pengurusan (MC)
                  </li>
                  <li>
                    Pemohon hanya layak memohon satu akaun/premis sahaja
                  </li>
                </ul>
              </div>
            </div>
            <footer class="card-footer">
              <a
                v-if="submittedApplications.length < 1"
                class="card-footer-item"
                @click="isCardModalActive = !isCardModalActive"
                >Tutup</a
              >
              <nuxt-link
                v-if="submittedApplications.length < 1"
                class="card-footer-item"
                to="/ipr/SADE"
              >
                Mohon
              </nuxt-link>
            </footer>
          </div>
        </b-modal>
      </div>
      <div class="column">
        <div
          v-if="submittedApplications.length < 1"
          class="card"
          aria-id="contentIdForA11y3"
        >
          <div class="card-header" role="button">
            <p class="card-header-title">
              Tiada
            </p>
          </div>
        </div>
        <div
          v-for="ipr in submittedApplications"
          :key="ipr"
          class="card"
          aria-id="contentIdForA11y3"
        >
          <div class="card-header" role="button">
            <p class="card-header-title level">
              <span class="level-left">
                {{ iprList.find(item => ipr.ipr_code === item.id).name }}</span
              >
              <span class="tag is-info level-right">Dalam Proses</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
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
    return {
      isCardModalActive: false,
      submittedApplications: this.currentUser.dockets,
      iprList: [
        { id: 'KISS', name: 'Kasih Ibu Smart Selangor' },
        { id: 'AIR_SELANGOR', name: 'Skim Air Darul Ehsan' }
      ]
    }
  },
  methods: {
    linkKISS() {
      this.$router.push('/ipr/KISS')
    }
  }
}
</script>

<style scoped>
.mt3rem {
  margin-top: 3rem;
}
.card-content.dashb {
  padding: 1rem;
}
h4.dashb {
  margin-bottom: 0;
}
</style>
