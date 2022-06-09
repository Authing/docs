<template>
  <div v-if="prev || next" class="page-nav">
    <p class="inner">
      <span v-if="prev" class="prev">
        <a
          v-if="prev.type === 'external'"
          class="prev"
          :href="prev.path"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="arrow-outline"></span>
          {{ $themeLocaleConfig.prevDoc }}:
          {{ prev.title || prev.path }}

          <OutboundLink />
        </a>

        <RouterLink v-else class="prev" :to="prev.path">
          <span class="arrow-outline"></span>
          {{ $themeLocaleConfig.prevDoc }}:
          {{ prev.title || prev.path }}
        </RouterLink>
      </span>

      <span v-if="next" class="next">
        <a
          v-if="next.type === 'external'"
          :href="next.path"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ $themeLocaleConfig.nextDoc }}:
          {{ next.title || next.path }}
          <span class="arrow-outline"></span>

          <OutboundLink />
        </a>

        <RouterLink v-else :to="next.path">
          {{ $themeLocaleConfig.nextDoc }}:
          {{ next.title || next.path }}
          <span class="arrow-outline"></span>
        </RouterLink>
      </span>
    </p>
  </div>
</template>

<script>
import { resolvePage } from '../util'
import isString from 'lodash/isString'
import isNil from 'lodash/isNil'

export default {
  name: 'PageNav',

  props: ['sidebarItems'],

  computed: {
    prev() {
      return resolvePageLink(LINK_TYPES.PREV, this)
    },

    next() {
      return resolvePageLink(LINK_TYPES.NEXT, this)
    },
  },
}

function resolvePrev(page, items) {
  return find(page, items, -1)
}

function resolveNext(page, items) {
  return find(page, items, 1)
}

const LINK_TYPES = {
  NEXT: {
    resolveLink: resolveNext,
    getThemeLinkConfig: ({ nextLinks }) => nextLinks,
    getPageLinkConfig: ({ frontmatter }) => frontmatter.next,
  },
  PREV: {
    resolveLink: resolvePrev,
    getThemeLinkConfig: ({ prevLinks }) => prevLinks,
    getPageLinkConfig: ({ frontmatter }) => frontmatter.prev,
  },
}

function resolvePageLink(
  linkType,
  { $themeConfig, $page, $route, $site, sidebarItems }
) {
  const { resolveLink, getThemeLinkConfig, getPageLinkConfig } = linkType

  // Get link config from theme
  const themeLinkConfig = getThemeLinkConfig($themeConfig)

  // Get link config from current page
  const pageLinkConfig = getPageLinkConfig($page)

  // Page link config will overwrite global theme link config if defined
  const link = isNil(pageLinkConfig) ? themeLinkConfig : pageLinkConfig

  if (link === false) {
    return
  } else if (isString(link)) {
    return resolvePage($site.pages, link, $route.path)
  } else {
    return resolveLink($page, sidebarItems)
  }
}

function find(page, items, offset) {
  // lxp yysd!
  const resWithEmptyVal = []
  flatten(items, resWithEmptyVal)
  const res = resWithEmptyVal.filter(item => item.path)
  for (let i = 0; i < res.length; i++) {
    const cur = res[i]
    if (cur.path === decodeURIComponent(page.path)) {
      // 如果是当前页面
      // 先判断是不是最后一个或者第一个
      if ( (i + offset) === res.length || (i + offset) < 0) {
        // 如果是最后一个或者第一个，那就不显示下一个了
        return ;
      } else {
        // 如果不是最后一页
        return res[i + offset]
      }
    }
  }
}

function flatten(items, res) {
  for (let i = 0, l = items.length; i < l; i++) {
    if (items[i].type === 'group') {
      res.push({
        ...items[i],
        children: null
      })
      flatten(items[i].children || [], res)
    } else {
      res.push(items[i])
    }
  }
}
</script>

<style lang="stylus">

.page-nav
  padding-top 1rem
  padding-bottom 0
  width 100%
  box-size border-box
  a
    color #4E5969
    font-weight normal
    font-size 14px
    &:hover
      color #396aff
  .inner
    min-height 2rem
    margin-top 0
    border-radius 4px
    text-align center
    overflow auto // clear float
  .arrow-outline
    display inline-block
    height .6em
    width .6em
    border 1px solid #999
    border-left-color transparent
    border-bottom-color transparent
  .next
    .arrow-outline
      transform rotate(45deg)
      margin-right 5px
  .prev
    .arrow-outline
      transform rotate(-135deg)
      margin-left 5px

@media only screen and (max-width: 650px)
  .inner
    display flex
    flex-wrap wrap
    justify-content space-between
  .prev
    display block
    width 100%
    height 32px
    line-height 32px
    background #F2F3F5
  .next
    display block
    width 100%
    height 32px
    line-height 32px
    background #F2F3F5
    margin-top 16px
  .arrow-outline
    display none !important

@media only screen and (min-width: 651px)
  .inner
    display flex
    flex-wrap wrap
    justify-content space-between
</style>
