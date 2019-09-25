import Loadable from 'react-loadable';
import Loading from './pages/loading'
// import loadable from '@loadable/component'
export const pa = Loadable({
	loader: ()=> import('./test/a'),
	loading: Loading
})
export const pb = Loadable({
	loader: ()=> import('./test/b'),
	loading: Loading
})

// export const pa = loadable(()=>import('./test/a'))
// export const pb = loadable(()=>import('./test/b'))