<template>
  <div class="column is-fourth-quater semakan-wrap">
    <form @submit.prevent="check()">
      <div class="is-divider" data-content="SEMAK STATUS PERMOHONAN"></div>

      <b-field label="No. Identiti">
        <b-input v-model="ic" required></b-input>
      </b-field>

      <b-field label="No. Akaun Air Selangor">
        <b-input v-model="meter" maxlength="10" required></b-input>
      </b-field>

      <p class="control loginbtn">
        <b-button native-type="submit" type="is-primary is-fullwidth" outlined
          >Semak</b-button
        >
      </p>
      <div class="sade-notice">
        <p class="heading-strong">
          PENGUMUMAN BAGI PEMEGANG AKAUN METER PUKAL DALAM KATEGORI PANGSAPURI
          KOS RENDAH
        </p>
        <p>
          Pengguna akaun meter pukal dalam kategori pangsapuri kos rendah akan
          terus menerima 20 meter padu air percuma di bawah Skim Air Darul Ehsan
          secara automatik sehingga 31 Disember 2021 mengikut kaedah sedia ada
          yang melibatkan JMB/MC serta Lembaga Perumahan Hartanah Selangor
          (LPHS). Namun demikian, migrasi meter pukal kepada meter individu bagi
          kediaman bertingkat tinggi & komuniti berpagar hendaklah dilaksanakan
          seperti digariskan oleh SPAN selewat-lewatnya sebelum akhir 2021.
        </p>
      </div>
    </form>
    <div v-if="checked">
      <!-- <div>
        <div class="card" aria-id="contentIdForA11y3">
          <b-loading
            :is-full-page="false"
            :active.sync="sadeLoading"
            :can-cancel="true"
          ></b-loading>
          <div class="card-header" role="button">
            <p class="card-header-title level">
              <span class="level-left">Skim Air Selangor (SADE)</span>
              <span
                v-if="sade"
                class="tag is-info level-right"
                @click="openSADEDetail()"
                >Dalam Proses</span
              >
              <span v-else class="tag is-danger level-right">Tiada Rekod</span>
            </p>
          </div>
        </div>
        <br />
      </div> -->
      <!-- <div>
        <div class="card" aria-id="contentIdForA11y3">
          <b-loading
            :is-full-page="false"
            :active.sync="tawasLoading"
            :can-cancel="true"
          ></b-loading>
          <div class="card-header" role="button">
            <p class="card-header-title level">
              <span class="level-left"
                >Tabung Warisan Anak Selangor (TAWAS)</span
              >
              <span
                v-if="tawas && tawas.status_proses"
                class="tag is-info level-right"
                @click="
                  openDetail(tawas, 'Tabung Warisan Anak Selangor (TAWAS)')
                "
              >
                {{ tawas.status_proses }}
              </span>
              <span v-else class="tag is-danger level-right">Tiada Rekod</span>
            </p>
          </div>
        </div>
        <br />
      </div>-->

      <!-- <div>
        <div class="card" aria-id="contentIdForA11y3">
          <b-loading
            :is-full-page="false"
            :active.sync="skwLoading"
            :can-cancel="true"
          ></b-loading>
          <div class="card-header" role="button">
            <p class="card-header-title level">
              <span class="level-left">Skim Kesihatan Wanita (Mammosel)</span>
              <span
                v-if="skw"
                class="tag is-info level-right"
                @click="openSKWDetail()"
                >Dalam Proses</span
              >
              <span v-else class="tag is-danger level-right">Tiada Rekod</span>
            </p>
          </div>
        </div>
        <br />
      </div>-->
      <!-- <div>
        <div class="card" aria-id="contentIdForA11y3">
          <b-loading
            :is-full-page="false"
            :active.sync="srsLoading"
            :can-cancel="true"
          ></b-loading>
          <div class="card-header" role="button">
            <p class="card-header-title level">
              <span class="level-left">SKim Rumah Selangorku</span>
              <span
                v-if="srs && srs.STATUS"
                class="tag is-info level-right"
                @click="openDetail(sts, 'Skim Rumah Selangorku')"
                >{{ srs.STATUS }}</span
              >
              <span v-else class="tag is-danger level-right">Tiada Rekod</span>
            </p>
          </div>
        </div>
        <br />
      </div>-->
      <!-- <div>
        <div class="card" aria-id="contentIdForA11y3">
          <b-loading
            :is-full-page="false"
            :active.sync="emasLoading"
            :can-cancel="true"
          ></b-loading>
          <div class="card-header" role="button">
            <p class="card-header-title level">
              <span class="level-left">Skim Mesra Usia Emas (SMUE)</span>
              <span
                v-if="emas && emas.profile"
                class="tag is-info level-right"
                @click="openSMUEDetail()"
                >Dalam Proses</span
              >
              <span v-else class="tag is-danger level-right">Tiada Rekod</span>
            </p>
          </div>
        </div>
        <br />
      </div>-->
      <!-- <div>
        <div class="card" aria-id="contentIdForA11y3">
          <b-loading
            :is-full-page="false"
            :active.sync="bantuanSihatLoading"
            :can-cancel="true"
          ></b-loading>
          <div class="card-header" role="button">
            <p class="card-header-title level">
              <span class="level-left">Bantuan Sihat Selangor</span>
              <span
                v-if="bantuanSihat && bantuanSihat.length > 0"
                class="tag is-info level-right"
                @click="openDetail(bantuanSihat, 'Bantuan Sihat Selangor')"
                >Dalam Proses</span
              >
              <span v-else class="tag is-danger level-right">Tiada Rekod</span>
            </p>
          </div>
        </div>
        <br />
      </div>-->
    </div>
    <!-- <b-modal :active.sync="isModalLandingActive">
      <p><img src="/modal.png" /></p>
    </b-modal> -->
    <b-modal :active.sync="isSADEModalActive">
      <div class="image result-sade-wrap">
        <div class="card result-search">
          <!-- <div class="card-header">Skim Air Selangor (SADE)</div> -->
          <div class="card-content">
            <table
              v-if="sade"
              class="table table-bordered table-striped table-condensed mb-none sade-result"
            >
              <tr>
                <td colspan="4" bgcolor="#ccc">
                  <b>MAKLUMAT PEMOHON</b>
                </td>
              </tr>
              <tr>
                <td>
                  <b>Nama</b>
                </td>
                <td>{{ sade.nama }}</td>
                <td>
                  <b>No. Identiti</b>
                </td>
                <td>{{ sade.ic }}</td>
              </tr>
              <tr>
                <td>
                  <b>Status Permohonan</b>
                </td>
                <td>{{ sade.status === 0 ? 'Dalam Proses' : 'Lulus' }}</td>
                <td>
                  <b>Tarikh Daftar</b>
                </td>
                <td>{{ sade.inserted_at }}</td>
              </tr>
              <tr>
                <td>
                  <b>Jenis Meter</b>
                </td>
                <td class="jenis-meter">{{ sade.jenis_meter }}</td>
                <td>
                  <b>No. Akaun Air Selangor</b>
                </td>
                <td v-if="sade.jenis_meter === 'individu'">
                  {{ sade.no_akaun_individu }}
                </td>
                <td v-else>{{ sade.no_akaun_pukal }}</td>
              </tr>
            </table>
          </div>
          <footer class="card-footer"></footer>
        </div>
      </div>
    </b-modal>
    <b-modal :active.sync="isModalActive" :width="1800" scroll="keep">
      <div class="card">
        <div class="card-header">{{ selectedIPRTitle }}</div>
        <div class="card-content">
          <table
            v-if="selectedIPR && selectedIPR.namaAnak"
            class="table table-bordered table-striped table-condensed mb-none"
          >
            <tr>
              <td colspan="4" bgcolor="#ccc">
                <b>Maklumat Ahli</b>
              </td>
            </tr>
            <tr>
              <td>
                <b>Nama</b>
              </td>
              <td colspan="3">{{ selectedIPR.namaAnak }}</td>
            </tr>
            <tr>
              <td>
                <b>No Kp</b>
              </td>
              <td>{{ selectedIPR.noMyKid }}</td>
              <td>
                <b>Tarikh Lahir</b>
              </td>
              <td>{{ selectedIPR.tarikhLahir }}</td>
            </tr>
            <tr>
              <td>
                <b>Nama Bapa</b>
              </td>
              <td>{{ selectedIPR.b_nama }}</td>
              <td>
                <b>No Kp Bapa</b>
              </td>
              <td>{{ selectedIPR.b_kpBaru }}</td>
            </tr>
            <tr>
              <td>
                <b>Nama Ibu</b>
              </td>
              <td>{{ selectedIPR.i_nama }}</td>
              <td>
                <b>No Kp Ibu</b>
              </td>
              <td>{{ selectedIPR.i_kpBaru }}</td>
            </tr>
            <tr>
              <td>
                <b>Status Permohonan</b>
              </td>
              <td>{{ selectedIPR.status_mohon }}</td>
              <td>
                <b>Dun</b>
              </td>
              <td>{{ selectedIPR.NAMA_DUN }}</td>
            </tr>
            <tr>
              <td>
                <b>Status Kad</b>
              </td>
              <td>Belum Diambil</td>
              <td>
                <b>Diambil Oleh</b>
              </td>
              <td></td>
            </tr>
            <tr>
              <td colspan="4" bgcolor="#ccc">
                <b>Maklumat Untuk Dihubungi</b>
              </td>
            </tr>
            <tr>
              <td>
                <b>Alamat</b>
              </td>
              <td colspan="3">{{ selectedIPR.t_alamat1 }}</td>
            </tr>
            <tr>
              <td>
                <b>No Telefon</b>
              </td>
              <td>{{ selectedIPR.i_telMobile }}</td>
              <td>
                <b></b>
              </td>
              <td></td>
            </tr>
            <tr>
              <td colspan="4" bgcolor="#ccc">
                <b>Kawasan Program Pilihan</b>
              </td>
            </tr>
            <tr>
              <td>
                <b>Dun</b>
              </td>
              <td>{{ selectedIPR.PKD }}</td>
              <td>
                <b>Alamat Dun</b>
              </td>
              <td>{{ selectedIPR.ALAMATPKD }}</td>
            </tr>
          </table>

          <table v-else>
            <tr v-for="(item, propertyName, index) in selectedIPR" :key="index">
              <td>{{ propertyName }}</td>
              <td>{{ item }}</td>
            </tr>
          </table>
        </div>
        <footer class="card-footer"></footer>
      </div>
    </b-modal>
    <b-modal :active.sync="isSMUEModalActive" :width="1800" scroll="keep">
      <div class="card">
        <div class="card-header">Skim Mesra Usia Emas (SMUE)</div>
        <div class="card-content">
          <table
            v-if="emas && emas.profile"
            class="table table-bordered table-striped table-condensed mb-none"
          >
            <tr>
              <td colspan="4" bgcolor="#ccc">
                <b>Maklumat Ahli</b>
              </td>
            </tr>
            <tr>
              <td>
                <b>Nama</b>
              </td>
              <td colspan="3">{{ emas.profile.nama }}</td>
            </tr>
            <tr>
              <td>
                <b>No Kp</b>
              </td>
              <td>{{ emas.profile.no_kp }}</td>
              <td>
                <b>No Kp Lama</b>
              </td>
              <td>{{ emas.profile.no_kp_lama }}</td>
            </tr>
            <tr>
              <td>
                <b>Tarikh Lahir</b>
              </td>
              <td>{{ emas.profile.tarikh_lahir }}</td>
              <td>
                <b>Jantina</b>
              </td>
              <td>{{ emas.profile.jantina }}</td>
            </tr>
            <tr>
              <td>
                <b>Kaum</b>
              </td>
              <td>{{ emas.profile.kaum }}</td>
              <td>
                <b>Agama</b>
              </td>
              <td>{{ emas.profile.agama }}</td>
            </tr>
            <tr>
              <td>
                <b>Alamat</b>
              </td>
              <td colspan="3">{{ emas.profile.alamat }}</td>
            </tr>
            <tr>
              <td>
                <b>DUN</b>
              </td>
              <td colspan="3">{{ emas.profile.dun }}</td>
            </tr>
            <tr>
              <td colspan="4" bgcolor="#ccc">
                <b>Penjaga 1</b>
              </td>
            </tr>
            <tr>
              <td>
                <b>Nama</b>
              </td>
              <td colspan="3">{{ emas.profile.nama_penjaga }}</td>
            </tr>
            <tr>
              <td>
                <b>No Kp</b>
              </td>
              <td>{{ emas.profile.no_kp_penjaga }}</td>
              <td>
                <b>Hubungan</b>
              </td>
              <td>{{ emas.profile.hubungan_penjaga }}</td>
            </tr>
            <tr>
              <td>
                <b>Jantina</b>
              </td>
              <td>{{ emas.profile.jantina_penjaga }}</td>
              <td>
                <b>Kaum</b>
              </td>
              <td>{{ emas.profile.kaum_penjaga }}</td>
            </tr>
            <tr>
              <td>
                <b>No Tel</b>
              </td>
              <td>{{ emas.profile.no_tel_penjaga }}</td>
              <td>
                <b>Email</b>
              </td>
              <td>{{ emas.profile.email_penjaga }}</td>
            </tr>
            <tr>
              <td>
                <b>Alamat</b>
              </td>
              <td colspan="3">{{ emas.profile.alamat_penjaga }}</td>
            </tr>
            <tr>
              <td colspan="4" bgcolor="#ccc">
                <b>Penjaga 2 / Penama</b>
              </td>
            </tr>
            <tr>
              <td>
                <b>Nama</b>
              </td>
              <td colspan="3">{{ emas.profile.nama_penama }}</td>
            </tr>
            <tr>
              <td>
                <b>No Kp</b>
              </td>
              <td>{{ emas.profile.no_kp_penama }}</td>
              <td>
                <b>Hubungan</b>
              </td>
              <td>{{ emas.profile.hubungan_penama }}</td>
            </tr>
            <tr>
              <td>
                <b>Jantina</b>
              </td>
              <td>{{ emas.profile.jantina_penama }}</td>
              <td>
                <b>Kaum</b>
              </td>
              <td>{{ emas.profile.kaum_penama }}</td>
            </tr>
            <tr>
              <td>
                <b>No Tel</b>
              </td>
              <td>{{ emas.profile.no_tel_penama }}</td>
              <td>
                <b>Email</b>
              </td>
              <td>{{ emas.profile.email_penama }}</td>
            </tr>
            <tr>
              <td>
                <b>Alamat</b>
              </td>
              <td colspan="3">{{ emas.profile.alamat_penama }}</td>
            </tr>
            <tr>
              <td colspan="4" bgcolor="#ccc">
                <b>Makluman Bayaran</b>
              </td>
            </tr>
            <tr>
              <td>
                <b>Sekatan Bayaran</b>
              </td>
              <td></td>
              <td>
                <b>Alasan Sekatan</b>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>
                <b>Tarikh Kematian</b>
              </td>
              <td>{{ emas.profile.kematian_tarikh }}</td>
              <td>
                <b>No Sijil Kematian</b>
              </td>
              <td>{{ emas.profile.kematian_no_sijil }}</td>
            </tr>
            <tr>
              <td>
                <b>Tempat Kematian</b>
              </td>
              <td>{{ emas.profile.kematian_tempat }}</td>
            </tr>
            <tr>
              <td>
                <b>Tarikh Bayaran Pertama</b>
              </td>
              <td>{{ emas.profile.tkh_bayaran_pertama }}</td>
              <td>
                <b>Diabayar Oleh</b>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>
                <b>Tarikh Bayaran Kedua</b>
              </td>
              <td>{{ emas.profile.tkh_bayaran_kedua }}</td>
              <td>
                <b>Diabayar Oleh</b>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>
                <b>Catatan Daerah</b>
              </td>
              <td>{{ emas.profile.semakan_catatan }}</td>
            </tr>
            <tr>
              <td>
                <b>Status Penerima JASAMU</b>
              </td>
              <td></td>
            </tr>
            <tr>
              <td colspan="4" bgcolor="#ccc">
                <b>Jom Shopping Manfaat</b>
              </td>
            </tr>
            <tr>
              <td>
                <b>Dijangka Hadir</b>
              </td>
              <td></td>
              <td>
                <b>Menghadiri(Terima Manfaat)</b>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>
                <b>Baucer/Tag</b>
              </td>
              <td></td>
              <td>
                <b>Tidak Menghadiri</b>
              </td>
              <td></td>
            </tr>
            <tr>
              <td colspan="4" bgcolor="#ccc">
                <b>Jom Shopping SMUE</b>
              </td>
            </tr>
            <tr>
              <td>
                <b></b>
              </td>
              <td></td>
              <td>
                <b></b>
              </td>
              <td></td>
            </tr>
            <tr>
              <td colspan="4" bgcolor="#ccc">
                <b>Maklumat Pendaftaran</b>
              </td>
            </tr>
            <tr>
              <td>
                <b>Tarikh Pra Daftar</b>
              </td>
              <td>{{ emas.profile.tkh_dimasukkan }}</td>
              <td>
                <b>Tarikh Terima Borang</b>
              </td>
              <td>{{ emas.profile.tkh_dokumen_diterima }}</td>
            </tr>
            <tr>
              <td>
                <b>Tarikh Serah Borang</b>
              </td>
              <td>{{ emas.profile.tkh_dokumen_dihantar }}</td>
              <td>
                <b>Tarikh Pulang Borang RMSB</b>
              </td>
              <td>{{ emas.profile.tkh_dokumen_diterima }}</td>
            </tr>
            <tr>
              <td>
                <b>Kemaskini Oleh</b>
              </td>
              <td>{{ emas.profile.id_kemaskini }}</td>
              <td>
                <b>Tarikh Kemaskini</b>
              </td>
              <td>{{ emas.profile.tkh_kemaskini }}</td>
            </tr>
            <tr>
              <td>
                <b>Pengesahan Oleh</b>
              </td>
              <td>{{ emas.profile.nama_pengesah }}</td>
              <td>
                <b>Tarikh Pengesahan</b>
              </td>
              <td>{{ emas.profile.tkh_dokumen_disemak }}</td>
            </tr>
            <tr>
              <td>
                <b>Catatan Semakan</b>
              </td>
              <td>{{ emas.profile.semakan }}</td>
            </tr>
            <tr>
              <td>
                <b>Jenis Pendaftaran</b>
              </td>
              <td>{{ emas.profile.jenis_data }}</td>
            </tr>
          </table>
        </div>
        <footer class="card-footer"></footer>
      </div>
    </b-modal>
    <b-modal :active.sync="isSKWModalActive" :width="640" scroll="keep">
      <div class="card">
        <div class="card-header">Skim Kesihatan Wanita (Mammosel)</div>
        <div class="card-content">
          <table
            v-if="skw"
            class="table table-bordered table-striped table-condensed mb-none"
          >
            <tr>
              <td colspan="4" bgcolor="#ccc">
                <b>Maklumat Ahli</b>
              </td>
            </tr>
            <tr>
              <td>
                <b>Nama</b>
              </td>
              <td colspan="3">{{ skw.Nama }}</td>
            </tr>
            <tr>
              <td>
                <b>No Kp</b>
              </td>
              <td>{{ skw.NoKPBaru }}</td>
              <td>
                <b>No Kp Lama</b>
              </td>
              <td>{{ skw.NoKPLama }}</td>
            </tr>
            <tr>
              <td>
                <b>No. Tel</b>
              </td>
              <td>{{ skw.NoTel }}</td>
              <td>
                <b>Pekerjaan</b>
              </td>
              <td>{{ skw.Pekerjaan }}</td>
            </tr>
            <tr>
              <td>
                <b>Kaum</b>
              </td>
              <td>{{ skw.Kaum }}</td>
              <td>
                <b>Agama</b>
              </td>
              <td>{{ skw.Agama }}</td>
            </tr>
            <tr>
              <td>
                <b>Alamat</b>
              </td>
              <td colspan="3">{{ skw.Alamat1 }}</td>
            </tr>
            <tr>
              <td>
                <b></b>
              </td>
              <td colspan="3">{{ skw.Alamat2 }}</td>
            </tr>
            <tr>
              <td>
                <b>Poskod</b>
              </td>
              <td>{{ skw.Poskod }}</td>
              <td>
                <b>Bandar</b>
              </td>
              <td>{{ skw.Bandar }}</td>
            </tr>
            <tr>
              <td>
                <b>Daerah</b>
              </td>
              <td>{{ skw.Daerah }}</td>
            </tr>
            <tr>
              <td colspan="4" bgcolor="#ccc">
                <b>Maklumat Pemeriksaan</b>
              </td>
            </tr>
            <tr>
              <td>
                <b>No.</b>
              </td>
              <td>
                <b>Operator</b>
              </td>
              <td>
                <b>Tarikh Pemeriksaan</b>
              </td>
              <td>
                <b>Jenis Pemeriksan</b>
              </td>
            </tr>
          </table>
        </div>
        <footer class="card-footer"></footer>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { Dialog } from 'buefy/dist/components/dialog'
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
  layout: 'checking',
  data() {
    return {
      ic: null,
      meter: null,
      tawas: null,
      emas: null,
      skw: null,
      sade: null,
      status: 'Dalam Proses',
      isCardModalActive: false,
      isModalActive: false,
      isSMUEModalActive: false,
      isSKWModalActive: false,
      isSADEModalActive: false,
      activeIPR: null,
      selectedIPRTitle: null,
      selectedIPR: null,
      result: false,
      sadeLoading: true,
      tawasLoading: true,
      emasLoading: true,
      skwLoading: true,
      srsLoading: true,
      checked: false,
      isModalLandingActive: true
    }
  },
  computed: {
    ...mapGetters({
      airSelangor: 'ipr_application/airSelangor'
    })
  },
  created() {
    this.$store.dispatch('auth_layout/setAuthBtn', [
      this.$t('l.registerAcc'),
      'register'
    ])
  },
  methods: {
    check() {
      this.checked = true
      // this.setIsLoading(true)
      this.checkSRS()
      this.checkTawas()
      this.checkSkw()
      this.checkEmas()
      this.checkBantuanSihat()
      this.checkSADE()
      // this.$store
      //   .dispatch('ipr_application/checkAirSelangor', this.ic)
      //   .then(res => {
      //     this.setIsLoading(false)

      //     if (!res.error) {
      //       const status =
      //         this.airSelangor.status === 1 ? 'Lulus' : 'Dalam Proses'
      //       Dialog.alert({
      //         message: `Status permohonan Air Selangor: ${status}`,
      //         type: 'is-info',
      //         hasIcon: true,
      //         icon: 'times-circle',
      //         iconPack: 'fa'
      //       })
      //     } else {
      //       Dialog.alert({
      //         message: 'Maaf, Maklumat anda tiada dalam Rekod Kami',
      //         type: 'is-danger',
      //         hasIcon: true,
      //         icon: 'times-circle',
      //         iconPack: 'fa'
      //       })
      //     }
      //   })
      //   .catch(function(error) {
      //     // handle error
      //     console.log(error)
      //   })
      // this.setIsLoading(false)
    },
    checkSRS() {
      axios
        .get(`https://yawas.ssipr.smarttechtank.com/srs/${this.ic}`)
        .then(res => {
          if (res.status === 200) {
            this.srs = res.data
            this.srsLoading = false
          }
        })
        .catch(function(error) {
          // handle error
          console.log(error)
        })
      return false
    },
    checkBantuanSihat() {
      axios
        .get(`https://yawas.ssipr.smarttechtank.com/bs/${this.ic}`)
        .then(res => {
          if (res.status === 200) {
            this.bantuanSihat = res.data
            this.bantuanSihatLoading = false
          }
        })
        .catch(function(error) {
          // handle error
          console.log(error)
        })
      return false
    },
    checkTawas() {
      axios
        .get(`https://yawas.ssipr.smarttechtank.com/pawas/${this.ic}`)
        .then(res => {
          if (res.status === 200) {
            this.tawas = res.data
            this.tawasLoading = false
          }
        })
        .catch(function(error) {
          // handle error
          console.log(error)
        })

      return false
    },
    checkSADE() {
      axios
        .get(
          `https://yawas.ssipr.smarttechtank.com/sade/${this.ic}?meter=${this.meter}`
        )
        .then(res => {
          if (res.status === 200 && res.data.id) {
            this.sade = res.data
            this.sadeLoading = false
            this.isSADEModalActive = true
          } else {
            Dialog.alert({
              message: 'Maaf, Maklumat anda tiada dalam Rekod Kami',
              type: 'is-danger',
              hasIcon: true,
              icon: 'times-circle',
              iconPack: 'fa'
            })
          }
        })
        .catch(function(error) {
          // handle error
          Dialog.alert({
            message: 'Maaf, Maklumat anda tiada dalam Rekod Kami',
            type: 'is-danger',
            hasIcon: true,
            icon: 'times-circle',
            iconPack: 'fa'
          })
          console.log(error)
        })
      return false
    },
    checkSkw() {
      axios
        .get(`https://yawas.ssipr.smarttechtank.com/skw/${this.ic}`)
        .then(res => {
          if (res.status === 200) {
            this.skw = res.data
            this.skwLoading = false
          }
        })
        .catch(function(error) {
          // handle error
          console.log(error)
        })
      return false
    },
    checkEmas() {
      axios
        .get(`https://yawas.ssipr.smarttechtank.com/emas/${this.ic}`)
        .then(res => {
          if (res.status === 200) {
            this.emas = res.data
            this.emasLoading = false
          }
        })
        .catch(function(error) {
          // handle error
          console.log(error)
        })
      return false
    },
    openDetail(item, title) {
      // const ipr = []
      // for (const k in item) {
      //   if ({}.hasOwnProperty.call(item, k)) {
      //     ipr.push(k + ' ' + item[k].join(', '))
      //   }
      // }
      this.selectedIPRTitle = title
      this.selectedIPR = item
      this.isModalActive = true
    },
    openSMUEDetail() {
      this.isSMUEModalActive = true
    },
    openSADEDetail() {
      this.isSADEModalActive = true
    },
    openSKWDetail() {
      this.isSKWModalActive = true
    },
    checkApplication(ipr, submittedApplications) {
      return submittedApplications.find(item => {
        return ipr.id === item.ipr_code
      })
    },
    setIsLoading(status) {
      this.$store.dispatch('loader/setIsLoading', status)
    }
  }
}
</script>
<style scoped lang="scss">
.with-bg {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('~assets/img/bgsel.png');
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
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
.sade {
  background: url('/semakan.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.card-content .result-search {
  margin-top: -250px;
}
.is-divider[data-content]::after {
  color: #000;
  font-size: 1rem;
  font-weight: bold;
}
.sade-notice {
  margin-top: 25px;
  text-align: left;
}
.heading-strong {
  font-weight: bold;
  margin-bottom: 15px;
}
.semakan-bg {
  height: auto !important;
}

.result-sade-wrap {
  background: #ffffff url('/popup-semakan-sade.png');
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100%;
  padding-top: 60%;
}
.jenis-meter {
  text-transform: capitalize;
}
.sade-result {
  width: 100%;
}
@media only screen and (max-width: 768px) {
  .result-search table td {
    display: block;
    border: none;
  }
}
</style>
