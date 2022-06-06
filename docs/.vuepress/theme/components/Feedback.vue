<template>
  <div>
    <div class="feedback">
      <div class="feedback-action-container">
        <h5 class="feedback-title">{{ feedbackConfig.title }}</h5>

        <v-popover placement="bottom-end">
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
            <!-- <IconFont v-if="status === STATUS.GOOD" type="authing-good-" /> -->
            <IconFont type="authing-good-" />
            {{ feedbackConfig.useful }}
          </button>

          <!-- This will be the content of the popover -->
          <template slot="popover">
            <div style="position:relative">
              <div v-if="submitted" class="feedback-success">
                <!-- <div class="feedback-success"> -->
                <div>
                  <img
                    width="122px"
                    src="~@theme/assets/images/feedback-success.png"
                    alt="Feedback Success"
                    style="display:block;margin: 10px auto;"
                  />
                </div>
                <div style="text-align: center">
                  <IconFont
                    type="authing-tijiaochenggong"
                    class="feedback-success-icon"
                  />
                  {{ feedbackConfig.successTip }}
                </div>
              </div>

              <div v-else class="bad-reason">
                <h4 class="bad-reason-title">
                  感谢反馈请问还有其他建议吗？
                </h4>

                <textarea
                  v-model="customReason"
                  class="authing-custom-feedback"
                  placeholder="请详细描述在文档使用中遇到的问题或改进建议（选填）"
                />

                <button
                  @click="submitFeedbackWithReason"
                  class="submit-feedback-btn"
                >
                  提交
                </button>
                <p class="feedback-help" v-html="feedbackConfig.help"></p>
              </div>
            </div>
          </template>
        </v-popover>

        <v-popover placement="bottom-end">
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
            <!-- <IconFont v-if="status === STATUS.BAD" type="authing-good-" /> -->
            <IconFont type="authing-good-" />
            {{ feedbackConfig.useless }}
          </button>

          <!-- This will be the content of the popover -->
          <template slot="popover">
            <div style="position:relative">
              <div v-if="submitted" class="feedback-success">
                <!-- <div class="feedback-success"> -->
                <div>
                  <img
                    width="122px"
                    src="~@theme/assets/images/feedback-success.png"
                    alt="Feedback Success"
                  />
                </div>
                <div>
                  <IconFont
                    type="authing-tijiaochenggong"
                    class="feedback-success-icon"
                  />
                  {{ feedbackConfig.successTip }}
                </div>
              </div>

              <div v-else class="bad-reason">
                <h4 class="bad-reason-title">
                  <span style="color: red">*</span>
                  {{ feedbackConfig.uselessConfig.title }}
                </h4>

                <CheckboxGroup
                  v-model="badReasons"
                  :options="feedbackConfig.uselessConfig.reasons"
                />

                <textarea
                  v-model="customReason"
                  class="authing-custom-feedback"
                  placeholder="请详细描述在文档使用中遇到的问题或改进建议（选填）"
                />

                <button
                  @click="submitFeedbackWithReason"
                  class="submit-feedback-btn"
                >
                  提交
                </button>
                <p class="feedback-help" v-html="feedbackConfig.help"></p>
              </div>
            </div>
          </template>
        </v-popover>

        <div class="github-edit">
          有建议或错误，可直接

          <a
            href="https://github.com/Authing/docs/issues/new?assignees=&labels=question&template=question.md"
          >
            {{ $localeConfig.githubFeedback }}
          </a>
        </div>
      </div>
    </div>
    <ConsoleBanner />
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
      submitted: false,
      submitDialogVisible: false
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
  watch: {
    $route(a, b) {
      if (a.name !== b.name) {
        this.resetState();
      }
    }
  },
  methods: {
    resetState() {
      this.status = STATUS.NONE;
      this.badReasons = [];
      this.customReason = "";
      this.submitted = false;
      this.submitDialogVisible;
    },
    handleFeedback(status) {
      if (status === this.status) {
        return;
      }
      this.submitDialogVisible = true;
      this.submitted = false;
      this.status = status;

      // if (this.status === STATUS.GOOD) {
      //   feishuFeedback({
      //     helpful: status === STATUS.GOOD,
      //     docTitle: this.$page.title,
      //     docUrl: window.location.href,
      //     customReason: ""
      //   });
      // }
    },
    submitFeedbackWithReason() {
      feishuFeedback({
        helpful: this.status === STATUS.GOOD,
        docTitle: this.$page.title,
        docUrl: window.location.href,
        customReason: this.customReason,
        reasonList: this.badReasons
      }).then(() => {
        this.submitted = true;
        this.customReason = "";
        this.badReasons = [];
      });
    },
    hideSubmitDialog() {
      if (this.submitDialogVisible) {
        this.submitDialogVisible = false;
      }
    }
  }
};
</script>

<style lang="stylus">
.feedback
  background #FFFFFF
  border-radius 4px
  // border 1px solid #EEEEEE
  padding 30px 0
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
    display block
    width 90px
    height 32px
    background: #F2F3F5;
    border-radius: 4px;
    border 1px solid #EEEEEE
    cursor pointer
    font-size 14px
    color #4E5969
    margin-left: 12px
    &.active
      color $accentColor
    &.bad
      .icon
        transform rotate(180deg)
    &:focus
      outline none
    // &:first-of-type
    //   margin-left 15px
    // &:not(:first-of-type)
    //   // border-left none
    //   border-bottom-left-radius 0
    //   border-top-left-radius 0
    // &:not(:last-of-type)
    //   border-bottom-right-radius 0
    //   border-top-right-radius 0

  .feedback-title
    font-size 16px
    font-weight 400
    color #1D2129
    line-height 26px
    margin 0
.feedback-help
  color #6D7278
  margin-top 14px
  margin-bottom 0
  font-size 12px
  float: right;
  clear: both;
.bad-reason
  overflow: hidden
  .authing-checkbox-item
    margin: 0 49px 9px 0
    flex-grow 0
    width auto
  .authing-checkbox
    display block
  .bad-reason-title
    color #6D7278
    margin 0
    margin-bottom 17px
    font-size: 14px
    font-weight normal
.feedback-success,.bad-reason
  z-index: 8888;
  background: #FFFFFF;
  border: 1px solid #E5E6EB;
  box-shadow: 0px 16px 32px -10px rgba(4, 24, 115, 0.1);
  border-radius: 4px;
  width: 352px;
  // background: #F8FAFC;
  padding 24px
.feedback-success-icon
  color #396AFF
  margin-right 1em
  flex-shrink 0
.authing-custom-feedback
  width 100%
  height 90px
  min-height: 90px
  max-height: 300px
  background: #F2F3F5;
  border-radius: 2px;
  border 1px solid #EEEEEE
  font-size 14px
  padding 14px 20px
  margin-top 25px
  resize vertical

  box-sizing border-box
  &:focus
    outline none
.submit-feedback-btn
  float right
  background-color #396AFF
  background #396AFF
  border-radius 4px
  height 28px
  line-height 28px
  width 64px
  margin-top 14px
  color #fff
  font-size 14px
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
    .github-edit
      display: none
    .feedback-action-container
      flex-wrap wrap
      .feedback-title
        width 100%
      .feedback-btn
        margin-top 14px
        &:first-of-type
          margin-left 0
</style>
