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

- `before`: refers to the previous state
- `action`: refers to the action you are dispatching
- `after`: refers to the state post dispatch
- `fullColors`: set to false if you are using remote debugger and want color, keep true if you are looking at the logs in your terminal
- `fullAction`: set to false if you only want to see the action type


```javascript
import { applyMiddleware, createStore } from 'redux';
import {customGimme} from 'gimme-state'

const store = createStore(
  reducer,
  applyMiddleware(customGimme({action:false,fullColors:false}))
)
```

## License
MIT