<template>
  <div class="card-body py-1">
    <div>
      <b-input-group>
        <b-form-input :placeholder="placeHolder" v-model="search" @keypress.enter="onSearch" />
        <b-input-group-append>
          <b-dropdown text="Dropdown" variant="outline-secondary">
            <b-dropdown-item>Action A</b-dropdown-item>
            <b-dropdown-item>Action B</b-dropdown-item>
          </b-dropdown>
          <b-form-select v-model="sort" :options="options" @change="onSort" />
        </b-input-group-append>
      </b-input-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchAndFilter',
  data() {
    return {
      search: '',
      sort: '',
      options: [
        { value: 'createdAt_asc', text: 'Date Created (Ascending)' },
        { value: 'createdAt_desc', text: 'Date Created (Descending)' },
        { value: 'date_received_asc', text: 'Date Received (Ascending)' },
        { value: 'date_received_desc', text: 'Date Received (Ascending)' },
        { value: 'drug_name_asc', text: 'Drug Name (A-Z)' },
        { value: 'drug_name_desc', text: 'Drug Name (Z-A)' },
      ],
    };
  },
  props: {
    placeHolder: {
      type: String,
      required: true,
    },
  },
  methods: {
    onSearch() {
      this.$emit('search', this.search);
    },
    onSort() {
      this.$emit('sort', this.sort);
    },
  },
};
</script>

<style scoped></style>
