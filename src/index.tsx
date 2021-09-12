import { Action, History, Location } from 'history'
import React, { useLayoutEffect } from 'react'
import { Router } from 'react-router'
import { atom, RecoilState, useRecoilState, useRecoilValue } from 'recoil'


export type RouterState = { action: Action, location: Location }

let history: History
let timeTravelling = false

export let routerState: RecoilState<RouterState>

export function bindHistory(bindHistory: History, atomKey: string = '#router') {
  history = bindHistory
  routerState = atom({
    key: atomKey,
    default: { action: history.action, location: history.location },
  })
}

function checkHistory() {
  if (history === undefined) {
    throw new Error('You should call bindHistory()')
  }
}

export function useTimeTraveling() {
  checkHistory()

  const { action, location } = useRecoilValue(routerState)
  if (
    action === 'PUSH' &&
    (
      history.location.pathname !== location.pathname ||
      history.location.search !== location.search ||
      history.location.hash !== location.hash ||
      history.location.state !== location.state
    )
  ) {
    timeTravelling = true
    history.push(location)
  } else {
    timeTravelling = false
  }
}

export function RecoilReactRouter(props: { children: React.ReactNode }) {
  checkHistory()

  const [ { action, location }, setReactRouterState ] = useRecoilState(routerState)
  useLayoutEffect(() => history.listen((nextState) => timeTravelling === false && setReactRouterState(nextState)), [])

  return (
    <Router
      action={action}
      location={location}
      navigator={history}
      children={props.children}
    />
  )
}
