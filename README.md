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

## Example

```typescript jsx
import { bindHistory, RecoilReactRouter, useTimeTraveling } from '@lagunovsky/recoil-react-router'
import { createBrowserHistory } from 'history'
import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Routes } from 'react-router'
import { RecoilRoot } from 'recoil'


const history = createBrowserHistory()
bindHistory(history)

function App() {
  useTimeTraveling() // if you want to use time travel

  return (
    <RecoilReactRouter>
      <Routes>
        <Route path={'*'}/>
      </Routes>
    </RecoilReactRouter>
  )
}

ReactDOM.render(<RecoilRoot children={<App/>}/>, document.getElementById('app'))
```
