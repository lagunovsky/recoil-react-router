import { Action, createBrowserHistory, History, Location } from 'history'
import React from 'react'
import { Router as ReactRouter } from 'react-router'
import { atom, RecoilValue, selector, useRecoilValue } from 'recoil'


export type Router = {
  state: RecoilValue<{ action: Action, location: Location }>
  history: History
}

let timeTravelling = false

export function makeRouter(getHistory: () => History = createBrowserHistory, namespace: string = 'router'): Router {
  const history = getHistory()
  const state = atom({
    key: namespace + '/core',
    default: selector({
      key: namespace + '/default',
      get: () => ({ action: history.action, location: history.location }),
    }),
    effects_UNSTABLE: [
      ({ setSelf }) => history.listen(nextState => {
        if(timeTravelling === false){
          setSelf(nextState)
        }
      }),
    ],
  })
  return { state, history }
}

function compareLocation(firstLocation: Location, secondLocation: Location) {
  return (
    firstLocation.pathname !== secondLocation.pathname ||
    firstLocation.search !== secondLocation.search ||
    firstLocation.hash !== secondLocation.hash ||
    firstLocation.state !== secondLocation.state
  )
}

export function useTimeTraveling(router: Router) {
  const { action, location } = useRecoilValue(router.state)
  if (action === 'PUSH' && compareLocation(router.history.location, location)) {
    timeTravelling = true
    router.history.push(location)
  } else {
    timeTravelling = false
  }
}

export type RouterProps = {
  router: Router
  children?: React.ReactNode
  basename?: string
  static?: boolean
}

export function RecoilReactRouter(props: RouterProps) {
  const { action, location } = useRecoilValue(props.router.state)
  return (
    <ReactRouter
      action={action}
      location={location}
      basename={props.basename}
      children={props.children}
      navigator={props.router.history}
      static={props.static}
    />
  )
}
