import { tName, tStrings, useT } from '~/lib/i18n'
import I18nDropdown from '~/ui/language-dropdown'
import Page from '~/ui/layout/variants/page'
import ThemeDropdown from '~/ui/theme-dropdown'

export default function Login(): JSX.Element {
  const t = useT(tStrings, tName)

  return (
    <Page title={t.pages.settings()}>
      <ThemeDropdown />
      <I18nDropdown />
    </Page>
  )
}
