<template>
  <div>
    <div class="columns">
      <div class="column">
        <div class="card">
          <div class="card-content dashb">
            <div class="content has-text-centered">
              <b-icon icon="hands" pack="fas" size="is-medium"></b-icon>
              <hr />
              <h4 class="dashb has-text-weight-light">8 IPR Ditawarkan</h4>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card">
          <div class="card-content dashb">
            <div class="content has-text-centered">
              <b-icon icon="pen-fancy" pack="fas" size="is-medium"></b-icon>
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
              <b-icon icon="smile" pack="fas" size="is-medium"></b-icon>
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
              <b-icon icon="frown" pack="fas" size="is-medium"></b-icon>
              <hr />
              <h4 class="dashb has-text-weight-light">0 IPR Ditolak</h4>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card">
          <div class="card-content dashb">
            <div class="content has-text-centered">
              <b-icon icon="bell" pack="fas" size="is-medium"></b-icon>
              <hr />
              <h4 class="dashb has-text-weight-light">0 Notifikasi</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <h1 class="has-text-weight-semibold">Senarai Program Layak Dimohon</h1>
      </div>
      <div class="column">
        <h1 class="has-text-weight-semibold">Senarai Program Dimohon</h1>
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
                <p class="card-header-title">{{ ipr.name }}</p>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="card disabled" aria-id="contentIdForA11y3">
              <div class="card-header" role="button">
                <p class="card-header-title">{{ ipr.name }}</p>
              </div>
            </div>
          </div>
          <br />
        </div>
        <b-modal :active.sync="isCardModalActive" :width="640" scroll="keep">
          <div class="card">
            <div class="card-image">
              <figure class="image">
                <img
                  v-if="activeIPR && activeIPR.id === 'AIR_SELANGOR'"
                  src="~assets/img/SADE_banner.jpg"
                  alt="Image"
                />
                <img
                  v-if="activeIPR && activeIPR.id === 'BSS'"
                  src="~assets/img/BantuanSihat.png"
                  alt="Image"
                />
                <img
                  v-if="activeIPR && activeIPR.id === 'SRS'"
                  src="~assets/img/RumahSelangorku.png"
                  alt="Image"
                />
                <img
                  v-if="activeIPR && activeIPR.id === 'MAMMOSEL'"
                  src="~assets/img/SKW.png"
                  alt="Image"
                />
                <img
                  v-if="activeIPR && activeIPR.id === 'TAWAS'"
                  src="~assets/img/TAWAS.png"
                  alt="Image"
                />
                <img
                  v-if="activeIPR && activeIPR.id === 'KISS'"
                  src="~assets/img/Kiss.png"
                  alt="Image"
                />
                <img
                  v-if="activeIPR && activeIPR.id === 'SMUE'"
                  src="~assets/img/EMAS.png"
                  alt="Image"
                />
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
              </nuxt-link>-->
              <a
                v-if="activeIPR && activeIPR.available"
                class="card-footer-item"
                @click="apply(activeIPR)"
                >Mohon</a
              >
            </footer>
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
                  <td colspan="4" bgcolor="#ccc"><b>Maklumat Ahli</b></td>
                </tr>
                <tr>
                  <td><b>Nama</b></td>
                  <td colspan="3">{{ selectedIPR.namaAnak }}</td>
                </tr>
                <tr>
                  <td><b>No Kp</b></td>
                  <td>{{ selectedIPR.noMyKid }}</td>
                  <td><b>Tarikh Lahir</b></td>
                  <td>{{ selectedIPR.tarikhLahir }}</td>
                </tr>
                <tr>
                  <td><b>Nama Bapa</b></td>
                  <td>{{ selectedIPR.b_nama }}</td>
                  <td><b>No Kp Bapa</b></td>
                  <td>{{ selectedIPR.b_kpBaru }}</td>
                </tr>
                <tr>
                  <td><b>Nama Ibu</b></td>
                  <td>{{ selectedIPR.i_nama }}</td>
                  <td><b>No Kp Ibu</b></td>
                  <td>{{ selectedIPR.i_kpBaru }}</td>
                </tr>
                <tr>
                  <td><b>Status Permohonan</b></td>
                  <td>{{ selectedIPR.status_mohon }}</td>
                  <td><b>Dun</b></td>
                  <td>{{ selectedIPR.NAMA_DUN }}</td>
                </tr>
                <tr>
                  <td><b>Status Kad</b></td>
                  <td>Belum Diambil</td>
                  <td><b>Diambil Oleh</b></td>
                  <td></td>
                </tr>
                <tr>
                  <td colspan="4" bgcolor="#ccc">
                    <b>Maklumat Untuk Dihubungi</b>
                  </td>
                </tr>
                <tr>
                  <td><b>Alamat</b></td>
                  <td colspan="3">{{ selectedIPR.t_alamat1 }}</td>
                </tr>
                <tr>
                  <td><b>No Telefon</b></td>
                  <td>{{ selectedIPR.i_telMobile }}</td>
                  <td><b></b></td>
                  <td></td>
                </tr>
                <tr>
                  <td colspan="4" bgcolor="#ccc">
                    <b>Kawasan Program Pilihan</b>
                  </td>
                </tr>
                <tr>
                  <td><b>Dun</b></td>
                  <td>{{ selectedIPR.PKD }}</td>
                  <td><b>Alamat Dun</b></td>
                  <td>{{ selectedIPR.ALAMATPKD }}</td>
                </tr>
              </table>

              <table v-else>
                <tr
                  v-for="(item, propertyName, index) in selectedIPR"
                  :key="index"
                >
                  <td>
                    {{ propertyName }}
                  </td>
                  <td>
                    {{ item }}
                  </td>
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
                  <td colspan="4" bgcolor="#ccc"><b>Maklumat Ahli</b></td>
                </tr>
                <tr>
                  <td><b>Nama</b></td>
                  <td colspan="3">{{ emas.profile.nama }}</td>
                </tr>
                <tr>
                  <td><b>No Kp</b></td>
                  <td>{{ emas.profile.no_kp }}</td>
                  <td><b>No Kp Lama</b></td>
                  <td>{{ emas.profile.no_kp_lama }}</td>
                </tr>
                <tr>
                  <td><b>Tarikh Lahir</b></td>
                  <td>{{ emas.profile.tarikh_lahir }}</td>
                  <td><b>Jantina</b></td>
                  <td>{{ emas.profile.jantina }}</td>
                </tr>
                <tr>
                  <td><b>Kaum</b></td>
                  <td>{{ emas.profile.kaum }}</td>
                  <td><b>Agama</b></td>
                  <td>{{ emas.profile.agama }}</td>
                </tr>
                <tr>
                  <td><b>Alamat</b></td>
                  <td colspan="3">{{ emas.profile.alamat }}</td>
                </tr>
                <tr>
                  <td><b>DUN</b></td>
                  <td colspan="3">{{ emas.profile.dun }}</td>
                </tr>
                <tr>
                  <td colspan="4" bgcolor="#ccc">
                    <b>Penjaga 1</b>
                  </td>
                </tr>
                <tr>
                  <td><b>Nama</b></td>
                  <td colspan="3">{{ emas.profile.nama_penjaga }}</td>
                </tr>
                <tr>
                  <td><b>No Kp</b></td>
                  <td>{{ emas.profile.no_kp_penjaga }}</td>
                  <td><b>Hubungan</b></td>
                  <td>{{ emas.profile.hubungan_penjaga }}</td>
                </tr>
                <tr>
                  <td><b>Jantina</b></td>
                  <td>{{ emas.profile.jantina_penjaga }}</td>
                  <td><b>Kaum</b></td>
                  <td>{{ emas.profile.kaum_penjaga }}</td>
                </tr>
                <tr>
                  <td><b>No Tel</b></td>
                  <td>{{ emas.profile.no_tel_penjaga }}</td>
                  <td><b>Email</b></td>
                  <td>{{ emas.profile.email_penjaga }}</td>
                </tr>
                <tr>
                  <td><b>Alamat</b></td>
                  <td colspan="3">{{ emas.profile.alamat_penjaga }}</td>
                </tr>
                <tr>
                  <td colspan="4" bgcolor="#ccc">
                    <b>Penjaga 2 / Penama</b>
                  </td>
                </tr>
                <tr>
                  <td><b>Nama</b></td>
                  <td colspan="3">{{ emas.profile.nama_penama }}</td>
                </tr>
                <tr>
                  <td><b>No Kp</b></td>
                  <td>{{ emas.profile.no_kp_penama }}</td>
                  <td><b>Hubungan</b></td>
                  <td>{{ emas.profile.hubungan_penama }}</td>
                </tr>
                <tr>
                  <td><b>Jantina</b></td>
                  <td>{{ emas.profile.jantina_penama }}</td>
                  <td><b>Kaum</b></td>
                  <td>{{ emas.profile.kaum_penama }}</td>
                </tr>
                <tr>
                  <td><b>No Tel</b></td>
                  <td>{{ emas.profile.no_tel_penama }}</td>
                  <td><b>Email</b></td>
                  <td>{{ emas.profile.email_penama }}</td>
                </tr>
                <tr>
                  <td><b>Alamat</b></td>
                  <td colspan="3">{{ emas.profile.alamat_penama }}</td>
                </tr>
                <tr>
                  <td colspan="4" bgcolor="#ccc">
                    <b>Makluman Bayaran</b>
                  </td>
                </tr>
                <tr>
                  <td><b>Sekatan Bayaran</b></td>
                  <td></td>
                  <td><b>Alasan Sekatan</b></td>
                  <td></td>
                </tr>
                <tr>
                  <td><b>Tarikh Kematian</b></td>
                  <td>{{ emas.profile.kematian_tarikh }}</td>
                  <td><b>No Sijil Kematian</b></td>
                  <td>{{ emas.profile.kematian_no_sijil }}</td>
                </tr>
                <tr>
                  <td><b>Tempat Kematian</b></td>
                  <td>{{ emas.profile.kematian_tempat }}</td>
                </tr>
                <tr>
                  <td><b>Tarikh Bayaran Pertama</b></td>
                  <td>{{ emas.profile.tkh_bayaran_pertama }}</td>
                  <td><b>Diabayar Oleh</b></td>
                  <td></td>
                </tr>
                <tr>
                  <td><b>Tarikh Bayaran Kedua</b></td>
                  <td>{{ emas.profile.tkh_bayaran_kedua }}</td>
                  <td><b>Diabayar Oleh</b></td>
                  <td></td>
                </tr>
                <tr>
                  <td><b>Catatan Daerah</b></td>
                  <td>{{ emas.profile.semakan_catatan }}</td>
                </tr>
                <tr>
                  <td><b>Status Penerima JASAMU</b></td>
                  <td></td>
                </tr>
                <tr>
                  <td colspan="4" bgcolor="#ccc">
                    <b> Jom Shopping Manfaat</b>
                  </td>
                </tr>
                <tr>
                  <td><b>Dijangka Hadir</b></td>
                  <td></td>
                  <td><b>Menghadiri(Terima Manfaat)</b></td>
                  <td></td>
                </tr>
                <tr>
                  <td><b>Baucer/Tag</b></td>
                  <td></td>
                  <td><b>Tidak Menghadiri</b></td>
                  <td></td>
                </tr>
                <tr>
                  <td colspan="4" bgcolor="#ccc">
                    <b> Jom Shopping SMUE</b>
                  </td>
                </tr>
                <tr>
                  <td><b></b></td>
                  <td></td>
                  <td><b></b></td>
                  <td></td>
                </tr>
                <tr>
                  <td colspan="4" bgcolor="#ccc">
                    <b> Maklumat Pendaftaran</b>
                  </td>
                </tr>
                <tr>
                  <td><b>Tarikh Pra Daftar</b></td>
                  <td>{{ emas.profile.tkh_dimasukkan }}</td>
                  <td><b>Tarikh Terima Borang</b></td>
                  <td>{{ emas.profile.tkh_dokumen_diterima }}</td>
                </tr>
                <tr>
                  <td><b>Tarikh Serah Borang</b></td>
                  <td>{{ emas.profile.tkh_dokumen_dihantar }}</td>
                  <td><b>Tarikh Pulang Borang RMSB</b></td>
                  <td>{{ emas.profile.tkh_dokumen_diterima }}</td>
                </tr>
                <tr>
                  <td><b>Kemaskini Oleh</b></td>
                  <td>{{ emas.profile.id_kemaskini }}</td>
                  <td><b>Tarikh Kemaskini</b></td>
                  <td>{{ emas.profile.tkh_kemaskini }}</td>
                </tr>
                <tr>
                  <td><b>Pengesahan Oleh</b></td>
                  <td>{{ emas.profile.nama_pengesah }}</td>
                  <td><b>Tarikh Pengesahan</b></td>
                  <td>{{ emas.profile.tkh_dokumen_disemak }}</td>
                </tr>
                <tr>
                  <td><b>Catatan Semakan</b></td>
                  <td>{{ emas.profile.semakan }}</td>
                </tr>
                <tr>
                  <td><b>Jenis Pendaftaran</b></td>
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
                  <td colspan="4" bgcolor="#ccc"><b>Maklumat Ahli</b></td>
                </tr>
                <tr>
                  <td><b>Nama</b></td>
                  <td colspan="3">{{ skw.Nama }}</td>
                </tr>
                <tr>
                  <td><b>No Kp</b></td>
                  <td>{{ skw.NoKPBaru }}</td>
                  <td><b>No Kp Lama</b></td>
                  <td>{{ skw.NoKPLama }}</td>
                </tr>
                <tr>
                  <td><b>No. Tel</b></td>
                  <td>{{ skw.NoTel }}</td>
                  <td><b>Pekerjaan</b></td>
                  <td>{{ skw.Pekerjaan }}</td>
                </tr>
                <tr>
                  <td><b>Kaum</b></td>
                  <td>{{ skw.Kaum }}</td>
                  <td><b>Agama</b></td>
                  <td>{{ skw.Agama }}</td>
                </tr>
                <tr>
                  <td><b>Alamat</b></td>
                  <td colspan="3">{{ skw.Alamat1 }}</td>
                </tr>
                <tr>
                  <td><b></b></td>
                  <td colspan="3">{{ skw.Alamat2 }}</td>
                </tr>
                <tr>
                  <td><b>Poskod</b></td>
                  <td>{{ skw.Poskod }}</td>
                  <td><b>Bandar</b></td>
                  <td>{{ skw.Bandar }}</td>
                </tr>
                <tr>
                  <td><b>Daerah</b></td>
                  <td>{{ skw.Daerah }}</td>
                </tr>
                <tr>
                  <td colspan="4" bgcolor="#ccc">
                    <b>Maklumat Pemeriksaan</b>
                  </td>
                </tr>
                <tr>
                  <td><b>No.</b></td>
                  <td><b>Operator</b></td>
                  <td><b>Tarikh Pemeriksaan</b></td>
                  <td><b>Jenis Pemeriksan</b></td>
                </tr>
              </table>
            </div>
            <footer class="card-footer"></footer>
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
            <p class="card-header-title">Tiada</p>
          </div>
        </div>
        <div v-for="ipr in submittedApplications" :key="ipr">
          <div class="card" aria-id="contentIdForA11y3">
            <div class="card-header" role="button">
              <p class="card-header-title level">
                <span class="level-left">
                  {{ iprList.find(item => ipr.ipr_code === item.id).name }}
                </span>
                <span class="tag is-info level-right">Dalam Proses</span>
              </p>
            </div>
          </div>
          <br />
        </div>
        <div>
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
                <span v-else class="tag is-danger level-right"
                  >Tiada Rekod</span
                >
              </p>
            </div>
          </div>
          <br />
        </div>
        <div>
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
                <span v-else class="tag is-danger level-right"
                  >Tiada Rekod</span
                >
              </p>
            </div>
          </div>
          <br />
        </div>
        <div>
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
                <span v-else class="tag is-danger level-right"
                  >Tiada Rekod</span
                >
              </p>
            </div>
          </div>
          <br />
        </div>
        <div>
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
                <span v-else class="tag is-danger level-right"
                  >Tiada Rekod</span
                >
              </p>
            </div>
          </div>
          <br />
        </div>
        <div>
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
                <span v-else class="tag is-danger level-right"
                  >Tiada Rekod</span
                >
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
import axios from 'axios'
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
      isModalActive: false,
      isSMUEModalActive: false,
      isSKWModalActive: false,
      submittedApplications: this.currentUser.dockets,
      activeIPR: null,
      selectedIPRTitle: null,
      selectedIPR: null,
      tawas: null,
      emas: null,
      skw: null,
      srs: null,
      bantuanSihat: null,
      tawasLoading: true,
      emasLoading: true,
      skwLoading: true,
      srsLoading: true,
      bantuanSihatLoading: true,
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
  created() {
    this.checkTawas()
    this.checkSkw()
    this.checkEmas()
    this.checkBantuanSihat()
    this.checkSRS()
  },
  methods: {
    checkSRS() {
      axios
        .get(
          `http://ssipr-yawas-api-dev.ap-southeast-1.elasticbeanstalk.com/srs/${this.currentUser.ic}`
        )
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
        .get(
          `http://ssipr-yawas-api-dev.ap-southeast-1.elasticbeanstalk.com/bs/${this.currentUser.ic}`
        )
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
        .get(
          `http://ssipr-yawas-api-dev.ap-southeast-1.elasticbeanstalk.com/pawas/${this.currentUser.ic}`
        )
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
    checkSkw() {
      axios
        .get(
          `http://ssipr-yawas-api-dev.ap-southeast-1.elasticbeanstalk.com/skw/${this.currentUser.ic}`
        )
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
        .get(
          `http://ssipr-yawas-api-dev.ap-southeast-1.elasticbeanstalk.com/emas/${this.currentUser.ic}`
        )
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
    openSKWDetail() {
      this.isSKWModalActive = true
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
.disabled {
  opacity: 0.6;
  filter: alpha(opacity=50); /* For IE8 and earlier */
}
</style>
