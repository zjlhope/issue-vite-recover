import { MessageBox } from 'element-ui';

const $confirm = MessageBox.confirm

/**
 * 二次确认注释器
 * @param config {object} 配置项，取值有：
 *    · title {string|function} 确认框标题
 *    · msg {string|function} 确认框提示语
 *    · confirmOptions {object} 确认框配置项
 *    · cancelCallbackName {string|function} 回调函数或函数名以找到当前实例下的方法
 *    · hasBeforeClose {boolean} 是否使用 beforeClose 方法执行函数
 * @returns {(function(*, *, *): void)|*}
 */
export const confirm = (config = {}) => {
  return function(target, name, descriptor) {
    const {
      title = '提示',
      msg = '确认执行该操作？',
      confirmOptions = {},
      cancelCallback = '',
      hasBeforeClose = false
    } = config
    
    const confirmCb = descriptor.value
    let cancelCb = () => {}
    if (typeof cancelCallback === 'function') {
      cancelCb = cancelCallback
    } else if (target.hasOwnProperty(cancelCallback.toString()) && typeof target[cancelCallback.toString()] === 'function') {
      cancelCb = target[cancelCallback.toString()]
    }
    
    descriptor.value = function(...rest) {
      let t = title
      if (typeof title === 'function') {
        t = title(...rest)
      }
      let m = msg
      if (typeof msg === 'function') {
        m = msg(...rest)
      }
      if (hasBeforeClose) {
        $confirm(m, t, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          ...confirmOptions,
          beforeClose: async (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              try {
                await confirmCb.call(this, ...rest)
                instance.confirmButtonLoading = false
                done()
              } catch (e) {
                instance.confirmButtonLoading = false
                console.error(e)
              }
            } else {
              try {
                await cancelCb.call(this, ...rest)
                done();
              } catch (e) {}
            }
          }
        })
      } else {
        $confirm(msg, title, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          ...confirmOptions
        }).then(() => {
          confirmCb.call(this, ...rest)
        }).catch(() => {
          cancelCb.call(this, ...rest)
        })
      }
    }
  }
}