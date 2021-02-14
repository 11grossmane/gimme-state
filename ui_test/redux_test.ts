import { createStore, applyMiddleware } from 'redux'
import { gimme, customGimme, gimmeDiff } from '../src/index'

interface I {
    name: string
    age: number
}

const initialState: I = {
    name: 'Joe',
    age: 21
}

const reducer = (state = initialState, action: any): I => {
    switch (action.type) {
        case 'incr':
            return { ...state, age: state.age + 1 }
        case 'change-name':
            return { ...state, name: action.name }
        default:
            return state
    }
}

const store = createStore(reducer, applyMiddleware(gimme))

const storeTwo = createStore(
    reducer,
    applyMiddleware(customGimme({ fullColors: true }))
)

const storeThree = createStore(reducer, applyMiddleware(gimmeDiff))

store.dispatch({ type: 'incr' })
store.dispatch({ type: 'change-name', name: 'Johanna' })

storeTwo.dispatch({ type: 'incr' })
storeTwo.dispatch({ type: 'change-name', name: 'Johanna' })

storeThree.dispatch({ type: 'incr' })
storeThree.dispatch({ type: 'change-name', name: 'Johanna' })

// console.groupCollapsed('collapsed')
// console.log(
//     JSON.parse(`{
//     "glossary": {
//         "title": "example glossary",
// 		"GlossDiv": {
//             "title": "S",
// 			"GlossList": {
//                 "GlossEntry": {
//                     "ID": "SGML",
// 					"SortAs": "SGML",
// 					"GlossTerm": "Standard Generalized Markup Language",
// 					"Acronym": "SGML",
// 					"Abbrev": "ISO 8879:1986",
// 					"GlossDef": {
//                         "para": "A meta-markup language, used to create markup languages such as DocBook.",
// 						"GlossSeeAlso": ["GML", "XML"]
//                     },
// 					"GlossSee": "markup"
//                 }
//             }
//         }
//     }
// }`)
// )
// console.groupEnd()
