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
                1 IPR Ditawarkan
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
        <div v-for="(ipr, index) in iprList" :key="index">
          <div
            v-if="!checkApplication(ipr, submittedApplications)"
            @click="openModal(ipr)"
          >
            <div class="card" aria-id="contentIdForA11y3">
              <div class="card-header" role="button">
                <p class="card-header-title">
                  {{ ipr.name }}
                </p>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="card test" aria-id="contentIdForA11y3">
              <div class="card-header" role="button">
                <p class="card-header-title">
                  {{ ipr.name }}
                </p>
              </div>
            </div>
          </div>
          <br />
        </div>
        <b-modal :active.sync="isCardModalActive" :width="640" scroll="keep">
          <div class="card">
            <div class="card-image">
              <figure class="image">
                <img src="~assets/img/SADE_banner.jpg" alt="Image" />
              </figure>
            </div>
            <div v-if="activeIPR" class="card-content">
              <div class="content" style="max-height: 300px; overflow: auto;">
                <span v-html="activeIPR.body"></span>
              </div>
            </div>
            <footer class="card-footer">
              <a
                class="card-footer-item"
                @click="isCardModalActive = !isCardModalActive"
                >Tutup</a
              >
              <!-- <nuxt-link
                v-if="activeIPR && !checkApplication(submittedApplications)"
                class="card-footer-item"
                to="/ipr/SADE"
              >
              </nuxt-link> -->
              <a
                v-if="activeIPR && activeIPR.available"
                class="card-footer-item"
                @click="apply(activeIPR)"
                >Mohon</a
              >
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
        <div v-for="ipr in submittedApplications" :key="ipr">
          <div class="card" aria-id="contentIdForA11y3">
            <div class="card-header" role="button">
              <p class="card-header-title level">
                <span class="level-left">
                  {{
                    iprList.find(item => ipr.ipr_code === item.id).name
                  }}</span
                >
                <span class="tag is-info level-right">Dalam Proses</span>
              </p>
            </div>
          </div>
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from 'buefy/dist/components/dialog'
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
      activeIPR: null,
      iprList: [
        {
          id: 'AIR_SELANGOR',
          name: 'Skim Air Darul Ehsan',
          requireForm: true,
          formRoute: '/ipr/SADE',
          available: true,
          body:
            '<p class="title is-5">Syarat Permohonan</p>' +
            '  <ul>' +
            '    <li>' +
            '      Pemohon mestilah warganegara Malaysia dan menetap di Negeri' +
            '      Selangor.' +
            '    </li>' +
            '    <li>' +
            '      Pendapatan bulanan isi rumah RM4,000.00 dan ke bawah' +
            '      (pendapatan suami dan isteri, tiada pasangan, atau bujang).' +
            '    </li>' +
            '    <li>' +
            '      Premis kediaman adalah meter individu dan meter pukal' +
            '      (Pangsapuri Kos Rendah)' +
            '    </li>' +
            '    <li>' +
            '      Penghuni Pangsapuri Kos Rendah yang menerima bekalan air' +
            '      melalui meter pukal perlu mendapat pengesahan Badan' +
            '      Pengurusan Bersama (JMB) / Perbadanan Pengurusan (MC)' +
            '    </li>' +
            '    <li>' +
            '      Pemohon hanya layak memohon satu akaun/premis sahaja' +
            '    </li>' +
            '  </ul>',
          img: '_nuxt/assets/img/SADE_banner.jpg'
        },
        {
          id: 'SPS',
          name: 'Skim Peduli Sihat (SPS)',
          requireForm: false,
          url: 'https://www.pedulisihat.com/pendaftaran.html',
          available: true,
          body:
            '<p class="title is-5">Syarat Permohonan</p>' +
            '  <ul>' +
            '    <li>' +
            '      Warganegara Malaysia.' +
            '    </li>' +
            '    <li>' +
            '      Lahir di Negeri Selangor atau telah mentap di Selangor melebihi 10 tahun.' +
            '    </li>' +
            '    <li>' +
            '      Pendapatan bulanan isi rumah tidak melebehi RM2,000.00 (Keluarga) atau RM1,500.00 (Individu).' +
            '    </li>' +
            '    <li>' +
            '      Telah berdaftar dengan eKasih dan Bantuan Sara Hidup.' +
            '    </li>' +
            '  </ul>'
        },
        {
          id: 'SRS',
          name: 'Skim Rumah Selangorku',
          url: ' https://ehartanah.lphs.gov.my/index.php?opt=newuser_new',
          requireForm: false,
          available: true,
          body:
            '<p class="title is-5">Syarat Permohonan</p>' +
            '  <ul>' +
            '    <li>' +
            '      Warga Selangor yang layak boleh memohon untuk memiliki sebuah rumah sendiri bernilai tidak melebihi RM250,000 melalui Skim Rumah Selangorku.' +
            '    </li>' +
            '    <li>' +
            '      Warganegara Malaysia berumur 18 tahun ke atas' +
            '    </li>' +
            '    <li>' +
            '      Pendapatan minimum bagi permohonan Rumah Selangorku Jenis B, C dan D ditetapkan RM3001.00 sebulan' +
            '    </li>' +
            '    <li>' +
            '      Pendapatan isi rumah (suami dan isteri):' +
            '      <ul>' +
            '       <li>' +
            '         Tidak melebihi RM3,000 sebulan dibenarkan permohonan Jenis A' +
            '       </li>' +
            '       <li>' +
            '         Pendapatan isi rumah diantara RM3,001 sehingga RM10,000 sebulan dibenarkan permohonan Jenis B, C dan D ' +
            '       </li>' +
            '       <li>' +
            '         Sekiranya pendapatan isi rumah tidak melebihi RM3,000 sebulan adalah dibenarkan juga membuat pilihan Jenis ' +
            '         B, C atau D. Bagi pendapatan isi rumah melebihi RM 3,001 sebulan, permohonan Jenis A tidak dibenarkan ' +
            '       </li>' +
            '      </ul>' +
            '    </li>' +
            '    <li>' +
            '      Pemohon hanya dibenarkan membuat pilihan 1 jenis rumah sahaja sama ada jenis A, B, C, atau D semasa membuat permohonan' +
            '    </li>' +
            '    <li>' +
            '      Pemohon atau pasangan belum memiliki rumah sama ada melalui projek kerajaan atau swasta di Selangor' +
            '    </li>' +
            '    <li>' +
            '      Permohonan pindah-milik hanya dibenarkan memohon selepas 5 tahun dari Perjanjian Jual-Beli dengan kebenaran Pihak Berkuasa Negeri' +
            '    </li>' +
            '    <li>' +
            '      Pembelian rumah untuk didiami dan bukan untuk disewa' +
            '    </li>' +
            '    <li>' +
            '      Tempoh sah laku bagi setiap permohonan yang didaftarkan adalah selama 2 tahun. Selepas tempoh tersebut data permohonan yang masih didalam SENARAI MENUNGGU akan dikeluarkan ' +
            '      dari sistem dan pemohon perlu membuat permohonan baru sekiranya masih berminat untuk memohon' +
            '    </li>' +
            '  </ul>'
        },
        {
          id: 'BSS',
          name: 'Bantuan Sihat Selangor',
          requireForm: false,
          available: true,
          url: 'http://bantuansihat.selangor.gov.my/',
          body:
            '<p class="title is-5">Syarat Permohonan</p>' +
            '  <ul>' +
            '    <li>' +
            '      Rakyat Negeri Selangor ATAU ' +
            '    </li>' +
            '    <li>' +
            '      Bermastautin di Negeri Selangor melebihi 10 tahun dengan pengesahan ' +
            '       daripada Ahli Parlimen/ADUN/Penghulu/Ketua Kampung/ ' +
            '       JKKK Kampung/Ketua Penduduk/Ketua Komuniti ' +
            '    </li>' +
            '    <li>' +
            '      Pendapatan isi rumah RM3,000.00 ke bawah' +
            '    </li>' +
            '  </ul>'
        },
        {
          id: 'MAMMOSEL',
          name: 'Skim Kesihatan Wanita (Mammosel)',
          requireForm: false,
          available: false,
          body:
            '<p class="title is-5">Syarat Permohonan</p>' +
            '  <ul>' +
            '    <li>' +
            '      Wanita yang layak adalah mereka berumur 35 tahun ke atas yang lahir' +
            '      dan sedang menetap di Selangor.' +
            '    </li>' +
            '    <li>' +
            '      Mereka yang bukan kelahiran Selangor mestilah telah menetap ' +
            '      di Selangor sekurang-kurangnya 10 tahun.' +
            '    </li>' +
            '  </ul>'
        },
        {
          id: 'SMUE',
          name: 'Skim Mesra Usia Emas (SMUE)',
          requireForm: false,
          available: false,
          body:
            '<p class="title is-5">Syarat Permohonan</p>' +
            '  <ul>' +
            '    <li>' +
            '      Warga emas yang layak mendaftar ialah :' +
            '    </li>' +
            '    <li>' +
            '      Seorang warganegara Malaysia berumur 60 tahun dan ke atas.' +
            '    </li>' +
            '    <li>' +
            '      Lahir di WP Kuala Lumpur sebelum 1 Februari 1974 dan sedang ' +
            '      menetap negeri Selangor atau di WP Kuala Lumpur atau ' +
            '    </li>' +
            '    <li>' +
            '      Bermastautin di Negeri Selangor secara sah sekurang-kurangnya 15 tahun.' +
            '    </li>' +
            '  </ul>'
        },
        {
          id: 'TAWAS',
          name: 'Tabung Warisan Anak Selangor (TAWAS)',
          requireForm: false,
          available: false,
          body:
            '<p class="title is-5">' +
            'Permohonan baru TAWAS akan ditutup sepenuhnya ' +
            'berkuatkuasa mulai 1 Februari 2019.  ' +
            'Permohonan ini hanya tertakluk untuk anak di ' +
            'bawah usia 3 tahun sahaja dan merujuk ' +
            'kepada kelahiran sehingga tahun 2018 sahaja. ' +
            'Untuk lebih lanjut layari laman web www.tawas.org.my' +
            '  </p>'
        },
        {
          id: 'KISS',
          name: 'Kasih Ibu Smart Selangor (KISS)',
          requireForm: true,
          formRoute: '/ipr/KISS',
          available: true,
          body:
            '<p class="title is-5">Syarat Permohonan</p>' +
            '  <ul>' +
            '    <li>' +
            '      Warganegara Malaysia.' +
            '    </li>' +
            '    <li>' +
            '      Lahir di Negeri Selangor atau telah ' +
            '      menetap di Selangor melebihi 10 tahun.' +
            '    </li>' +
            '    <li>' +
            '      Pemilih berdaftar di Negeri Selangor.' +
            '    </li>' +
            '    <li>' +
            '      Wanita berkeluarga (berkahwin atau ibu tunggal) ' +
            '      yang mempunyai anak/tanggungan di bawah umur 21 tahun.' +
            '    </li>' +
            '    <li>' +
            '      Pendapatan bulanan isi rumah tidak melebihi RM2,000.00.' +
            '    </li>' +
            '    <li>' +
            '      Berdaftar sebagai pemohon BSH di bawah kategori pendapatan bawah RM2,000.00' +
            '      atau tersenarai sebagai golongan miskin atau miskin tegar di pengkalan data eKasih.' +
            '    </li>' +
            '  </ul>'
        }
      ]
    }
  },
  methods: {
    apply(item) {
      if (item.requireForm) {
        this.$router.push(item.formRoute)
      } else {
        // this.create(item)
        window.open(item.url, '_blank')
      }
    },
    openModal(item) {
      this.activeIPR = item
      this.isCardModalActive = true
    },
    checkApplication(ipr, submittedApplications) {
      return submittedApplications.find(item => {
        return ipr.id === item.ipr_code
      })
    },
    create(item) {
      this.isCardModalActive = false
      this.setIsLoading(true)
      this.$store
        .dispatch('ipr_application/create', {
          docket: {
            ipr_code: item.id,
            residence: {
              meter_type: null,
              individual_meter_acc_no: null,
              ownership_status: null
            },
            jmb_confirmation: null
          }
        })
        .then(res => {
          this.setIsLoading(false)
          if (res.error) {
            const errors = []

            for (const key in res.errors) {
              if ({}.hasOwnProperty.call(res.errors, key)) {
                for (const subKey in res.errors[key]) {
                  errors.push(
                    key +
                      ' ' +
                      subKey +
                      ' ' +
                      res.errors[key][subKey].join(', ')
                  )
                }
              }
            }

            Dialog.alert({
              message: errors.join(', '),
              type: 'is-danger',
              hasIcon: true,
              icon: 'times-circle',
              iconPack: 'fa'
            })
          } else {
            Dialog.alert({
              message: 'Permohonan anda telah diterima dan sedang diproses.',
              type: 'is-success',
              hasIcon: true,
              icon: 'check-circle',
              iconPack: 'fa'
            })
            this.$router.push('/account')
          }
        })
    },
    setIsLoading(status) {
      this.$store.dispatch('loader/setIsLoading', status)
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
.test {
  opacity: 0.6;
  filter: alpha(opacity=50); /* For IE8 and earlier */
}
</style>
