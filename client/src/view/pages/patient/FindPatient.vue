<template>
  <div>
    <!--begin::Card-->
    <div class="card card-custom gutter-b example example-compact">
      <div class="card-header" style="min-height: 50px !important">
        <h3 class="card-title">Find Patient Record</h3>
      </div>
      <!--begin::Form-->
      <div class="card-body" style="padding: 1rem 2.25rem">
        <div class="row">
          <div class="col-lg-6">
            <div class="form-group">
              <label>Enter Patient Name</label>
              <div class="input-group input-group-solid">
                <input
                  type="text"
                  class="form-control"
                  v-model="patient_name"
                  @keypress.enter="searchByName"
                />
                <div class="input-group-append">
                  <button type="button" class="btn btn-primary" @click="searchByName">
                    Search
                  </button>
                </div>
              </div>
              <span class="form-text text-muted">Find Patient by name</span>
            </div>
          </div>
          <div class="col-lg-6">
            <date-filter @filterbydate="searchByDate" label="Patient" />
          </div>
        </div>
      </div>

      <!--begin::Body-->
      <div v-if="patients.length" class="card-body pt-0 pb-3">
        <!--begin::Table-->
        <div class="table-responsive">
          <table class="table table-head-custom table-vertical-center table-head-bg">
            <thead>
              <tr class="text-uppercase">
                <th style="min-width: 150px">Name</th>
                <th style="min-width: 100px">
                  <span class="text-primary">Gender</span>
                </th>
                <th style="min-width: 100px">Age</th>
                <th style="min-width: 100px">status</th>
                <th class="pr-0" style="min-width: 160px">Registration Date</th>
                <th class="pr-0" style="min-width: 150px">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="patient in patients" :key="patient.id">
                <td>
                  <router-link to="/patient/profile/1234"
                    ><span class="text-dark-75 font-weight-bolder d-block font-size-lg">
                      {{ patient.fullname }}
                    </span></router-link
                  >
                </td>
                <td>
                  <span class="text-dark-75 font-weight-bolder d-block font-size-lg">
                    {{ patient.gender }}
                  </span>
                </td>
                <td>
                  <span class="text-dark-75 font-weight-bolder d-block font-size-lg">
                    {{ patient.date_of_birth | moment('from', 'now', true) }}
                  </span>
                </td>
                <td>
                  <span
                    :class="displayLabel(patient.insurance_id)"
                    class="label label-lg label-inline"
                    >{{ displayInsuranceType(patient.insurance_id) }}</span
                  >
                </td>
                <td class="pr-0">
                  <span class="text-dark-75 font-weight-bolder d-block font-size-lg">{{
                    patient.createdAt | moment('ddd, MMM Do YYYY')
                  }}</span>
                </td>
                <td class="pr-0">
                  <router-link to="#" class="btn btn-icon btn-light btn-hover-primary btn-sm mx-3">
                    <edit-icon />
                  </router-link>
                  <a
                    href="#"
                    class="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                    @click="addNewData(patient)"
                  >
                    <arrow-up-icon />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--end::Table-->
        <pagination
          :total-pages="pages"
          :total="queriedItems"
          :per-page="perPage"
          :current-page="+$route.query.currentPage || currentPage"
          @pagechanged="onPageChange"
        />
      </div>
      <p v-if="queriedItems === 0" class="card-body pt-0 pb-3 text-center">No Results</p>
      <!--end::Body-->
    </div>
    <create-visit :displayPrompt="displayPrompt" @closeModal="hideModal" :patient="patient" />
    <!--end::Card-->
  </div>
</template>

<script>
import Pagination from '@/utils/Pagination.vue';
import DateFilter from '../../../utils/DateFilter';
import ArrowUpIcon from '../../../assets/icons/ArrowUpIcon';
import EditIcon from '../../../assets/icons/EditIcon';
import CreateVisit from '../visits/create/CreateVisit';
import { setUrlQueryParams } from '../../../common/common';
export default {
  data() {
    return {
      patient_name: '',
      displayPrompt: false,
      patient: {},
      start: null,
      end: null,
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  components: {
    CreateVisit,
    ArrowUpIcon,
    Pagination,
    DateFilter,
    EditIcon,
  },
  mounted() {
    this.$store.dispatch('patient/fetchPatients', {
      currentPage: this.$route.query.currentPage,
      itemsPerPage: this.$route.query.itemsPerPage,
    });
  },

  computed: {
    patients() {
      return this.$store.state.patient.patients;
    },
    queriedItems() {
      return this.$store.state.patient.total;
    },
    pages() {
      return this.$store.state.patient.pages;
    },
    perPage() {
      return this.patients.length;
    },
  },

  methods: {
    addNewData(patient) {
      this.patient = patient;
      this.displayPrompt = true;
    },

    hideModal() {
      this.displayPrompt = false;
    },

    displayLabel(insurance) {
      if (insurance === 1) return 'label-light-primary';
      if (insurance === 2) return 'label-light-warning';
      if (insurance === 3) return 'label-light-success';
      if (insurance === 4) return 'label-light-danger';
      if (insurance === 4) return 'label-light-dark';
      return 'label-light-info';
    },

    displayInsuranceType(insurance) {
      if (insurance === 1) return 'NHIS';
      if (insurance === 2) return 'FHSS';
      if (insurance === 3) return 'PHIS';
      if (insurance === 4) return 'Retainership';
      if (insurance === 4) return 'Private';
      return 'Cash';
    },

    searchByDate(start, end) {
      (this.start = start), (this.end = end);
      this.currentPage = 1;
      setUrlQueryParams({
        pathName: 'find-patient',
        currentPage: this.currentPage,
        itemsPerPage: this.itemsPerPage,
        startDate: new Date(this.start).toISOString(),
        endDate: new Date(this.end).toISOString(),
      });
      this.$store.dispatch('patient/fetchPatients', {
        currentPage: this.$route.query.currentPage,
        itemsPerPage: this.$route.query.itemsPerPage,
        start: this.$route.query.startDate,
        end: this.$route.query.endDate,
      });
    },

    searchByName() {
      if (!this.patient_name) return this.notifyEmptyField();
      this.currentPage = 1;
      setUrlQueryParams({
        pathName: 'find-patient',
        currentPage: this.currentPage,
        itemsPerPage: this.itemsPerPage,
        search: this.patient_name,
      });
      this.$store.dispatch('patient/fetchPatients', {
        currentPage: this.$route.query.currentPage,
        itemsPerPage: this.$route.query.itemsPerPage,
        search: this.$route.query.search,
      });
    },

    handlePageChange() {
      setUrlQueryParams({
        pathName: 'find-patient',
        currentPage: this.currentPage,
        itemsPerPage: this.itemsPerPage,
      });
      this.$store.dispatch('patient/fetchPatients', {
        currentPage: this.$route.query.currentPage,
        itemsPerPage: this.$route.query.itemsPerPage,
        start: this.$route.query.startDate,
        end: this.$route.query.endDate,
      });
    },

    onPageChange(page) {
      this.currentPage = page;
      this.handlePageChange();
    },
  },
};
</script>

<style></style>
