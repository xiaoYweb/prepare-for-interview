// 3 - 7 
import React from './react'
import ReactDom from './react-dom'

const style = {
  border: '1px solid #eee',
  margin: '5px'
}
const el = React.createElement('div', { id: 'a1' }, 'a1',
  React.createElement('div', { id: 'b1', }, 'b1',
    React.createElement('div', { id: 'c1' }, 'c1'),
    React.createElement('div', { id: 'c2' }, 'c2'),
  ),
  React.createElement('div', { id: 'b2' }, 'b2'),
)

ReactDom.render(el, document.getElementById('root'))