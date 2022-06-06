<template>
  <header class="navbar fixed-header">
    <div
      class="navbar-container content-layout-container"
      :class="{
        'content-layout-container__without-sidebar': $frontmatter.noSidebar
      }"
    >
      <div class="nav-bar-logo-container">
        <a :href="$site.themeConfig.officeSiteUrl" class="nav-bar-new-logo">
          <img
            v-if="$site.themeConfig.logo"
            class="logo"
            :src="$withBase($site.themeConfig.logo)"
            :alt="$siteTitle"
          />
        </a>

        <Divider />

        <RouterLink :to="$localePath" class="home-link">
          <span ref="siteName" class="site-name">{{
            $localeConfig.navbarTitle
          }}</span>
        </RouterLink>
      </div>

      <div
        class="links can-hide"
        :style="
          linksWrapMaxWidth
            ? {
                'max-width': linksWrapMaxWidth + 'px'
              }
            : {}
        "
      >
        <!-- <SearchBox
        v-else-if="
          $site.themeConfig.search !== false &&
            $page.frontmatter.search !== false
        "
      /> -->
        <NavLinks class="can-hide" :navLinks="userNavLinks" />
      </div>

      <AlgoliaSearchBox v-if="isAlgoliaSearch" :options="algolia" />
      <SearchInput :placeholder="$themeLocaleConfig.searchInDoc" />

      <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')" />

      <!-- <SwitchLocale /> -->
      <!-- <button class="contact-us">联系我们</button> -->

      <!-- <IconFont class="navbar-lang-icon" type="authing-login-language" /> -->
      <!-- <div class="navbar-lang-container">
        <NavLinks class="can-hide lang-navs" :navLinks="languageNavLinks" />
      </div> -->
    </div>
  </header>
</template>

<script>
import AlgoliaSearchBox from "@AlgoliaSearchBox";
import SidebarButton from "@theme/components/SidebarButton.vue";
import NavLinks from "@theme/components/NavLinks.vue";
import Divider from "@theme/components/Divider.vue";
import SearchInput from "@theme/components/SearchInput.vue";
import IconFont from "@theme/components/IconFont/index.vue";
import { getUserNavLinks, getLanguageNavLinks } from "@theme/util/navLinks";
import SwitchLocale from "@theme/components/SwitchLocale.vue";

export default {
  name: "Navbar",

  components: {
    SwitchLocale,
    SidebarButton,
    NavLinks,
    AlgoliaSearchBox,
    Divider,
    SearchInput,
    IconFont
  },

  data() {
    return {
      linksWrapMaxWidth: null
    };
  },

  computed: {
    algolia() {
      return (
        this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
      );
    },

    isAlgoliaSearch() {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName;
    },

    userNavLinks() {
      return getUserNavLinks(this);
    },

    languageNavLinks() {
      return getLanguageNavLinks(this);
    }
  },

  mounted() {
    const MOBILE_DESKTOP_BREAKPOINT = 719; // refer to config.styl
    const NAVBAR_VERTICAL_PADDING =
      parseInt(css(this.$el, "paddingLeft")) +
      parseInt(css(this.$el, "paddingRight"));
    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.linksWrapMaxWidth = null;
      } else {
        this.linksWrapMaxWidth =
          this.$el.offsetWidth -
          NAVBAR_VERTICAL_PADDING -
          ((this.$refs.siteName && this.$refs.siteName.offsetWidth) || 0);
      }
    };
    handleLinksWrapWidth();
    window.addEventListener("resize", handleLinksWrapWidth, false);
  },

  methods: {
    getUserNavLinks,
    getLanguageNavLinks
  }
};

function css(el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView;
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property];
}
</script>

<style lang="stylus">
$navbar-vertical-padding = 0.7rem
$navbar-horizontal-padding = 0

.navbar
  padding $navbar-vertical-padding $navbar-horizontal-padding
  line-height $navbarHeight - 1.4rem
  background-color white
  box-shadow 0px 0px 4px 0px rgba(0, 0, 0, 0.02)
  border-bottom 1px solid #DDDDDD
  .nav-bar-logo-container
    width 249px
    padding-right 1.5rem
    box-sizing border-box
    display flex
    align-content center
    align-items center
  a, span, img
    display inline-block
  .navbar-container
    box-sizing border-box
    padding 0 24px
    display flex
    align-items center
    margin 0 auto
  .logo
    // height $navbarHeight - 1.4rem
    // min-width $navbarHeight - 1.4rem
    width 90px
    margin-right 0
    vertical-align top
  .site-name
    font-size 16px
    font-weight 400
    color $textColor
    line-height 22px
  .links
    padding-left 24px
    box-sizing border-box
    background-color white
    white-space nowrap
    font-size 0.9rem
    display flex
    flex 1
    justify-content flex-start
    .search-box
      flex: 0 0 auto
      vertical-align top
    .nav-link
      color $subTitleColor
      // padding: 0 20px;
  .authing-search-box
    width 200px
    margin 0
  .contact-us
    color $subTitleColor
    background-color transparent
    border 1px solid #ddd
    outline none
    padding 7px 17px
    border-radius 2px
    cursor pointer
    margin-left 24px
    margin-right 24px
    &:focus, &:active
      outline none
  .navbar-lang-container
    margin-left 30px
    .navbar-lang-icon
      color #6D7278
    .lang-navs
      .title
        color #6D7278
      .arrow
        border-top-color #6D7278

.nav-bar-new-logo
  position relative
  width 90px
.nav-bar-new-logo .logo
  position absolute
  top 50%
  transform translateY(-50%)

@media (max-width: $MQMobile)
  .navbar
    padding 0 1.25rem
    .navbar-container
      padding 0
      height 100%
    .can-hide
      display none
    .links
      padding-left 1.5rem
    .site-name
      width calc(100vw - 9.4rem)
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
    .sidebar-button
      position static
      padding 0
    .nav-bar-logo-container
      // width auto
      .logo
        width auto
        height 1.5rem
        vertical-align middle
    .authing-search-box
      margin-right 0.25rem
      margin-left auto
      width auto
      > input
        box-sizing border-box
        // padding-left 1rem
        width 1rem
        background #fff url(../assets/images/search-mobile.svg) 0.6rem 50% no-repeat
        background-size 1.2rem
        transform: translateY(-1px);
        transition width .3s

        &:focus
          width 10.75rem
          background #fff url(../assets/images/search.svg) 0.6rem 50% no-repeat
          background-size 1rem
    .navbar-lang-container
      display none
    .site-name
      vertical-align middle
      width auto
</style>
