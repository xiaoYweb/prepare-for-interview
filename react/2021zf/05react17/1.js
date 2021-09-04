
const NoFlags = 0b000 // 0
const HasEffect = 0b001 // 1
const Layout = 0b010  // 2
const Passive = 0b100 // 4

const layoutTag = HasEffect | Layout // 0b011
if (layoutTag & Layout !== NoFlags) { // 0b010
  console.log('useLayoutEffect')
}

const tag = HasEffect | Passive // 0b011
if (tag & Passive !== NoFlags) { // 0b010
  console.log('useEffect')
} 