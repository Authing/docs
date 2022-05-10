<template>
  <div class="feedback">
    <div class="feedback-action-container">
      <h5 class="feedback-title">{{ feedbackConfig.title }}</h5>
      <button
        @click="handleFeedback(STATUS.GOOD)"
        :class="[
          'feedback-btn',
          'good',
          {
            active: status === STATUS.GOOD
          }
        ]"
      >
        <IconFont v-if="status === STATUS.GOOD" type="authing-good-" />
        <IconFont v-else type="authing-good" />
        {{ feedbackConfig.useful }}
      </button>
      <button
        @click="handleFeedback(STATUS.BAD)"
        :class="[
          'feedback-btn',
          'bad',
          {
            active: status === STATUS.BAD
          }
        ]"
      >
        <IconFont v-if="status === STATUS.BAD" type="authing-good-" />
        <IconFont v-else type="authing-good" />
        {{ feedbackConfig.useless }}
      </button>

      <div class="github-edit">
        有什么建议或错别字吗？
        <a
          :href="
            `https://github.com/Authing/docs/edit/main/docs/${$page.relativePath}`
          "
        >
          在 Github 上编辑
        </a>
      </div>
    </div>
    <div v-if="submited" class="feedback-success">
      <IconFont type="authing-tijiaochenggong" class="feedback-success-icon" />
      {{ feedbackConfig.successTip }}
    </div>
    <div v-if="status === STATUS.BAD && !submited" class="bad-reason">
      <h4 class="bad-reason-title">{{ feedbackConfig.uselessConfig.title }}</h4>

      <CheckboxGroup
        v-model="badReasons"
        :options="feedbackConfig.uselessConfig.reasons"
      />

      <textarea
        v-model="customReason"
        class="authing-custom-feedback"
        placeholder="请详细描述在文档使用中遇到的问题或改进建议（选填）"
      />

      <button @click="submitFeedbackWithReason" class="submit-feedback-btn">
        立即提交
      </button>
    </div>
    <p class="feedback-help" v-html="feedbackConfig.help"></p>
  </div>
</template>

<script>
import IconFont from "@theme/components/IconFont/index.vue";
import { feishuFeedback } from "@theme/util/feishu";
import CheckboxGroup from "@theme/components/CheckboxGroup.vue";

const STATUS = {
  NONE: 0,
  GOOD: 1,
  BAD: 2
};
export default {
  components: {
    IconFont,
    CheckboxGroup
  },
  data() {
    return {
      status: STATUS.NONE,
      badReasons: [],
      customReason: "",
      submited: false
    };
  },
  computed: {
    STATUS() {
      return STATUS;
    },
    feedbackConfig() {
      return this.$themeLocaleConfig.feedback;
    }
  },
  methods: {
    submitFeedback(params) {
      feishuFeedback(params).then(() => {});
      this.submited = true;
    },
    handleFeedback(status) {
      if (status === this.status) {
        return;
      }
      this.submited = false;
      this.status = status;

      if (this.status === STATUS.GOOD) {
        this.submitFeedback({
          helpful: status === STATUS.GOOD,
          docTitle: this.$page.title,
          docUrl: window.location.href,
          customReason: ""
        });
      }
    },
    submitFeedbackWithReason() {
      this.submitFeedback({
        helpful: status === STATUS.GOOD,
        docTitle: this.$page.title,
        docUrl: window.location.href,
        customReason: this.customReason,
        reasonList: this.badReasons
      });
    }
  }
};
</script>

<style lang="stylus">
.feedback
  background #FFFFFF
  border-radius 4px
  border 1px solid #EEEEEE
  padding 30px 24px
  margin-top 34px
  .github-edit
    font-size 14px
    flex 1
    text-align right
  .feedback-action-container
    display flex
    align-items center
    margin-bottom 18px
    .feedback-btn
      width 88px
      height 34px
      background #FFFFFF
      border-radius 0px 4px 4px 0px
      border 1px solid #EEEEEE
      cursor pointer
      font-size 14px
      color #6D7278
      margin-right: 17px;
      &.active
        color $accentColor
      &.bad
        .icon
          transform rotate(180deg)
      &:focus
        outline none
      &:first-of-type
        margin-left 15px
      &:not(:first-of-type)
        // border-left none
        border-bottom-left-radius 0
        border-top-left-radius 0
      &:not(:last-of-type)
        border-bottom-right-radius 0
        border-top-right-radius 0
  .authing-checkbox-item
    flex-grow 0
    margin-right 49px
    width auto
  .feedback-title
    font-size 16px
    font-weight 400
    color #333333
    line-height 22px
    margin 0
  .feedback-help
    color #6D7278
    margin-top 14px
    margin-bottom 0
    font-size 14px
  .bad-reason
    background: #F8FAFC;
    padding 24px
    .bad-reason-title
      color #6D7278
      margin 0
      margin-bottom 24px
      font-weight normal
  .feedback-success
    background: #F8FAFC;
    padding 18px 24px
    margin-bottom 14px
    display flex
    align-items center
  .feedback-success-icon
    color #396AFF
    margin-right 1em
    flex-shrink 0
  .authing-custom-feedback
    width 608px
    height 82px
    background #FFFFFF
    border-radius 1px
    border 1px solid #EEEEEE
    font-size 14px
    padding 14px 20px
    margin-top 14px
    resize none
    height 98px
    width 100%
    box-sizing border-box
    &:focus
      outline none
  .submit-feedback-btn
    background-color #396AFF
    background #396AFF
    border-radius 4px
    height 40px
    line-height 40px
    width 120px
    margin-top 24px
    color #fff
    outline none
    border none
    cursor pointer
    &:focus
      outline none
      border none
    &:hover
      background-color #2e55cc

@media (max-width: $MQMobile)
  .feedback
    .feedback-action-container
      flex-wrap wrap
      .feedback-title
        width 100%
      .feedback-btn
        margin-top 14px
        &:first-of-type
          margin-left 0
</style>
