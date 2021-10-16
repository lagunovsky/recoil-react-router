import { Action, History, Location } from 'history'
import React, { useLayoutEffect } from 'react'
import { Router } from 'react-router'
import { atom, RecoilState, useRecoilState, useRecoilValue } from 'recoil'


export type RouterState = { action: Action, location: Location }

let navigator: History
let timeTravelling = false

export let routerState: RecoilState<RouterState>

export function bindHistory(bindHistory: History, atomKey: string = 'router') {
  navigator = bindHistory
  routerState = atom({ key: atomKey, default: { action: navigator.action, location: navigator.location } })
}

export function createHistory(creator: () => History, atomKey: string = 'router') {
  navigator = creator()
  routerState = atom({ key: atomKey, default: { action: navigator.action, location: navigator.location } })
  return navigator
}

function checkHistory() {
  if (navigator === undefined) {
    throw new Error('You should call bindHistory()')
  }
}

export function useTimeTraveling() {
  checkHistory()

  const { action, location } = useRecoilValue(routerState)
  if (
    action === 'PUSH' &&
    (
      navigator.location.pathname !== location.pathname ||
      navigator.location.search !== location.search ||
      navigator.location.hash !== location.hash ||
      navigator.location.state !== location.state
    )
  ) {
    timeTravelling = true
    navigator.push(location)
  } else {
    timeTravelling = false
  }
}

export function RecoilReactRouter(props: { children: React.ReactNode }) {
  checkHistory()

  const [ { action, location }, setReactRouterState ] = useRecoilState(routerState)
  useLayoutEffect(() => navigator.listen((nextState) => timeTravelling === false && setReactRouterState(nextState)), [])

  return (
    <Router
      action={action}
      location={location}
      navigator={navigator}
      children={props.children}
    />
  )
}
