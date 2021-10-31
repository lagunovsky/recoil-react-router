Recoil React Router
======================

A Recoil binding for React Router requires React 16.8, Recoil 4.0, React Router 6.0 or later

## Installation

```
$ npm install --save @lagunovsky/recoil-react-router
```


## Usage

1) install and import `@lagunovsky/recoil-react-router`
2) create `router` instance using `makeRouter()`
3) use `<RecoilReactRouter router={router} />` instead of `<Router/>`

### Navigation

To change the current location, you'll want to use one of the following:

- `router.history.push` - Pushes a new location onto the history stack
- `router.history.replace` - Replaces the current location with another
- `router.history.go` - Changes the current index in the history stack by a given delta
- `router.history.back` - Navigates one entry back in the history stack
- `router.history.forward` - Navigates one entry forward in the history stack


## API

#### makeRouter

```ts
type Router = {
  state: RecoilValue<{ action: Action, location: Location }>
  history: History
}

function makeRouter(getHistory: () => History = createBrowserHistory, namespace: string = 'router'): Router {}
```

Creates a routing object that contains the current state of the location and history for manipulating the location

---

#### RecoilReactRouter

```ts
type RouterProps = {
  router: Router
  children?: React.ReactNode
  basename?: string
  static?: boolean
}

function RecoilReactRouter(props: RouterProps): React.ReactNode {}
```

Component that synchronizes `recoil`, `history` and `react-router`

---

#### useTimeTraveling()

A hook that allows to use [time travel](https://recoiljs.org/docs/guides/dev-tools#time-travel)


## Example

```typescript jsx
import { makeRouter, RecoilReactRouter, useTimeTraveling } from '@lagunovsky/recoil-react-router'
import { createBrowserHistory } from 'history'
import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Routes } from 'react-router'
import { RecoilRoot, useRecoilValue } from 'recoil'


const router = makeRouter()

router.history.push('/hello')

function Page() {
  const { location } = useRecoilValue(router.state)
  return (
    <div>{location.pathname}</div>
  )
}

function App() {
  useTimeTraveling() // if you want to use time travel

  return (
    <RecoilReactRouter router={router}>
      <Routes>
        <Route path={'*'} element={<Page/>}/>
      </Routes>
    </RecoilReactRouter>
  )
}

ReactDOM.render(<RecoilRoot children={<App/>}/>, document.getElementById('app'))
```
