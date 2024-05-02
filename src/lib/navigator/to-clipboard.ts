import i18n from '~/shared/i18n'
import { notify } from '~/shared/notify'

export function toClipboard(str: string): void {
  // https://stackoverflow.com/questions/71873824/copy-text-to-clipboard-cannot-read-properties-of-undefined-reading-writetext
  if (window.isSecureContext) {
    navigator.clipboard
      .writeText(str)
      .then(() => {
        notify({ data: i18n.t('t:copied'), type: 'success' })
      })
      .catch((err) => {
        console.error(err)
        notify({ data: i18n.t('t:error'), type: 'error' })
      })
  } else {
    const textArea = document.createElement('textarea')
    textArea.value = str
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    try {
      document.execCommand('copy')
      notify({ data: i18n.t('t:copied'), type: 'success' })
    } catch (err) {
      notify({ data: i18n.t('t:error'), type: 'error' })
    }
    document.body.removeChild(textArea)
  }
}
