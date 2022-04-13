<template>
	<div v-if="lastUpdated" class="authing-last-updated">
		<span class="prefix">{{ lastUpdatedText }}:</span>
		<span class="time">{{ lastUpdated }}</span>
	</div>
</template>

<script>
export default {
	name: 'LastUpdated',
	computed: {
		lastUpdated() {
			return this.$page.lastUpdated;
		},

		lastUpdatedText() {
			if (typeof this.$themeLocaleConfig.lastUpdated === 'string') {
				return this.$themeLocaleConfig.lastUpdated;
			}
			if (typeof this.$site.themeConfig.lastUpdated === 'string') {
				return this.$site.themeConfig.lastUpdated;
			}
			return 'Last Updated';
		}
	}
};
</script>

<style lang="stylus">
.authing-last-updated
  color #999
  margin-bottom 24px
  font-size 14px
</style>
