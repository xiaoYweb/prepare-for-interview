console.log('d 加载')
import { foo } from './c.js'; // import 编译时执行 

export function bar() { // export 编译时执行 
  console.log('bar');
  if (Math.random() > 0.5) {
    foo();
  }
}