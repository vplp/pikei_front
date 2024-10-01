import vueCustomElement from 'vue-custom-element'
import Vue from 'vue'
import WidgetVue from './components/widget-vue.vue'

Vue.use(vueCustomElement)

Vue.customElement('widget-vue', WidgetVue)
// in HTML
// <widget-vue prop1="1" prop2="string" prop3="true"></widget-vue>
