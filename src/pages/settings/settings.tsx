import I18nDropdown from '~/ui/language-dropdown'
import Page from '~/ui/layout/variants/page'
import ThemeDropdown from '~/ui/theme-dropdown'

export default function Login(): JSX.Element {
  return (
    <Page title={'settings'}>
      <ThemeDropdown />
      <I18nDropdown />
    </Page>
  )
}
