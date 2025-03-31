<template>
  <div class="ef-copy">
    <slot ref="content" class="ef-copy-content"></slot>
    <slot name="append"></slot>
    <div class="ef-copy-icon">
      <i class="el-icon-document-copy ef-pointer" @click.stop="onCopy"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: 'EfCopy',
  data() {
    return {
      content: ''
    }
  },
  methods: {
    onCopy() {
      this.getContentText();
      const clipboard = navigator.clipboard;
      if (clipboard) { // 不支持Clipboard对象直接报错
        return clipboard.writeText(this.content).then( // 读取内容到剪贴板
            () => this.$message.success('已成功复制到粘贴板'),
        );
      }
      if (ClipboardEvent) {
        this.execCopy();
        return;
      }
      this.$message.warning('该浏览器暂不支持该功能');
    },
    execCopy() {
      const that = this
      const copyEventHandler = function (e) {
        e.clipboardData.setData('text/plain', that.content)
        e.preventDefault()
      }
      document.addEventListener('copy', copyEventHandler)
      document.execCommand('copy')
      document.removeEventListener('copy', copyEventHandler)
      this.$message.success('已成功复制到粘贴板')
    },
    getContentText() {
      this.content = ''
      if (!(this.$slots['default'] && this.$slots['default'].length)) return '';
      this.$slots['default'].forEach((item) => {
        let innerText = ''
        if (item.elm) innerText = item.elm.innerText
        const text = item.text || innerText
        if (text) {
          this.content += text
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.ef-pointer {
  cursor: pointer;
}

.ef-copy {
  display: flex;
  //justify-content: space-between;
  align-items: center;

  i {
    display: none;
  }

  &:hover {
    i {
      display: block;
    }
  }

  &-content {
    white-space: pre-wrap;
    overflow: hidden;
  }

  &-icon {
    min-width: 12px;
    height: 20px;
    display: flex;
    margin-left: 5px;
    align-items: center;
  }
}
</style>
