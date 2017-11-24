### jsx-analyzer

Takes `jsx` code string as input and gives the prop values as javascript object as the output.

How to use - 


```
$ npm install git+https://git@github.com/mukeshsoni/jsx-analyzer.git -S

let {getPropsFromJsxCode} = require('jsx-analyzer')
// OR
import {getPropsFromJsxCode} from 'jsx-analyzer'

let jsxCode = '<div name="Betty" age={21}>'
let props = getPropsFromJsxCode(jsxCode)
// should get {name: "Betty", age: 21}
```
