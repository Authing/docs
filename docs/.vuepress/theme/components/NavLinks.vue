<template>
  <nav v-if="navLinks.length" class="nav-links">
    <!-- user links -->
    <div
      v-for="item in navLinks"
      :key="item.link"
      :class="[
        'nav-item',
        {
          'nav-item-hidden': item.hidden,
        },
      ]"
    >
      <DropdownLink v-if="item.type === 'links'" :item="item">
        <template #arrow>
          <span class="arrow-outline-down"></span>
        </template>
      </DropdownLink>
      <NavLink v-else :item="item" />
    </div>
  </nav>
</template>

<script>
import DropdownLink from '@theme/components/DropdownLink.vue'
import NavLink from '@theme/components/NavLink.vue'

export default {
  name: 'NavLinks',

  props: {
    navLinks: {
      type: Array,
      required: true,
    },
  },

  components: {
    NavLink,
    DropdownLink,
  },
}
</script>

<style lang="stylus">
.nav-links
  display inline-block
  a
    line-height 1.4rem
    color inherit
    &:hover, &.router-link-active
      color $accentColor
  .nav-item
    position relative
    display inline-block
    margin-left 1.5rem
    line-height 2rem
    &.nav-item-hidden
      display none
    &:first-child
      margin-left 0
  .repo-link
    margin-left 1.5rem
  .arrow-outline-down
    display inline-block
    height .5em
    width .5em
    border 1px solid #999
    border-left-color transparent
    border-bottom-color transparent
    transform rotate(135deg) translateY(0.3em)
    margin-left .2em

@media (max-width: $MQMobile)
  .nav-links
    .nav-item, .repo-link
      margin-left 0

@media (min-width: $MQMobile)
  .nav-links a
    &:hover, &.router-link-active
      color $textColor
  .nav-item > a:not(.external)
    &:hover, &.router-link-active
      // margin-bottom -2px
      // border-bottom 2px solid lighten($accentColor, 8%)
      position relative
      color $accentColor
      &::after
        content ''
        display block
        position absolute
        left 0
        right 0
        bottom -17px
        height 2px
        background-color lighten($accentColor, 8%)
</style>
