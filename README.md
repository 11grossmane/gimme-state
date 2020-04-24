# gimme-state for Redux
- super simple colored redux logger for native and web

![gimme-state-screenshot](https://github.com/11grossmane/gimme-state/blob/master/gimme.png?raw=true)

## Install
`npm i gimme-state`

## Usage
```javascript
import { applyMiddleware, createStore } from 'redux';
import {gimme} from 'gimme-state'

const store = createStore(
  reducer,
  applyMiddleware(gimme)
)
```

## Options

- if you use customGimme, make sure to specify before, action, and after
- `before`: refers to the previous state
- `action`: refers to the action you are dispatching
- `after`: refers to the state post dispatch


```javascript
import { applyMiddleware, createStore } from 'redux';
import {customGimme} from 'gimme-state'

const store = createStore(
  reducer,
  applyMiddleware(customGimme({before:true,action:false,after:true}))
)
```

## License
MIT