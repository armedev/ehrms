<template>
  <!--begin::Advance Table Widget 1-->
  <div class="card card-custom gutter-b">
    <update-pharmacy-item
      :displayPrompt="displayPrompt"
      @closeModal="hideModal"
      :data="itemToEdit"
    />
    <!--begin::Header-->
    <div class="card-header border-0 py-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label font-weight-bolder text-dark">Store Items</span>
      </h3>
      <div class="card-toolbar">
        <router-link
          to="/store/pharmacy/add-item"
          class="btn btn-success font-weight-bolder font-size-sm"
        >
          <add-icon /> Add New
        </router-link>
      </div>
    </div>
    <!--end::Header-->
    <search-and-filter place-holder="Search Items" @search="onHandleSearch" @sort="onHandleSort" />

    <!--begin::Body-->
    <div class="card-body py-0">
      <button-group />
      <!--begin::Table-->
      <div class="table-responsive">
        <table class="table table-head-custom table-vertical-center" id="kt_advance_table_widget_1">
          <thead>
            <tr class="text-left">
              <th class="pl-0" style="width: 20px">
                <label class="checkbox checkbox-md checkbox-inline">
                  <input type="checkbox" value="1" />
                  <span></span>
                </label>
              </th>
              <th class="pr-0" style="width: 300px">Name</th>
              <th style="min-width: 150px">Quantity</th>
              <th style="min-width: 50px">Shelf</th>
              <th style="min-width: 100px">Dosage Form</th>
              <th style="min-width: 50px">Strength/Volume</th>
              <th style="min-width: 150px">Date Created</th>
              <th class="pr-0 text-right" style="min-width: 150px">action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!items.length">
              <td colspan="9" align="center" class="text-muted">No Data</td>
            </tr>
            <tr v-for="item in items" :key="item.id">
              <td class="pl-0">
                <label class="checkbox checkbox-md checkbox-inline">
                  <input type="checkbox" value="1" />
                  <span></span>
                </label>
              </td>
              <td class="pr-0">
                <a
                  href="#"
                  class="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                  >{{ item.drug.name }}</a
                >
                <span v-if="item.drug_type === 'NHIS'" class="label label-inline label-success ml-2"
                  >NHIS</span
                >
              </td>
              <td>
                <span class="text-dark-75 font-weight-bolder d-block font-size-lg">
                  {{ item.remain_quantity }} {{ item.unit.name }}
                </span>
              </td>
              <td>
                <span class="text-dark-75 font-weight-bolder d-block font-size-lg">
                  {{ item.shelf || 'None' }}
                </span>
              </td>
              <td>
                <span
                  v-if="item.dosage_form_id"
                  class="text-dark-75 font-weight-bolder d-block font-size-lg"
                >
                  {{ item.dosage_form.name || 'None' }}
                </span>
                <span v-else class="text-dark-75 font-weight-bolder d-block font-size-lg">Nil</span>
              </td>
              <td>
                <span
                  v-if="item.measurement_id"
                  class="text-dark-75 font-weight-bolder d-block font-size-lg"
                >
                  {{ item.strength_input }} {{ item.strength.name || 'None' }}
                </span>
                <span v-else class="text-dark-75 font-weight-bolder d-block font-size-lg">Nil</span>
              </td>
              <td>
                <span class="text-dark-75 font-weight-bolder d-block font-size-lg">
                  {{ item.createdAt | moment('ddd, MMM Do YYYY, h:mma') }}
                </span>
              </td>
              <td class="pr-0 text-right">
                <a
                  href="#"
                  class="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                  @click.stop="dispenseData(item)"
                >
                  <send-icon />
                </a>
                <a
                  href="#"
                  class="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                  @click.stop="editData(item)"
                >
                  <edit-icon />
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
        @changepagecount="onChangePageCount"
      />
    </div>
    <!--end::Body-->
  </div>
  <!--end::Advance Table Widget 1-->
</template>

<script>
import UpdatePharmacyItem from './update/UpdateStoreItem.vue';
import Pagination from '@/utils/Pagination.vue';
import EditIcon from '../../../../assets/icons/EditIcon.vue';
import AddIcon from '../../../../assets/icons/AddIcon.vue';
import SendIcon from '../../../../assets/icons/SendIcon.vue';
import SearchAndFilter from '../../../../utils/SearchAndFilter';
import { setUrlQueryParams } from '../../../../common/common';
import ButtonGroup from '../../../../utils/ButtonGroup';
export default {
  data() {
    return {
      displayPrompt: false,
      itemToEdit: {},
      currentPage: 1,
      itemsPerPage: 10,
      selected: [],
    };
  },
  components: {
    ButtonGroup,
    SearchAndFilter,
    UpdatePharmacyItem,
    Pagination,
    EditIcon,
    AddIcon,
    SendIcon,
    // Search
  },
  computed: {
    items() {
      return this.$store.state.store.items;
    },
    queriedItems() {
      return this.$store.state.store.totalItems;
    },
    pages() {
      return this.$store.state.store.itemPages;
    },
    perPage() {
      return this.items.length;
    },
  },
  methods: {
    addNewData() {
      this.itemToEdit = {};
      this.displayPrompt = true;
    },

    hideModal() {
      this.displayPrompt = false;
    },

    editData(item) {
      this.itemToEdit = item;
      this.displayPrompt = true;
    },

    handlePageChange() {
      setUrlQueryParams({
        pathName: 'pharmacy-items',
        currentPage: this.currentPage,
        itemsPerPage: this.itemsPerPage,
      });
      this.$store.dispatch('store/fetchPharmacyItems', {
        currentPage: this.$route.query.currentPage,
        itemsPerPage: this.$route.query.itemsPerPage,
      });
    },

    onPageChange(page) {
      this.currentPage = page;
      this.handlePageChange();
    },

    onHandleSearch(search) {
      setUrlQueryParams({
        pathName: 'pharmacy-items',
        currentPage: this.currentPage,
        itemsPerPage: this.itemsPerPage,
        search,
      });
      this.$store.dispatch('store/fetchPharmacyItems', {
        currentPage: 1,
        itemsPerPage: this.itemsPerPage,
        search,
      });
    },

    onChangePageCount(pagecount) {
      setUrlQueryParams({
        pathName: 'pharmacy-items',
        currentPage: this.currentPage,
        itemsPerPage: this.itemsPerPage,
      });
      this.$store.dispatch('store/fetchPharmacyItems', {
        currentPage: this.$route.query.currentPage || this.currentPage,
        itemsPerPage: pagecount,
      });
    },

    onHandleSort(sort) {
      setUrlQueryParams({
        pathName: 'pharmacy-items',
        currentPage: this.currentPage,
        itemsPerPage: this.itemsPerPage,
        sort,
      });
      this.$store.dispatch('store/fetchPharmacyItems', {
        currentPage: this.$route.query.currentPage || this.currentPage,
        itemsPerPage: this.$route.query.itemsPerPage || this.itemsPerPage,
        sort,
      });
    },
  },
  created() {
    this.$store.dispatch('store/fetchPharmacyItems', {
      currentPage: this.$route.query.currentPage || this.currentPage,
      itemsPerPage: this.$route.query.itemsPerPage || this.itemsPerPage,
    });
  },
};
</script>

<style></style>
