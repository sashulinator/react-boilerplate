import './index.scss'

import React, { createElement, useEffect, useMemo, useState } from 'react'

import Flex from '~/abstract/flex'
import { Route } from '~/lib/route'
import { emitter } from '~/shared/emitter'
import { routes } from '~/shared/routes'
import Checkbox from '~/ui/checkbox/ui/checkbox'
import { Movable } from '~/ui/icon'
import Link from '~/ui/link'
import { FormModal } from '~/ui/modal'
import OrderedList from '~/ui/page-links'
import Registry from '~/ui/registry/ui/registry'
import { toggle } from '~/utils/id-array'
import { move } from '~/utils/list'
import { getJSON } from '~/utils/local-storage'

export default function Main(): JSX.Element {
  const [isModalOpen, setModalOpen] = useState(false)
  const navRouteList =
    getJSON<string[]>('mainListOrder', (data) => {
      if (!Array.isArray(data)) throw Error('Not Array')
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      if (data?.some((item) => typeof item !== 'string' || !routes[item] || !(routes[item] as any).navigatable))
        throw Error('No such route')
    }) || []
  const [obj, update] = useState({})

  const navRoutes = useMemo(() => {
    return navRouteList
      ?.map((name) => {
        const route = routes[name] as Route
        if (route === undefined) return undefined
        return (
          <Flex
            key={name}
            style={{ position: 'relative' }}
            height='100%'
            width='100%'
            className='box'
            dir='column'
            mainAxis='center'
            crossAxis='center'
            gap='l'
          >
            <Flex
              height='2rem'
              width='2rem'
              mainAxis='center'
              crossAxis='center'
              className='movable'
              style={{
                color: 'var(--color)',
                opacity: '.5',
                cursor: 'grab',
                position: 'absolute',
                top: 0,
                right: 0,
              }}
            >
              <Movable />
            </Flex>
            <Link to={route.getURL()} style={{ width: '100%', height: '100%' }}>
              <Flex height='100%' width='100%' dir='column' mainAxis='center' crossAxis='center' gap='l'>
                {route.renderIcon && React.createElement(route.renderIcon)}
                {route.getName()}
              </Flex>
            </Link>
          </Flex>
        )
      })
      .filter(Boolean)
  }, [obj])

  useEffect(() => emitter.on('navItemOrderChanged', () => update({})), [])

  const routeList = useMemo(() => Object.entries(routes).filter((route) => route[1].navigatable), [obj])

  const ordList = useMemo(
    () => (
      <OrderedList
        className='list'
        onPlusClick={(): void => setModalOpen(true)}
        key={navRouteList?.length}
        items={navRoutes as React.ReactNode[]}
        onChange={(currentIndex, moveToIndex): void => {
          const lsOrder = getJSON<string[]>('mainListOrder')
          if (!lsOrder) return
          const newOrder = move(lsOrder, currentIndex, moveToIndex)
          emitter.emit('navItemOrderChanged', newOrder)
          localStorage.setItem('mainListOrder', JSON.stringify(newOrder))
        }}
      />
    ),
    [navRouteList?.length]
  )

  return (
    <Flex gap='xxxl' as='main' dir='column' mainAxis='center' className='page-Main pt-5rem flex flex-col'>
      <FormModal
        deps={[obj]}
        opened={isModalOpen}
        onCloseClick={(): void => setModalOpen(false)}
        onDismiss={(): void => setModalOpen(false)}
      >
        <Registry
          getId={(route): string => route[1].path}
          list={routeList}
          renderItemContent={(props: { item: [string, Route] }): JSX.Element => (
            <Item
              {...props}
              navRouteList={navRouteList}
              onChange={(): void => {
                // TODO валидатор
                const lsOrder = getJSON<string[]>('mainListOrder') || []
                const newOrder = toggle(props.item[0], lsOrder)
                emitter.emit('navItemOrderChanged', newOrder)
                localStorage.setItem('mainListOrder', JSON.stringify(newOrder))
              }}
            />
          )}
        />
      </FormModal>

      <Flex width='100%' mainAxis='center' crossAxis='center' dir='column' gap='xxl'>
        {ordList}
      </Flex>
    </Flex>
  )
}

// Primate

interface ItemProps {
  item: [string, Route]
  navRouteList: string[]
  onChange: (value: boolean) => void
}

function Item(props: ItemProps): JSX.Element {
  return (
    <Flex width='100%' mainAxis='space-between' crossAxis='center'>
      <Flex gap='m' alignItems='center'>
        {createElement(props.item[1].renderIcon as () => JSX.Element)}
        {props.item[1].getName()}
      </Flex>
      <Checkbox
        checked={props.navRouteList.includes(props.item[0])}
        placeholder='Активный'
        onChange={(e): void => props.onChange(e.currentTarget.checked)}
      />
    </Flex>
  )
}
