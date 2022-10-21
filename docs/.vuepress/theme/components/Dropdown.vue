<template>
  <div
    ref="dropdownElm"
    class="authing-dropdown"
    :class="[{ 'dropdown-active': activeLink === link }]"
  >
    <div>
      <slot name="text"></slot>
      <slot v-if="activeLink === link" name="active"></slot>
      <img
        class="arrow-down"
        :src="require(`@theme/assets/images/arrow-down-line.svg`)"
        :class="[drop && (visible ? 'dropdown-visible' : 'dropdown-hide')]"
        alt="arrow"
      />
    </div>
    <transition name="fadeOpacity">
      <ul class="authing-dropdown-menu" v-show="visible">
        <li
          v-for="(item, index) in list"
          :key="index"
          @click="onLink(item)"
          :class="{ 'link-active': activeLink === item.link }"
        >
          {{ item.text }}
        </li>
      </ul>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    trigger: {
      type: String,
      default: "hover",
    },
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    link: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      visible: false,
      drop: false,
    };
  },
  mounted() {
    this.$refs.dropdownElm.addEventListener("mouseenter", () => {
      if (this.trigger === "hover") {
        this.show();
      }
    });
    this.$refs.dropdownElm.addEventListener("mouseleave", () => {
      if (this.trigger === "hover") {
        this.hide();
      }
    });
    this.$refs.dropdownElm.addEventListener("click", () => {
      if (this.trigger === "click") {
        this.handleClick();
      }
    });
  },
  computed: {
    activeLink() {
      return this.$route.path;
    },
  },
  methods: {
    show() {
      this.visible = true;
      this.drop = true;
    },
    hide() {
      this.visible = false;
    },
    handleClick() {
      if (this.visible) {
        this.hide();
      } else {
        this.show();
      }
    },
    onLink(item) {
      if (item.isRouter) {
        item.link !== this.$route.path && this.$router.push(item.link);
        setTimeout(() => {
          this.$eventBus.$emit("onChangeIndex");
        }, 200);
      } else {
        window.location.href = item.link;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
$color: #4b5a78;
.authing-dropdown {
  position: relative;
  display: flex;
  align-items: center;
  color: inherit;
  cursor: pointer;
  .arrow-down {
    margin-left: 6px;
    height: 6.5px;
  }
  &-menu {
    padding: 6px;
    position: absolute;
    top: 18px;
    left: 0;
    list-style-type: none;
    background: #ffffff;
    border: 1px solid #e5e6eb;
    box-shadow: 0px 10px 20px -10px rgba(4, 24, 115, 0.1);
    border-radius: 8px;
    z-index: 99;
    li {
      padding: 8px 10px;
      min-width: 102px;
      box-sizing: border-box;
      border-radius: 4px;
      color: $color;
      &:hover {
        background: #f2f3f5;
      }
    }
  }
  .visible {
    animation: fadeIn 0.2s forwards;
  }
}

.dropdown-visible {
  animation: fadeIn 0.2s forwards;
}
.dropdown-hide {
  animation: fadeOut 0.2s forwards;
}

$accentColor: #215ae5;
.dropdown-active {
  position: relative;
  color: $accentColor;
}
@media (min-width: 1060px) {
  .authing-dropdown {
    position: relative;
  }
  .dropdown-active {
    &::after {
      content: "";
      display: block;
      position: absolute;
      left: 0;
      right: 0;
      bottom: -12px;
      height: 2px;
      background-color: lighten($accentColor, 8%);
    }
  }
  .fadeOpacity-enter-active,
  .fadeOpacity-leave-active {
    transition: opacity 0.2s;
  }

  .fadeOpacity-enter,
  .fadeOpacity-leave-to {
    opacity: 0;
  }
}

@media (max-width: 1060px) {
  .authing-dropdown {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .authing-dropdown-menu {
    position: relative;
    top: 0;
    border: none;
    box-shadow: none;
    li {
      line-height: 26px;
      font-size: 14px;
      padding: 0.5rem 0 0 1.5rem !important;
      color: #333333;
      &:hover {
        background: inherit !important;
      }
    }
  }
  .link-active {
    color: $accentColor !important;
  }
}

@keyframes fadeOut {
  0% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
@keyframes fadeIn {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg);
  }
}
</style>
