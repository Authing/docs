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
    </div>
    <div class="github-edit">
      <a
        class="link"
        :href="
          `https://github.com/Authing/docs/edit/main/docs/${$page.relativePath}`
        "
      >{{feedbackConfig.editLink}}
      </a>
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
    
    <div class="feedback-help">
      <div class="text">若你已对系统有基本了解，并且感兴趣的话，点击跳转 Authing 控制台，来开启你的 Authing 之旅！</div>
      <a class="button">部署到 Authing</a>
      <img class="shadow-banner" src="../assets/images/banner.png" />
      <div class="shadow-bg"></div>
    </div>
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
  margin-top 34px
  .github-edit
    margin-bottom 36px
    font-size 14px
    flex 1
    color #215AE5
    .link
      color #215AE5
  .feedback-action-container
    display flex
    align-items center
    margin-bottom 24px
    .feedback-btn
      width 88px
      height 34px
      background #F2F3F5
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
        border-left none
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
    font-weight 500
    color #1D2129
    line-height 26px
    margin 0
  .feedback-help
    position relative
    margin 0 auto 23px auto
    width 100%
    height 154px
    border-radius 4px
    background #215AE5
    font-size 14px
    font-family PingFang SC
    line-height 22px
    color #fff
    overflow hidden
    .text
      position absolute
      z-index 1
      width 263px
      height 66px
      left 22px
      top 20px
    .button
      display flex
      flex-direction row
      align-items flex-start
      padding 5px 24px
      gap 10px
      position absolute
      z-index 2
      width 145px
      height 32px
      left 21px
      top 104px
      background #FFFFFF
      border-radius 4px
      box-sizing border-box
      color #215AE5
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
        margin-top 8px
        &:first-of-type
          margin-left 0
    .shadow-bg
      position absolute
      background #215AE5
      border-radius 4px
      width 503px
      height 125px
      top 21px
      background linear-gradient(270.24deg, rgba(33, 90, 229, 0) 12.25%, rgba(41, 143, 252, 0.3) 58%, rgba(33, 90, 229, 0) 92.84%)
      transform matrix(-0.68, 0.81, -0.66, -0.68, 0, 0)
    .shadow-banner
      display none
@media (min-width: $MQMobile)
  .shadow-bg
    display none
  .shadow-banner
    position absolute
    width 100%
    height 154px
</style>
