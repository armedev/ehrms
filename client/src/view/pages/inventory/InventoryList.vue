<template>
  <!--begin::Advance Table Widget 1-->
  <div class="card card-custom gutter-b">
    <!--begin::Header-->
    <div class="card-header border-0 py-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label font-weight-bolder text-dark">NHIS Tests</span>
      </h3>
    </div>
    <!--end::Header-->

    <search @search="onHandleSearch" />

    <!--begin::Body-->
    <inventory-table
      :pagination-params="{
        queriedItems,
        pages,
        perPage,
        currentPage: +$route.query.currentPage || currentPage,
      }"
      @changePage="onPageChange"
      @changePageCount="onChangePageCount"
    />
    <!--end::Body-->
  </div>
</template>

<script>
import InventoryTable from './components/InventoryTable';
import Search from '../../../utils/Search.vue';
import { setUrlQueryParams } from '../../../common/common';
export default {
  name: 'InventoryList',
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    items() {
      return this.$store.state.inventory.items;
    },
    queriedItems() {
      return this.$store.state.inventory.total;
    },
    pages() {
      return this.$store.state.inventory.pages;
    },
    perPage() {
      return this.items.length;
    },
  },
  components: { InventoryTable, Search },
  methods: {
    handlePageChange() {
      setUrlQueryParams({
        currentPage: this.currentPage,
        itemsPerPage: this.itemsPerPage,
      });
      this.$store.dispatch('inventory/fetchInventoryItems', {
        currentPage: this.$route.query.currentPage,
        itemsPerPage: this.$route.query.itemsPerPage,
        inventoryType: this.$route.params.inventoryType,
      });
    },

    onHandleSearch(search) {
      setUrlQueryParams({
        currentPage: 1,
        itemsPerPage: this.itemsPerPage,
        search: search,
      });
      this.$store.dispatch('inventory/fetchInventoryItems', {
        currentPage: 1,
        itemsPerPage: this.itemsPerPage,
        search,
        inventoryType: this.$route.params.inventoryType,
      });
    },

    onPageChange(page) {
      this.currentPage = page;
      this.handlePageChange();
    },

    onChangePageCount(pagecount) {
      setUrlQueryParams({
        pathName: 'generic-drugs',
        currentPage: this.currentPage,
        itemsPerPage: this.itemsPerPage,
      });
      this.$store.dispatch('inventory/fetchInventoryItems', {
        currentPage: this.$route.query.currentPage || this.currentPage,
        itemsPerPage: pagecount,
        inventoryType: this.$route.params.inventoryType,
      });
    },
  },
  created() {
    this.$store.dispatch('inventory/fetchInventoryItems', {
      currentPage: this.$route.query.currentPage || this.currentPage,
      itemsPerPage: this.$route.query.itemsPerPage || this.itemsPerPage,
      inventoryType: this.$route.params.inventoryType,
    });
  },
};
</script>

<style scoped></style>
