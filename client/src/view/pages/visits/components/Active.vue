<template>
  <div class="row">
    <search @search="onHandleSearch" />

    <div class="col-lg-12">
      <div
        class="bg-gray-200 rounded-lg pr-4 pl-4 pointer text-center mr-2 inline-display mb-2"
        v-for="visit in visits"
        :key="visit.id"
        @click="visitDetailsPage(visit)"
      >
        <div>
          <img alt="Pic" src="/media/users/blank.png" width="50" class="mb-2" />
        </div>
        <p class="mb-0">
          <strong
            >{{ shortenName(visit.patient.fullname, 11) }}
            <span>{{ displayEllipsis(visit.patient.fullname) }}</span></strong
          >
        </p>
        <p class="mb-0">
          <small class="font-weight-bolder">{{ visit.patient.hospital_id }}</small>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '../../../../utils/Search';
export default {
  components: { Search },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    visits() {
      return this.$store.state.visit.activeVisits;
    },
    queriedItems() {
      return this.$store.state.visit.totalActiveVisits;
    },
    pages() {
      return this.$store.state.visit.activeVisitPages;
    },
    perPage() {
      return this.visits.length;
    },
  },

  methods: {
    handlePageChange() {
      this.$store.dispatch('visit/fetchActiveVisits', {
        currentPage: this.currentPage,
        itemsPerPage: this.itemsPerPage,
      });
    },

    onPageChange(page) {
      this.currentPage = page;
      this.handlePageChange();
    },

    onHandleSearch(search) {
      this.$store.dispatch('visit/fetchActiveVisits', {
        currentPage: 1,
        itemsPerPage: this.itemsPerPage,
        search,
      });
    },

    displayIcon(type) {
      if (type === 'IPD') return 'fas fa-bed';
      if (type === 'ANC') return 'fas fa-female';
    },

    cutName(name) {
      const splitName = name.split(' ');
      if (splitName.length <= 2) return name;
      splitName.splice(2, 1);
      return splitName.join(' ');
    },

    displayEllipsis(name) {
      if (name.length <= 11) return '';
      return '...';
    },

    shortenName(name, character) {
      if (!name.length || name.length <= 11) return name;

      // const cut = name.indexOf(" ", character);
      // if (cut === -1) return name;
      return name.substring(0, character);
    },

    visitDetailsPage(visit) {
      this.$router.push(`/consultation/${visit.id}`);
    },
  },
  created() {
    this.$store.dispatch('visit/fetchActiveVisits', {
      currentPage: this.currentPage,
      itemsPerPage: this.itemsPerPage,
    });
  },
};
</script>

<style>
.inline-display {
  display: inline-block;
}

.pointer {
  cursor: pointer;
}
</style>
