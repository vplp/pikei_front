import Form from './forms/Form'

class ContactForm extends Form {
  constructor(element) {
    super(element)

    this.validator.off('validated', this.validatedHandler)
    this.validator.on('validated', () => this.sendForm())
  }

  async sendForm() {
    let self = this
    const url = self.form.action
    const ymFormType = self.form.dataset.form
    const formData = new FormData(self.form)
    const { successMessage, errorMessage } = self.form.dataset

    const fetchParams = {
      method: self.form.method,
      body: formData,
    }

    //smartCaptcha
    const yaCaptchaEl = this.form.querySelector('#ya-captcha')
    if (yaCaptchaEl && window.smartCaptcha) {
      const token = await new Promise((resolve) => {
        window.smartCaptcha.render('ya-captcha', {
          sitekey: this.smartсaptcha_key,
          invisible: true,
          callback: resolve,
          hideShield: true,
        })

        window.smartCaptcha.execute()
      })

      formData.set('smart-token', token)
    }

    //recaptcha
    if (this.form.querySelector('[name="recaptcha_response"]')) {
      await grecaptcha.ready(async () => {
        const token = await grecaptcha.execute(this.grecaptcha_key, {
          action: 'submit',
        })

        formData.set('recaptcha_response', token)

        const res = await fetch(url, fetchParams)
        if (res.ok) window.appPopup.open(successMessage)
        else window.appPopup.open(errorMessage)
      })
      return
    }

    const res = await fetch(url, fetchParams)

    if (res.ok) {
      window.appPopup.open(successMessage)

      switch (ymFormType) {
        case 'call_us':
          ym(50571025, 'reachGoal', 'contact_us_form')
          break

        default:
          break
      }
    } else {
      window.appPopup.open(errorMessage)
    }
  }
}

export default ContactForm
