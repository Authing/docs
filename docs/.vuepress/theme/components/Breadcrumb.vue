<template>
  <div class="breadcrumb-container">
    <ol>
      <template v-for="(item, index) of crumbs">
        <li :key="`link-${index}`">
          <NavLink :item="item" />
        </li>
        <li
          class="crumbs-gutter"
          v-if="index !== crumbs.length - 1"
          :key="`gutter-${index}`"
        >
          /
        </li>
      </template>
    </ol>
  </div>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue'

function findSideBarPath(sidebars, routePath, parentPath) {
  if (!sidebars) {
    return []
  }
  const finded = sidebars.find((item) => {
    if (item.path === '/concepts/') {
      // concepts 特殊处理
      return routePath === '/concepts/'
    }

    return routePath.startsWith(item.path)
  })

  if (!finded) {
    return []
  }

  const allPath = parentPath.concat({
    link: finded.redirect ?? finded.path,
    text: finded.title || finded.path,
  })
  // 当前菜单路由已经和路由相等，已找完
  if (finded.path === routePath) {
    return allPath
  }

  return findSideBarPath(finded.children, routePath, allPath)
}

export default {
  components: {
    NavLink,
  },
  props: {
    sidebars: {
      type: Array,
      required: true,
    },
  },
  computed: {
    crumbs() {
      const navLinks = this.$themeLocaleConfig.nav
      if (!navLinks) {
        return []
      }

      const path = this.$route.path

      const currNav = navLinks.find((item) => path.startsWith(item.link))

      if (!currNav) {
        return []
      }

      return findSideBarPath(this.sidebars, path, [
        {
          link: currNav.link,
          text: currNav.text,
        },
      ])
    },
  },
}
</script>

<style lang="stylus">
.breadcrumb-container
  margin-bottom -60px
  position relative
  z-index 1
  ol
    list-style none
    display flex
    align-items center
    padding 0em
    margin 0
    li
      color rgba(0,0,0,0.45)
      font-size 14px
      &.crumbs-gutter
        margin: 0 8px
        font-size 12px
      &:not(:last-child)
        .nav-link
          color rgba(0,0,0,0.45)
          &:hover
            color #396aff
</style>
