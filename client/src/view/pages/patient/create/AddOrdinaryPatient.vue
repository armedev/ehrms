<template>
  <div>
    <!--begin::Accordion-->
    <div
      class="accordion accordion-solid accordion-panel accordion-svg-toggle"
      id="accordionExample8"
      role="tablist"
    >
      <div class="card">
        <div class="card-header" header-tag="header" role="tab">
          <div class="card-title" v-b-toggle.accordion-1>
            <div class="card-label">Personal Details</div>
            <accordion-icon />
          </div>
        </div>
        <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
          <div class="card-body">
            <!-- NAME -->
            <div class="form-group row">
              <div class="col-lg-4">
                <label>First Name <span class="text-danger">*</span></label>
                <input
                  v-validate="'required'"
                  data-vv-validate-on="blur"
                  type="text"
                  class="form-control form-control-sm"
                  v-model="firstname"
                  placeholder="First Name"
                  name="firstname"
                />
                <span class="text-danger text-sm">{{ errors.first('firstname') }}</span>
              </div>
              <div class="col-lg-4">
                <label>Middle Name</label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  v-model="middlename"
                  placeholder="Middle Name"
                  name="middlename"
                />
                <span class="text-danger text-sm">{{ errors.first('middlename') }}</span>
              </div>
              <div class="col-lg-4">
                <label>Last Name <span class="text-danger">*</span></label>
                <input
                  v-validate="'required'"
                  data-vv-validate-on="blur"
                  type="text"
                  class="form-control form-control-sm"
                  v-model="lastname"
                  placeholder="Last Name"
                  name="lastname"
                />
                <span class="text-danger text-sm">{{ errors.first('lastname') }}</span>
              </div>
            </div>
            <!-- Contact -->
            <div class="form-group row">
              <div class="col-lg-4">
                <label>Email</label>
                <input
                  type="email"
                  class="form-control form-control-sm"
                  name="email"
                  placeholder="Enter email (Optional)"
                  v-model="email"
                />
                <span class="text-danger text-sm">{{ errors.first('email') }}</span>
              </div>
              <div class="col-lg-4">
                <label>Phone Number <span class="text-danger">*</span></label>
                <input
                  v-validate="'required|min:11|max:11'"
                  data-vv-validate-on="blur"
                  maxlength="11"
                  type="text"
                  class="form-control form-control-sm"
                  v-model="phone"
                  placeholder="Phone Number"
                  name="phone"
                />
                <span class="text-danger text-sm">{{ errors.first('phone') }}</span>
              </div>
              <div class="col-lg-4">
                <label>Religion <span class="text-danger">*</span></label>
                <select
                  v-model="religion"
                  class="form-control form-control-sm"
                  name="religion"
                  v-validate="'required'"
                  data-vv-validate-on="blur"
                >
                  <option value="Islam">Islam</option>
                  <option value="Christianity">Christianity</option>
                  <option value="Traditional">Traditional</option>
                  <option value="Other">Other</option>
                </select>
                <span class="text-danger text-sm">{{ errors.first('religion') }}</span>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-lg-4">
                <label>Date of Birth <span class="text-danger">*</span></label>
                <datepicker
                  name="date_of_birth"
                  v-validate="'required'"
                  data-vv-validate-on="blur"
                  v-model="date_of_birth"
                  input-class="form-control form-control-sm"
                  placeholder="Date of Birth"
                ></datepicker>
                <span class="text-danger text-sm">{{ errors.first('date_of_birth') }}</span>
              </div>
              <div class="col-lg-4">
                <label>Gender <span class="text-danger">*</span></label>
                <select
                  class="form-control form-control-sm"
                  v-model="gender"
                  name="gender"
                  v-validate="'required'"
                  data-vv-validate-on="blur"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <span class="text-danger text-sm">{{ errors.first('gender') }}</span>
              </div>
              <div class="col-lg-4">
                <label>Marital Status <span class="text-danger">*</span></label>
                <select
                  class="form-control form-control-sm"
                  v-model="marital_status"
                  name="marital_status"
                  v-validate="'required'"
                  data-vv-validate-on="blur"
                >
                  <option value="Married">Married</option>
                  <option value="Single">Single</option>
                  <option value="Widow">Widow</option>
                  <option value="Widower">Widower</option>
                  <option value="Divorced">Divorced</option>
                </select>
                <span class="text-danger text-sm">{{ errors.first('marital_status') }}</span>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-lg-4">
                <label>Country <span class="text-danger">*</span></label>
                <select
                  class="form-control form-control-sm"
                  v-model="country"
                  name="country"
                  v-validate="'required'"
                  data-vv-validate-on="blur"
                  @change="getStates"
                >
                  <option
                    v-for="country in countries"
                    :key="country.id"
                    :value="{ id: country.id, text: country.name }"
                  >
                    {{ country.name }}
                  </option>
                </select>
                <span class="text-danger text-sm">{{ errors.first('country') }}</span>
              </div>
              <div class="col-lg-4">
                <label>States <span class="text-danger">*</span></label>
                <select
                  class="form-control form-control-sm"
                  v-model="state"
                  name="state"
                  v-validate="'required'"
                  data-vv-validate-on="blur"
                  @change="getCities"
                >
                  <option
                    v-for="state in states"
                    :key="state.id"
                    :value="{ id: state.id, text: state.name }"
                  >
                    {{ state.name }}
                  </option>
                </select>
                <span class="text-danger text-sm">{{ errors.first('state') }}</span>
              </div>
              <div class="col-lg-4">
                <label>Local Government <span class="text-danger">*</span></label>
                <select
                  class="form-control form-control-sm"
                  v-model="lga"
                  name="lga"
                  v-validate="'required'"
                  data-vv-validate-on="blur"
                >
                  <option
                    v-for="city in cities"
                    :key="city.id"
                    :value="{ id: city.id, text: city.name }"
                  >
                    {{ city.name }}
                  </option>
                </select>
                <span class="text-danger text-sm">{{ errors.first('lga') }}</span>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-lg-4">
                <label>Home Address <span class="text-danger">*</span></label>
                <input
                  v-validate="'required'"
                  data-vv-validate-on="blur"
                  type="text"
                  class="form-control form-control-sm"
                  v-model="address"
                  placeholder="Home Address"
                  name="address"
                />
                <span class="text-danger text-sm">{{ errors.first('address') }}</span>
              </div>
            </div>
          </div>
        </b-collapse>
      </div>
      <div>
        <button
          ref="kt-submit"
          class="btn btn-primary font-weight-bold float-right"
          @click="addPatient"
        >
          Submit
        </button>
      </div>
    </div>
    <!--end::Accordion-->
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import { getCountries, getStateById, getCityById } from '../../../../assets/json/index';
import AccordionIcon from '../../../../assets/icons/AccordionIcon';
import Swal from 'sweetalert2';
export default {
  components: {
    Datepicker,
    AccordionIcon,
  },
  data() {
    return {
      gender: '',
      firstname: '',
      lastname: '',
      middlename: '',
      religion: '',
      email: '',
      phone: '',
      date_of_birth: '',
      marital_status: '',
      country: '',
      state: '',
      lga: '',
      address: '',
      countries: [],
      states: [],
      cities: [],

      showFinish: false,
      videoShowing: false,
      photoSaved: false,
      photoLoading: false,
      isDisabled: false,
      video: {},
      canvas: {},
      image: '',
    };
  },
  computed: {
    isFormValid() {
      return (
        !this.errors.any() &&
        this.lastname &&
        this.firstname &&
        this.date_of_birth &&
        this.gender &&
        this.occupation &&
        this.address &&
        this.phone &&
        this.religion &&
        this.country &&
        this.state &&
        this.image &&
        this.lga
      );
    },
  },

  created() {
    this.countries = getCountries();
  },
  methods: {
    getStates() {
      this.states = getStateById(this.country.id);
    },

    getCities() {
      this.cities = getCityById(this.state.id);
    },

    initValues() {
      this.gender = '';
      this.firstname = '';
      this.lastname = '';
      this.middlename = '';
      this.religion = '';
      this.email = '';
      this.phone = '';
      this.date_of_birth = '';
      this.marital_status = '';
      this.country = '';
      this.state = '';
      this.lga = '';
      this.address = '';
    },

    addSpinner(submitButton) {
      submitButton.classList.add('spinner', 'spinner-light', 'spinner-right');
    },

    removeSpinner(submitButton) {
      this.isDisabled = false;
      submitButton.classList.remove('spinner', 'spinner-light', 'spinner-right');
    },

    handleError(error) {
      this.$notify({
        group: 'foo',
        title: 'Error message',
        text: error.response.data,
        type: 'error',
      });
    },

    handleSuccess(response) {
      Swal.fire({
        title: 'Success!',
        html: `${response.data.message}`,
        icon: 'success',
        confirmButtonClass: 'btn btn-primary',
        heightAuto: false,
      });
    },

    notifyPhoto() {
      return this.$notify({
        group: 'foo',
        title: 'Error message',
        text: 'Please take photo',
        type: 'error',
      });
    },

    addPatient() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          // set spinner to submit button
          const submitButton = this.$refs['kt-submit'];
          this.addSpinner(submitButton);
          this.isDisabled = true;

          const data = {
            gender: this.gender,
            firstname: this.firstname,
            lastname: this.lastname,
            middlename: this.middlename,
            religion: this.religion,
            email: this.email,
            phone: this.phone,
            date_of_birth: this.date_of_birth,
            marital_status: this.marital_status,
            country: this.country.text,
            state: this.state.text,
            lga: this.lga.text,
            address: this.address,
          };
          this.$store
            .dispatch('patient/createOrdinaryPatient', data)
            .then((response) => {
              this.removeSpinner(submitButton);
              this.handleSuccess(response);
              this.initValues();
            })
            .catch((err) => {
              this.removeSpinner(submitButton);
              this.handleError(err);
            });
        }
      });
    },
  },
};
</script>

<style scoped>
.form-group {
  margin-bottom: 0.9rem !important;
}
</style>
