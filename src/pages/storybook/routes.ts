import aBackground from '~/abstract/canvas/widgets/backgound/story'
import aAccordion from '../../abstract/accordion-new/story'
import aAlign from '../../abstract/align/story'
import aBaloon from '../../abstract/balloon/story'
import aCollapse from '../../abstract/collapse/story'
import aField from '../../abstract/field/story'
import aList from '../../abstract/list/story'
import aModal from '../../abstract/modal/story'
import aPopover from '../../abstract/popover/story'
import aTooltip from '../../abstract/tooltip/story'
import uiAccordion from '../../ui/accordion/story'
import uiAccordionVChevron from '../../ui/accordion/variants/chevron/story'
import uiButton from '../../ui/button/story'
import uiCardInput from '../../ui/card-input/story'
import uiCheckbox from '../../ui/checkbox/story'
import uiField from '../../ui/field/story'
import uiInput from '../../ui/input/story'
import uiItem from '../../ui/item/story'
import uiItemVList from '../../ui/item/variants/list/story'
import uiLabeled from '../../ui/labeled/story'
import uiLink from '../../ui/link/story'
import uiList from '../../ui/list/story'
import uiMentions from '../../ui/mentions/story'
import uiModal from '../../ui/modal/story'
import uiNotification from '../../ui/notification/story'
import uiOrderedList from '../../ui/page-links/story'
import uiPagination from '../../ui/pagination/story'
import uiPaginator from '../../ui/pagination/widgets/paginator/story'
import uiSpinner from '../../ui/spinner/story'
import uiTextInput from '../../ui/text-input/story'
import uiTextInputVClearable from '../../ui/text-input/variants/clearable/story'
import uiTextInputVPassword from '../../ui/text-input/variants/password/story'
import uiTooltip from '../../ui/tooltip/story'

export const routes = [
  ['-'],
  ['Accordion', aAccordion, uiAccordion, uiAccordionVChevron],
  ['Align', aAlign],
  ['Balloon', aBaloon],
  ['Button', uiButton],
  ['Canvas', aBackground],
  ['CardInput', uiCardInput],
  ['Checkbox', uiCheckbox],
  ['Collapse', aCollapse],
  ['Field', aField, uiField],
  ['TextInput', uiTextInput, uiTextInputVClearable, uiTextInputVPassword],
  ['Input', uiInput],
  ['Item', uiItem, uiItemVList],
  ['Labeled', uiLabeled],
  ['Lint', uiLink],
  ['List', aList, uiList],
  ['Mentions', uiMentions],
  ['Modal', aModal, uiModal],
  ['Paginator', uiPaginator],
  ['Pagination', uiPagination],
  ['Popover', aPopover],
  ['Tooltip', aTooltip, uiTooltip],
  ['Spinner', uiSpinner],
  ['Notification', uiNotification],
  ['OrderedList', uiOrderedList],
] as const
