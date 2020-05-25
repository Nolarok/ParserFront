import React from 'react'
import css from './CategoryTabs.scss'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { block } from '@/helpers/bem'
import { Icon } from '@/ui/Icon'
import { WithRouterProps } from 'next/dist/client/with-router'

const b = block('categoryTabs', css)

export enum CategoryTabsTheme {
  DEFAULT = 'default',
  RED = 'red',
}

type Item = {
  title: string
  count: number
  filtersCount?: number
  name: string
}

export type Props = {
  commonLink: string
  items: Item[]
  theme?: CategoryTabsTheme
}

type PropsWithRouter = Props & WithRouterProps

const CategoryTabsComponent: React.FC<PropsWithRouter> = props => {
  const { items, router, commonLink, theme = CategoryTabsTheme.DEFAULT } = props

  return (
    <div className={b({ theme })}>
      {items.map(({ title, count, filtersCount, name }, index) => (
        <Link href={`/${commonLink}/[category]`} key={index} as={`/${commonLink}/${name}`}>
          <a className={b('link', { current: name === router.query.category })}>
            <span className={b('title')}>{title}</span>
            {count > 0 && <span className={b('count', { theme })}>{count}</span>}
            {filtersCount ? (
              <span className={b('filtersCount')}>
                {filtersCount}
                <span className={b('filtersCountIconWrap')}>
                  <Icon icon="filter" width={10} />
                </span>
              </span>
            ) : null}
          </a>
        </Link>
      ))}
    </div>
  )
}

export const CategoryTabs = withRouter(CategoryTabsComponent)
