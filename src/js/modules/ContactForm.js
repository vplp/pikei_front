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
    const formData = new FormData(self.form)
    const { successMessage, errorMessage } = self.form.dataset

    const fetchParams = {
      method: self.form.method,
      body: formData,
    }

    if (self.form.querySelector('[name="recaptcha_response"]')) {
      await grecaptcha.ready(async () => {
        const token = await grecaptcha.execute(self.grecaptcha_key, {
          action: 'submit',
        })
        fetchParams.body.set('recaptcha_response', token)
        const res = await fetch(url, fetchParams)

        if (res.ok) window.appPopup.open(successMessage)
        else window.appPopup.open(errorMessage)
      })

      return
    }

    const res = await fetch(url, fetchParams)

    if (res.ok) window.appPopup.open(successMessage)
    else window.appPopup.open(errorMessage)
  }
}

export default ContactForm
