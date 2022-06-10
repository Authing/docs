<template>
  <section
    class="sidebar-group"
    :class="[
      {
        collapsable,
        'is-sub-group': depth !== 0
      },
      `depth-${depth}`
    ]"
  >
    <RouterLink
      v-if="item.path"
      class="sidebar-heading clickable"
      :class="{
        open,
        active: isActive($route, item.path)
      }"
      :to="item.path"
      @click.native="$emit('toggle')"
    >
      <span v-show="collapsable" class="arrow" :class="open ? 'down' : 'right'" />
      <span class="sidebar-heading__title">{{ item.title }}</span>
    </RouterLink>

    <p
      v-else
      class="sidebar-heading"
      :class="{ open }"
      @click="$emit('toggle')"
    >
      <span v-show="collapsable" class="arrow" :class="open ? 'down' : 'right'" />
      <span class="sidebar-heading__title">{{ item.title }}</span>
    </p>

    <DropdownTransition>
      <SidebarLinks
        v-show="open || !collapsable"
        class="sidebar-group-items"
        :items="item.children"
        :sidebar-depth="item.sidebarDepth"
        :initial-open-group-index="item.initialOpenGroupIndex"
        :depth="depth + 1"
        :index="index"
        @onClickMenu="onClickMenu"
        :check-index="checkIndex"
      />
    </DropdownTransition>
  </section>
</template>

<script>
import { isActive } from "../util";
import DropdownTransition from "@theme/components/DropdownTransition.vue";

export default {
  name: "SidebarGroup",

  components: {
    DropdownTransition
  },

  props: ["item", "open", "collapsable", "depth", "index", "checkIndex"],

  // ref: https://vuejs.org/v2/guide/components-edge-cases.html#Circular-References-Between-Components
  beforeCreate() {
    this.$options.components.SidebarLinks = require("@theme/components/SidebarLinks.vue").default;
  },

  methods: {
    isActive,
    onClickMenu(dataIndex) {
      this.$emit('onClickMenu', dataIndex)
    }
  }
};
</script>

<style lang="stylus" scoped>
.sidebar-group
  .sidebar-group
    padding-left 16px
  &:not(.collapsable)
    .sidebar-heading:not(.clickable)
      cursor auto
      color inherit
  // refine styles of nested sidebar groups
  &.is-sub-group
    padding-left 0
    & > .sidebar-heading
      font-size 14px
      line-height 22px
      font-weight normal
      padding-left 24px
      // &:not(.clickable)
      //   opacity 0.5
    & > .sidebar-group-items
      padding-left 16px
      & > li > .sidebar-link
        font-size: 14px
        border-left none
  &.depth-2
    & > .sidebar-heading
      border-left none
  // &.depth-2
  //   & > .sidebar-heading
  //     font-weight 500
  // &.depth-1
  //   ul a:not(.active)
  //     opacity 0.5
  &.depth-0
    a
      color #4E5969
.sidebar-heading
  position relative
  // color $textColor
  color #4E5969
  transition color .15s ease
  cursor pointer
  font-size 16px
  // text-transform uppercase
  line-height: 22px
  padding 0.35rem 1.5rem 0.35rem 24px
  width 100%
  box-sizing border-box
  margin 0
  // white-space nowrap
  // overflow hidden
  // text-overflow ellipsis
  &.open, &:hover
    color inherit
  .arrow
    position absolute
    top: 50%;
    transform: translateY(-50%);
    left 8px
  &.clickable
    &.active
      font-weight 500
      color $accentColor !important
    &:hover
      color $accentColor !important

.sidebar-group-items
  transition height .1s ease-out
  font-size 0.95em
  overflow hidden
.depth-0 > ul > li
  & > .sidebar-group > .sidebar-heading, & > .sidebar-link
    font-size: 16px
    line-height 26px
</style>
