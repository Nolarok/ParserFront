import React, { useCallback, useState, useMemo, Children } from 'react'
import { block } from '@/helpers/bem'
import { ButtonLink, ButtonLinkSize, ButtonLinkColor } from '@/ui/ButtonLink'
import css from './HideContent.scss'
import { getCountWord } from '@/helpers/number'

const b = block('hideContent', css)

type Props = {
  show?: number
  countWords?: {
    single: string
    few: string
    many: string
  }
}

export const HideContent: React.FC<Props> = props => {
  const { show = 9999, children, countWords } = props
  const [showAll, setShowAll] = useState(false)
  const childCount = useMemo(() => Children.count(children), [children])
  const moreWord = useCallback(
    (value: number) => {
      if (!countWords) {
        return ''
      }
      return getCountWord(countWords.single, countWords.few, countWords.many)(value)
    },
    [countWords]
  )

  return (
    <div className={b()}>
      {Children.map(children, (child, index) => {
        if (showAll || index < show) {
          return (
            <div className={b('item')} key={index}>
              {child}
            </div>
          )
        }
      })}
      {!showAll && childCount > show && (
        <span className={b('link')}>
          <ButtonLink
            dashed
            onClick={() => setShowAll(true)}
            color={ButtonLinkColor.BLUE}
            size={ButtonLinkSize.SMALL}
          >
            ещё {childCount - show} {moreWord(childCount - show)}
          </ButtonLink>
        </span>
      )}
    </div>
  )
}
