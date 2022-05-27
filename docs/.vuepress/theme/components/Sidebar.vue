<template>
  <aside ref="sidebarRef" class="sidebar">
    <NavLinks :navLinks="userNavLinks" />
    <go-old-version />
    <!-- <NavLinks :navLinks="languageNavLinks" /> -->

    <slot name="top" />
    <template v-if="$frontmatter.sidebarType === 'none'" />
    <template v-else-if="$frontmatter.sidebarType === 'page'">
      <PageSidebar />
    </template>
    <template v-else>
      <div class="current-nav-text" v-if="currentNavText">
        {{ currentNavText }}
      </div>

      <SidebarLinks :depth="0" :items="items" />
    </template>
    <slot name="bottom" />
  </aside>
</template>

<script>
import SidebarLinks from "@theme/components/SidebarLinks.vue";
import NavLinks from "@theme/components/NavLinks.vue";
import { getUserNavLinks, getLanguageNavLinks } from "@theme/util/navLinks";
import GoOldVersion from "@theme/components/GoOldVersion.vue";
import PageSidebar from "@theme/components/PageSidebar.vue";

export default {
  name: "Sidebar",

  components: { SidebarLinks, NavLinks, GoOldVersion, PageSidebar },

  props: ["items"],

  computed: {
    currentNavText() {
      const path = this.$route.path;
      if (path.startsWith("/reference-new")) {
        return "";
      }

      const navLinks = this.$themeLocaleConfig.nav;
      if (!navLinks) {
        return "";
      }

      const currNav = navLinks.find(item => path.startsWith(item.link));

      return currNav && currNav.text;
    },

    userNavLinks() {
      return getUserNavLinks(this);
    },

    languageNavLinks() {
      return getLanguageNavLinks(this);
    }
  },

  mounted() {
    const sidebar = this.$refs.sidebarRef;
    const activeItem = sidebar && sidebar.querySelector(".active");

    if (sidebar && activeItem) {
      sidebar.scrollTop = activeItem.getBoundingClientRect().top - 200;
    }
  },

  methods: {
    getUserNavLinks,
    getLanguageNavLinks
  }
};
</script>

<style lang="stylus">
.sidebar
  position sticky
  max-height 'calc(%s - %s - %s)' % (100vh $navbarHeight $headerContentGutter)
  top calc(3.6rem + 36px)
  align-self flex-start
  width 250px


  .old-version
    display none

  ul:not(.sidebar-group-items)
    padding 0

  ul
    margin 0
    list-style-type none

  a
    display inline-block

  .nav-links
    display none
    border-bottom 1px solid $borderColor
    padding 0.5rem 0 0.75rem 0

    .nav-item, .repo-link
      display block
      line-height 1.25rem
      font-size 14px
      padding 0.5rem 0 0.5rem 1.5rem

  & > .sidebar-links
    margin-top 1rem

    & > li > a.sidebar-link
      font-size 16px
      line-height 1.7

    & > li:not(:first-child)
      margin-top .75rem

@media (max-width: $MQMobile)
  .sidebar
    position fixed
    top 0
    left unset
    right 0
    max-height unset
    height 100%
    transform translateX(100%)
    border-right none
    border-left 1px solid #eee

    .nav-links
      display block

      .dropdown-wrapper .nav-dropdown .dropdown-item a.router-link-active::after
        top calc(1rem - 2px)

    & > .sidebar-links
      padding 0 0 1rem 1.5rem !important
      margin-top 0

    .current-nav-text
      padding 1rem 0 1rem 1.5rem

    .old-version
      margin-top 1rem
</style>
