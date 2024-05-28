import $ from 'jquery';
import sdk from './sdk.js';
import jquery_expand from './jquery_expand';
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import component from './component.js'

/*  引入element 样式 */
import 'element-ui/lib/theme-chalk/index.css'


export default {
	install(Vue, options) {
		Vue.use(Element, {
			locale
		});

		Vue.use(component, options);
	}
}
