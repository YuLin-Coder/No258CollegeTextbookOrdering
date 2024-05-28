import sdk from './sdk.js';
import expand from './jquery_expand.js';
import Swiper from './swiper-bundle.esm.browser.min.js';
import component from './component.js';
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
import VueQuillEditor from 'vue-quill-editor'

import {
	BootstrapVue,
	IconsPlugin
} from 'bootstrap-vue'


/**
 * 检测图片是否存在
 * @param url
 */
let imageIsExist = function (url) {
	return new Promise((resolve) => {
		var img = new Image();
		img.onload = function () {
			if (this.complete == true) {
				resolve(true);
				img = null;
			}
		}
		img.onerror = function () {
			resolve(false);
			img = null;
		}
		img.src = url;
	})
}

export default {
	install(Vue, options) {
		/**
		 * 指令名称为：default-img
		 * @param {Object} el
		 * @param {Object} binding
		 */
		Vue.directive('default-img', async function (el, binding) {
			let imgURL = binding.value; //获取图片地址
			if (imgURL) {
				let exist = await imageIsExist(imgURL);
				if (exist) {
					el.onerror = function () {
						el.setAttribute('src', imgURL);
					}
				}
			}
		});

		Vue.use(BootstrapVue);
		Vue.use(IconsPlugin);
		Vue.prototype.$Swiper = Swiper
		Vue.prototype.$axios = axios
		Vue.use(component, options);
		Vue.use(VueQuillEditor, options)

	}
}

