import { pathSchema } from '~/shared/localization'

export const translationSchema = pathSchema({
  namespace: 'page-login',
  data: {
    login: '',
    password: '',
    username: '',
    add: '',
    remove: '',
    change: '',
    success: {
      loggedIn: '',
    },
  },
})
