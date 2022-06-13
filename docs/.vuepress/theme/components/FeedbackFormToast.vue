<template>
  <div class="feedback-toast-container" v-if="value">
    <div class="title">
      <div v-if="type === 'good'">感谢反馈请问还有其他建议吗？</div>
      <div v-else-if="type === 'bad'"><span class="highlight">*</span><span>你是否遇到以下问题？</span></div>
    </div>

    <div class="content">
      <div class="reasons" v-if="type === 'bad'">
        <div class="option" v-for="reason in reasons" :key="reason.value">
          <input type="checkbox" :id="reason.value" :value="reason.desc" v-model="selectedReasons">
          <label :for="reason.value">{{ reason.desc }}</label>
        </div>
      </div>

      <textarea class="textarea" :placeholder="textareaPlaceholder" v-model="customReason"></textarea>
    </div>

    <div class="feedback-footer">
      <div class="submit" @click="submit">提交</div>
      <div class="tips">如果遇到其他问题，立即<a href="" target="_blank">联系我们</a></div>
    </div>
  </div>
</template>

<script scoped>
function createReasons () {
  return [{
    value: 'A',
    desc: '没找到想了解的信息'
  }, {
    value: 'B',
    desc: '步骤说明不清晰/看不懂'
  }, {
    value: 'C',
    desc: '内容有错'
  }, {
    value: 'D',
    desc: '其他'
  }]
}

export default {
  props: {
    type: {
      type: String,
      default () {
        return 'good'
      },
      validator (value) {
        return ['good', 'bad'].includes(value)
      }
    },
    value: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  watch: {
    value (newVal) {
      newVal && this.resetStates()
    }
  },
  data () {
    return {
      reasons: createReasons(),
      selectedReasons: [],
      customReason: ''
    }
  },
  computed: {
    textareaPlaceholder () {
      const map = {
        good: '你的建议会让我们做的更好...',
        bad: '描述具体问题'
      }
      return map[this.type] || ''
    }
  },
  methods: {
    submit () {
      const params = {
        helpful: this.type === 'good',
        docTitle: this.$page.title,
        docUrl: window.location.href,
        customReason: this.xssCheck(this.customReason)
      }

      if (this.type === 'bad') {
        params.reasonList = this.selectedReasons
      }
      
      this.$emit('success', params)
    },
    resetStates () {
      this.selectedReasons = []
      this.customReason = ''
    },
    xssCheck (str, reg) {
      const map = {
        '<': '&lt;',
        '&':'&amp;',
        '"':'&quot;',
        '>':'&gt;',
        "'":'&#39;'
      }
      return str ? str.replace(reg || /[&<">'](?:(amp|lt|quot|gt|#39|nbsp|#\d+);)?/g, ($0, $1) => {
        return $1 ? $0 : map[$0]
      }) : ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.feedback-toast-container
  position fixed
  z-index 10
  width 352px
  left 50%
  top 50%
  transform translate(-50%, -50%)
  background #fff
  border 1px solid #E5E6EB
  box-shadow 0px 16px 32px -10px rgba(4, 24, 115, 0.1)
  border-radius 4px
  padding 24px 16px
  box-sizing border-box
  .title
    margin-bottom 20px
    font-weight 500
    font-size 14px
    line-height 22px
    .highlight
      padding-right 10px
      box-sizing border-box
      color #E8353E
  .content
    margin-bottom 16px
    .reasons
      margin-bottom 16px
      .option
        display flex
        align-items center
        margin-bottom 9px
        line-height 22px
        font-size 14px
        color #1D2129
    .textarea
      max-width 320px
      width 320px
      height 90px
      left 16px
      top 61px
      padding 5px 12px
      box-sizing border-box
      background #F2F3F5
      border-radius 2px
      border none
  .feedback-footer
    display flex
    flex-direction column
    align-items flex-end
    .submit
      margin-bottom 16px
      width 65px
      height 28px
      text-align center
      line-height 28px
      background #215AE5
      font-size 14px
      color #fff
      border-radius 4px
      cursor pointer
    .tips
      font-size 12px
      line-height 20px
      color #86909C
</style>