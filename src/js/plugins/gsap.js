import { gsap } from 'gsap'
import { CSSRulePlugin } from 'gsap/CSSRulePlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default (ctx) => {
  gsap.registerPlugin(CSSRulePlugin)
  gsap.registerPlugin(ScrollTrigger)
}
