<template>
  <div class="topbar-item">
    <div
      id="kt_quick_user_toggle"
      class="btn btn-icon btn-hover-transparent-white d-flex align-items-center btn-lg px-md-2 w-md-auto"
    >
      <div class="d-flex flex-column text-right pr-3">
        <span class="text-white opacity-50 font-weight-bold font-size-sm d-none d-md-inline">{{
          user.fullname
        }}</span>
        <span class="text-white font-weight-bolder font-size-sm d-none d-md-inline">{{
          user.role
        }}</span>
      </div>
      <span class="symbol symbol-35">
        <span class="symbol-label font-size-h5 font-weight-bold text-white bg-white-o-30">{{
          firstChar
        }}</span>
      </span>
    </div>

    <div id="kt_quick_user" ref="kt_quick_user" class="offcanvas offcanvas-right p-10">
      <!--begin::Header-->
      <div class="offcanvas-header d-flex align-items-center justify-content-between pb-5">
        <h3 class="font-weight-bold m-0">User Profile</h3>
        <a
          href="#"
          class="btn btn-xs btn-icon btn-light btn-hover-primary"
          id="kt_quick_user_close"
        >
          <i class="ki ki-close icon-xs text-muted"></i>
        </a>
      </div>
      <!--end::Header-->

      <!--begin::Content-->
      <perfect-scrollbar
        class="offcanvas-content pr-5 mr-n5 scroll"
        style="max-height: 90vh; position: relative"
      >
        <!--begin::Header-->
        <div class="d-flex align-items-center mt-5">
          <div class="symbol symbol-100 mr-5">
            <img class="symbol-label" :src="picture" alt="" />
            <i class="symbol-badge bg-success"></i>
          </div>
          <div class="d-flex flex-column">
            <a href="#" class="font-weight-bold font-size-h5 text-dark-75 text-hover-primary">
              {{ user.fullname }}
            </a>
            <div class="text-muted mt-1">{{ user.role }}</div>
            <div class="navi mt-2">
              <a href="#" class="navi-item">
                <span class="navi-link p-0 pb-2">
                  <span class="navi-icon mr-1">
                    <span class="svg-icon svg-icon-lg svg-icon-primary">
                      <!--begin::Svg Icon-->
                      <inline-svg src="media/svg/icons/Communication/Mail-notification.svg" />
                      <!--end::Svg Icon-->
                    </span>
                  </span>
                  <span class="navi-text text-muted text-hover-primary">
                    {{ user.email }}
                  </span>
                </span>
              </a>
            </div>
            <button class="btn btn-light-primary btn-bold" @click="onLogout">Sign out</button>
          </div>
        </div>
      </perfect-scrollbar>
      <!--end::Content-->
    </div>
  </div>
</template>

<style lang="scss" scoped>
#kt_quick_user {
  overflow: hidden;
}
</style>

<script>
import KTLayoutQuickUser from '@/assets/js/layout/extended/quick-user.js';
import KTOffcanvas from '@/assets/js/components/offcanvas.js';
import { parseJwt } from '../../../../core/plugins/parseJwt';
export default {
  name: 'KTQuickUser',
  data() {
    return {
      list: [
        {
          title: 'Another purpose persuade',
          desc: 'Due in 2 Days',
          alt: '+28%',
          svg: 'media/svg/icons/Home/Library.svg',
          type: 'warning',
        },
        {
          title: 'Would be to people',
          desc: 'Due in 2 Days',
          alt: '+50%',
          svg: 'media/svg/icons/Communication/Write.svg',
          type: 'success',
        },
        {
          title: 'Purpose would be to persuade',
          desc: 'Due in 2 Days',
          alt: '-27%',
          svg: 'media/svg/icons/Communication/Group-chat.svg',
          type: 'danger',
        },
        {
          title: 'The best product',
          desc: 'Due in 2 Days',
          alt: '+8%',
          svg: 'media/svg/icons/General/Attachment2.svg',
          type: 'info',
        },
      ],
      user: '',
      firstChar: '',
    };
  },
  mounted() {
    this.user = parseJwt(localStorage.getItem('user_token'));
    this.firstChar = this.user.firstname.charAt(0).toUpperCase();
    // Init Quick User Panel
    KTLayoutQuickUser.init(this.$refs['kt_quick_user']);
  },
  methods: {
    onLogout() {
      this.$store.dispatch('auth/logout').then(() => this.$router.push('/auth/login'));
    },
    closeOffcanvas() {
      new KTOffcanvas(KTLayoutQuickUser.getElement()).hide();
    },
  },
  computed: {
    picture() {
      return process.env.BASE_URL + 'media/users/300_21.jpg';
    },
  },
};
</script>
