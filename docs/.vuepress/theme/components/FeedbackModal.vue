<template>
  <div>
    <div
      v-show="selectWordVisible"
      class="select-word"
      :style="{ top: selectY, left: selectX }"
    >
      <a href="#" @click.stop="showFeedback">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style="display: inline-block; vertical-align: text-bottom"
        >
          <path
            d="M4.3035 12.6667L1.3335 15V2.66667C1.3335 2.48986 1.40373 2.32029 1.52876 2.19526C1.65378 2.07024 1.82335 2 2.00016 2H14.0002C14.177 2 14.3465 2.07024 14.4716 2.19526C14.5966 2.32029 14.6668 2.48986 14.6668 2.66667V12C14.6668 12.1768 14.5966 12.3464 14.4716 12.4714C14.3465 12.5964 14.177 12.6667 14.0002 12.6667H4.3035ZM3.84216 11.3333H13.3335V3.33333H2.66683V12.2567L3.84216 11.3333ZM5.3335 6.66667H10.6668V8H5.3335V6.66667Z"
            fill="#215AE5"
          />
        </svg>

        内容反馈
      </a>
    </div>

    <div v-show="modalVisible" class="feedback-modal">
      <div class="feedback-modal-mask" ref="mask"></div>
      <div class="feedback-modal-content">
        <!-- header -->
        <div>
          <h3 style="line-height: 24px; margin: 0; font-size: 16px">
            内容反馈
            <span
              style="float: right; color: #4e5969; cursor: pointer"
              @click="hideFeedback"
            >
              ×
            </span>
          </h3>
          <hr style="margin-left: -16px; margin-right: -16px" />
        </div>
        <!-- content -->
        <div style="font-size: 14px">
          <div>
            <p>问题类型：</p>
            <div style="display: flex; justify-content: space-between">
              <div class="option" v-for="reason in reasons" :key="reason.value">
                <input
                  type="checkbox"
                  :id="reason.value"
                  :value="reason.desc"
                  v-model="selectedReasons"
                  class="checkbox"
                />
                <label :for="reason.value">{{ reason.desc }}</label>
              </div>
            </div>
          </div>
          <div>
            <p>问题描述：</p>
            <textarea
              class="textarea"
              :placeholder="textareaPlaceholder"
              v-model="customReason"
              :class="{ focused: focused }"
              @focus="focused = true"
              @blur="focused = false"
            ></textarea>
          </div>
          <div>
            <p>标记内容：</p>
            <input
              type="text"
              disabled
              :value="selectedWords"
              style="width: 100%; line-height: 20px"
            />
          </div>
        </div>
        <!-- footer -->
        <div class="feedback-footer">
          <div
            class="submit"
            @click="hideFeedback"
            style="background: #f2f3f5; color: #1d2129"
          >
            取消
          </div>
          <div class="submit" @click="submit">提交</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectWordVisible: false,
      selectX: 0,
      selectY: 0,
      modalVisible: false,
      container: document.querySelector(".theme-default-content"),
      focused: false,
      selectedWords: "",
      selectedReasons: [],
      customReason: "",
      reasons: [
        {
          value: "A",
          desc: "无有效信息",
        },
        {
          value: "B",
          desc: "说明不清晰",
        },
        {
          value: "C",
          desc: "内容有误",
        },
        {
          value: "D",
          desc: "其他",
        },
      ],
    };
  },
  mounted() {
    this.container.addEventListener("mouseup", this.onSelected);
    // this.$refs.mask.addEventListener("click", this.hideFeedback);
  },
  destroyed() {
    this.container.removeEventListener("mouseup", this.onSelected);
    // this.$refs.mask.removeEventListener("click", this.hideFeedback);
  },
  methods: {
    hideFeedback() {
      this.modalVisible = false;
      this.selectedWords = "";
    },
    showFeedback() {
      this.selectWordVisible = false;
      this.modalVisible = true;
      this.selectedReasons = [];
      this.customReason = "";
    },
    submit() {},
    onSelected(e) {
      console.log(e);
      let word = window.getSelection().toString().trim().replace(/\n/g, ""); //选中的内容
      if (word != "") {
        this.selectedWords = word;
        this.selectWordVisible = true;
        this.selectX = e.pageX + "px";
        this.selectY = e.pageY - 50 + "px";
      } else {
        this.selectWordVisible = false;
        this.selectedWords = "";
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.select-word
  box-sizing border-box
  position absolute
  width: 96px;
  height: 38px;
  background: #FFFFFF;
  padding: 8px
  font-size 14px
  display flex
  vertical-align: bottom;
  /* 分割线/line-medium */
  border: 1px solid #E5E6EB;
  /* 投影/大投影 */
  box-shadow: 0px 16px 32px -10px rgba(4, 24, 115, 0.1);
  border-radius: 8px;

.feedback-modal-mask
  position fixed
  z-index 99
  top 0
  left 0
  right 0
  bottom 0
  background rgba(0,0,0,0.5)
.feedback-modal-content
  position fixed
  padding: 16px
  z-index 100
  box-sizing border-box
  width: 640px;
  height: 400px;
  top 50%;
  left 50%;
  margin-top: -200px
  margin-left: -320px
  background: #FFFFFF;
  border-radius:  8px;
  p
    line-height: 20px
  label
    min-width 80px
    display inline-block
  input[type="checkbox"]
    position relative
    margin-right 8px
    &:focus
      outline none
      border none
    &::before
      position absolute
      topp 0
      left 0
      width 100%
      height 100%
      content ""
      background #FFFFFF
      border 1px solid #E5E6EB
      border-radius 2px
    &:checked::before
      position absolute
      top 0
      left 0
      content "\2713"
      display flex
      align-items center
      justify-content center
      background-color #fff
      width 100%
      border 1px solid #EFEFEF
      color #fff
      font-size 12px
      background-color #165DFF
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
    color #1d2129
    resize none
    border 1px solid #F2F3F5
    font-size 14px
    &:focus
      outline none
      border none
    &.focused
      background-color #fff
      border 1px solid #165DFF

.feedback-footer
  display flex
  flex-direction row
  justify-content: end
  margin-top: 16px
  .submit
    margin-left 16px
    width 65px
    height 28px
    text-align center
    line-height 28px
    background #215AE5
    font-size 14px
    color #fff
    border-radius 4px
    cursor pointer
</style>
