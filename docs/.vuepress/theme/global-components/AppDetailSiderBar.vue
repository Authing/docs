<template>
  <div>31111aaasdfasdf23</div>
</template>

<script>
export default {
  name: "AppDetailSiderBar",
  computed: {},
  mounted() {
    console.log(this.$themeConfig.isInConsoleAppDetail, "-----------");
    console.log(this.$page.fullHeaders[0].children, "-----------");
  }
};
</script>
