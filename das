[1mdiff --git a/src/js/main.js b/src/js/main.js[m
[1mindex 6ed14c3..2aeb013 100644[m
[1m--- a/src/js/main.js[m
[1m+++ b/src/js/main.js[m
[36m@@ -10,6 +10,27 @@[m [mimport ScrollTo from './modules/ScrollTo'[m
 [m
 window.APP = APP[m
 [m
[32m+[m[32mdocument.addEventListener('click', function (event) {[m
[32m+[m[32m  const target = event.target.closest('[data-click]')[m
[32m+[m
[32m+[m[32m  if (!target) return[m
[32m+[m
[32m+[m[32m  const ymClickType = target.dataset.click[m
[32m+[m[32m  switch (ymClickType) {[m
[32m+[m[32m    case 'phone':[m
[32m+[m[32m      ym(50571025, 'reachGoal', 'call_the_number')[m
[32m+[m[32m      break[m
[32m+[m
[32m+[m[32m    case 'optom':[m
[32m+[m[32m      ym(50571025, 'reachGoal', 'opt_click')[m
[32m+[m[32m      break[m
[32m+[m
[32m+[m[32m    default:[m
[32m+[m[32m      console.warn('Неизвестный data-click:', ymClickType)[m
[32m+[m[32m      break[m
[32m+[m[32m  }[m
[32m+[m[32m})[m
[32m+[m
 APP.on('ready', () => {[m
   APP.isShown = true[m
 [m
[1mdiff --git a/src/js/modules/ContactForm.js b/src/js/modules/ContactForm.js[m
[1mindex f199429..0b26702 100644[m
[1m--- a/src/js/modules/ContactForm.js[m
[1m+++ b/src/js/modules/ContactForm.js[m
[36m@@ -11,6 +11,7 @@[m [mclass ContactForm extends Form {[m
   async sendForm() {[m
     let self = this[m
     const url = self.form.action[m
[32m+[m[32m    const ymFormType = self.form.dataset.form[m
     const formData = new FormData(self.form)[m
     const { successMessage, errorMessage } = self.form.dataset[m
 [m
[36m@@ -19,25 +20,55 @@[m [mclass ContactForm extends Form {[m
       body: formData,[m
     }[m
 [m
[31m-    if (self.form.querySelector('[name="recaptcha_response"]')) {[m
[32m+[m[32m    //smartCaptcha[m
[32m+[m[32m    const yaCaptchaEl = this.form.querySelector('#ya-captcha')[m
[32m+[m[32m    if (yaCaptchaEl && window.smartCaptcha) {[m
[32m+[m[32m      const token = await new Promise((resolve) => {[m
[32m+[m[32m        window.smartCaptcha.render('ya-captcha', {[m
[32m+[m[32m          sitekey: this.smartсaptcha_key,[m
[32m+[m[32m          invisible: true,[m
[32m+[m[32m          callback: resolve,[m
[32m+[m[32m          hideShield: true,[m
[32m+[m[32m        })[m
[32m+[m
[32m+[m[32m        window.smartCaptcha.execute()[m
[32m+[m[32m      })[m
[32m+[m
[32m+[m[32m      formData.set('smart-token', token)[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    //recaptcha[m
[32m+[m[32m    if (this.form.querySelector('[name="recaptcha_response"]')) {[m
       await grecaptcha.ready(async () => {[m
[31m-        const token = await grecaptcha.execute(self.grecaptcha_key, {[m
[32m+[m[32m        const token = await grecaptcha.execute(this.grecaptcha_key, {[m
           action: 'submit',[m
         })[m
[31m-        fetchParams.body.set('recaptcha_response', token)[m
[31m-        const res = await fetch(url, fetchParams)[m
 [m
[32m+[m[32m        formData.set('recaptcha_response', token)[m
[32m+[m
[32m+[m[32m        const res = await fetch(url, fetchParams)[m
         if (res.ok) window.appPopup.open(successMessage)[m
         else window.appPopup.open(errorMessage)[m
       })[m
[31m-[m
       return[m
     }[m
 [m
     const res = await fetch(url, fetchParams)[m
 [m
[31m-    if (res.ok) window.appPopup.open(successMessage)[m
[31m-    else window.appPopup.open(errorMessage)[m
[32m+[m[32m    if (res.ok) {[m
[32m+[m[32m      window.appPopup.open(successMessage)[m
[32m+[m
[32m+[m[32m      switch (ymFormType) {[m
[32m+[m[32m        case 'call_us':[m
[32m+[m[32m          ym(50571025, 'reachGoal', 'contact_us_form')[m
[32m+[m[32m          break[m
[32m+[m
[32m+[m[32m        default:[m
[32m+[m[32m          break[m
[32m+[m[32m      }[m
[32m+[m[32m    } else {[m
[32m+[m[32m      window.appPopup.open(errorMessage)[m
[32m+[m[32m    }[m
   }[m
 }[m
 [m
[1mdiff --git a/src/js/modules/forms/Form.js b/src/js/modules/forms/Form.js[m
[1mindex b180607..8239e98 100644[m
[1m--- a/src/js/modules/forms/Form.js[m
[1m+++ b/src/js/modules/forms/Form.js[m
[36m@@ -20,6 +20,8 @@[m [mexport default class Form {[m
     this.submitBtn = form.querySelector('.js-submit')[m
     this.dropzones = [][m
     this.grecaptcha_key = '6LcgpFMqAAAAANo2Pic9fzU_P-gS6No9LuHThiMG'[m
[32m+[m[32m    this.smartсaptcha_key =[m
[32m+[m[32m      'ysc1_ApP0BnY83Ba4B5fkGpS2bvkhCSgvViQUqSQIn6Mud95d530b'[m
 [m
     this.form.querySelectorAll('.js-drop-file').forEach((dropzone) => {[m
       this.dropzones.push(initCustomDropzone(dropzone))[m
[36m@@ -27,9 +29,7 @@[m [mexport default class Form {[m
 [m
     this.validatedHandler = () => {[m
       this.loader?.classList.add('_visible')[m
[31m-[m
       this.form.submit()[m
[31m-      // this.submit()[m
     }[m
 [m
     this.createValidator()[m
[1mdiff --git a/src/js/modules/forms/Validator.js b/src/js/modules/forms/Validator.js[m
[1mindex bb94acc..a90ff40 100644[m
[1m--- a/src/js/modules/forms/Validator.js[m
[1m+++ b/src/js/modules/forms/Validator.js[m
[36m@@ -25,6 +25,12 @@[m [mexport default class Validator extends Emittery {[m
         errorMessage: 'Заполните это поле',[m
       },[m
     ],[m
[32m+[m[32m    checkbox: [[m
[32m+[m[32m      {[m
[32m+[m[32m        rule: 'required',[m
[32m+[m[32m        errorMessage: 'Вы должны согласиться с условиями',[m
[32m+[m[32m      },[m
[32m+[m[32m    ],[m
     file: [[m
       {[m
         rule: 'minFilesCount',[m
[1mdiff --git a/src/js/plugins/toasts.js b/src/js/plugins/toasts.js[m
[1mindex a1e5202..e1f5515 100644[m
[1m--- a/src/js/plugins/toasts.js[m
[1m+++ b/src/js/plugins/toasts.js[m
[36m@@ -22,6 +22,8 @@[m [mclass Toasts {[m
     node = document.getElementById('cookie-popup'),[m
     onClose = () => {},[m
   }) {[m
[32m+[m[32m    if (!node) return[m
[32m+[m
     const toast = Toastify({[m
       node,[m
       text: 'Мы используем куки на нашем сайте',[m
[1mdiff --git a/src/scss/modules/_contact-form.scss b/src/scss/modules/_contact-form.scss[m
[1mindex eed6e7a..b452f1a 100644[m
[1m--- a/src/scss/modules/_contact-form.scss[m
[1m+++ b/src/scss/modules/_contact-form.scss[m
[36m@@ -86,7 +86,14 @@[m
       }[m
     }[m
 [m
[31m-    max-width: 31.7rem;[m
[32m+[m[32m    &._grid-column-1-3 {[m
[32m+[m[32m      grid-column: 1 / 3 !important;[m
[32m+[m
[32m+[m[32m      @include --tablet {[m
[32m+[m[32m        grid-column: auto !important;[m
[32m+[m[32m      }[m
[32m+[m[32m    }[m
[32m+[m
     color: var(--color-grey-1);[m
 [m
     @include --tablet {[m
[1mdiff --git a/src/scss/modules/_social.scss b/src/scss/modules/_social.scss[m
[1mindex 2ec179a..9a61154 100644[m
[1m--- a/src/scss/modules/_social.scss[m
[1m+++ b/src/scss/modules/_social.scss[m
[36m@@ -2,7 +2,7 @@[m
   display: flex;[m
   gap: 1.5rem;[m
 [m
[31m-  svg {[m
[32m+[m[32m  svg, img {[m
     @include box(4rem);[m
   }[m
 [m
[1mdiff --git a/src/scss/modules/index.scss b/src/scss/modules/index.scss[m
[1mindex e4c5ce7..0de4c90 100644[m
[1m--- a/src/scss/modules/index.scss[m
[1m+++ b/src/scss/modules/index.scss[m
[36m@@ -4,6 +4,7 @@[m
 [m
 // UI[m
 [m
[32m+[m[32m@import 'ui/privacy-checkbox';[m
 @import 'ui/btn';[m
 @import 'ui/btn-icon';[m
 @import 'ui/text-field';[m
[36m@@ -63,6 +64,7 @@[m
 @import 'cookie-popup';[m
 @import 'tg-bottom';[m
 @import 'tg-widget';[m
[32m+[m[32m@import 'faq';[m
 [m
 // Cards[m
 [m
[36m@@ -78,3 +80,8 @@[m
 [m
 @import 'text-content';[m
 @import 'text-content-slider';[m
[32m+[m
[32m+[m
[32m+[m[32m// Cookie Yes[m
[32m+[m
[32m+[m[32m@import 'cookie-yes';[m
[1mdiff --git a/src/scss/modules/ui/_text-field.scss b/src/scss/modules/ui/_text-field.scss[m
[1mindex ef64711..3ebe035 100644[m
[1m--- a/src/scss/modules/ui/_text-field.scss[m
[1m+++ b/src/scss/modules/ui/_text-field.scss