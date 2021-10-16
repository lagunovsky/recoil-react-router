Recoil React Router
======================

A Recoil binding for React Router requires React 16.8, Recoil 4.0, React Router 6.0 or later

## Installation

```
$ npm install --save @lagunovsky/recoil-react-router
```

## Usage

1) install and import `@lagunovsky/recoil-react-router`
2) create `history` instance and bind it using `bindHistory(history)`
3) use `<RecoilReactRouter/>` instead of `<Router/>`

### Navigation

To change the current location, you'll want to use one of the following:

- `history.push` - Pushes a new location onto the history stack
- `history.replace` - Replaces the current location with another
- `history.go` - Changes the current index in the history stack by a given delta
- `history.back` - Navigates one entry back in the history stack
- `history.forward` - Navigates one entry forward in the history stack

## API

#### bindHistory(history: History, atomKey?: string)

Bind a `history` instance with a recoil state

#### createHistory(creator: () => History, atomKey?: string): History

Run creator, bind a `history` instance with a recoil state and return it

#### RecoilReactRouter(props: { children: React.ReactNode })

`<RecoilReactRouter>` is a component that synchronizes `recoil`, `history` and `react-router`

#### routerState: RecoilState<{ action: History.Action, location: History.Location }>

An atom that contains current history state

#### useTimeTraveling()

A hook that allows to use [time travel](https://recoiljs.org/docs/guides/dev-tools#time-travel)

## Example

```typescript jsx
import { bindHistory, RecoilReactRouter, routerState, useTimeTraveling } from '@lagunovsky/recoil-react-router'
import { createBrowserHistory } from 'history'
import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Routes } from 'react-router'
import { RecoilRoot, useRecoilValue } from 'recoil'


const history = createHistory(createBrowserHistory)

function Page() {
  const { location } = useRecoilValue(routerState)
  return (
    <div>{location.pathname}</div>
  )
}

function App() {
  useTimeTraveling() // if you want to use time travel

  return (
    <RecoilReactRouter>
      <Routes>
        <Route path={'*'} element={<Page/>}/>
      </Routes>
    </RecoilReactRouter>
  )
}

ReactDOM.render(<RecoilRoot children={<App/>}/>, document.getElementById('app'))
```
