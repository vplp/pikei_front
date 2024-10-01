import initCustomDropzone from '@js/utils/form/initCustomDropzone'
import Validator from '@js/modules/forms/Validator'
import { APP } from '@js/app'

export default class Form {
  /**
   * Базовый класс формы, инициализирует валидатор
   * ----------------------------------------------------
   * При отправке формы вызывает методы:
   * onSubmit - каждый раз перед отправкой запроса на сервер
   * onSuccessSubmit - при получении успешного ответа
   * onFailSubmit - при получении ответа с ошибкой
   * ----------------------------------------------------
   * От класса можно наследоваться и дополнять эти методы
   *
   * @param form {HTMLElement}
   */
  constructor(form) {
    this.form = form
    this.submitBtn = form.querySelector('.js-submit')
    this.dropzones = []
    this.grecaptcha_key = '6LcgpFMqAAAAANo2Pic9fzU_P-gS6No9LuHThiMG'

    this.form.querySelectorAll('.js-drop-file').forEach((dropzone) => {
      this.dropzones.push(initCustomDropzone(dropzone))
    })

    this.validatedHandler = () => {
      this.loader?.classList.add('_visible')

      this.form.submit()
      // this.submit()
    }

    this.createValidator()
  }

  createValidator() {
    this.validator = new Validator(this.form)
    this.validator.on('validated', this.validatedHandler)
    this.validator.validator.onValidate(({ fields }) => {
      for (const key in fields) {
        const input = fields[key]?.elem
        const notValidInput = input?.classList?.contains('is-invalid')

        if (notValidInput) {
          input
            .closest('.ui-text-field, .js-drop-file')
            .classList.add('is-invalid')
        } else {
          input
            .closest('.ui-text-field, .js-drop-file')
            .classList.remove('is-invalid')
        }
      }
    })

    this.revalidateDropzoneOnTransfer()
  }

  /**
   * Валидирует дропзону при загрузке/удалении файла
   * @description - Файл в инпут записывается не нативно, а через DataTransfer внутри CustomDropzone,
   * из-за чего валидатор не знает когда происходит загрузка файла
   */
  revalidateDropzoneOnTransfer() {
    this.dropzones.forEach((dropzone) => {
      dropzone.on('dropzone:update', () => {
        const field = `#${dropzone.input.id}`

        this.validator.validator.revalidateField(field)
      })
    })
  }

  submit() {
    this.onSubmit()
    this.submitBtn.classList.remove('_success')
    this.submitBtn.classList.remove('_error')
    this.submitBtn.classList.add('_load')

    const enctype = this.form.enctype || ''
    const method = this.form.method
    const isGet = method.toLowerCase() === 'get'
    const isPost = method.toLowerCase() === 'post'
    let action = this.form.action

    // Когда метод GET тогда параметры записываются в query
    const formData = new FormData(this.form)

    if (isGet) {
      action += `?${new URLSearchParams(formData)}`
    }

    fetch(action, {
      method,
      // body может быть только у POST запроса
      ...(isPost && {
        body: enctype.includes('multipart')
          ? formData
          : new URLSearchParams(formData),
      }),
    })
      .then((serverResponse) => serverResponse.json())
      .then(
        /**
         * @param { TypeServerResponse } serverResponse
         */
        (serverResponse) => {
          this.submitBtn.classList.remove('_load')

          if (serverResponse.status === 'success') {
            const data = serverResponse.data

            if (data?.redirect) {
              window.location.href = serverResponse.data.redirect
            }

            APP.plugins.toast.success(
              data.message || 'Форма успешно отправлена',
            )
            this.submitBtn.classList.add('_success')

            this.resetForm()
            this.onSuccessSubmit()
          }

          if (serverResponse.status === 'error') {
            let message = 'Не удалось отправить форму, попробуйте еще раз'
            if (serverResponse.errors && serverResponse.errors[0]) {
              message = serverResponse.errors[0].message
            }

            APP.plugins.toast.error(message)
            this.submitBtn.classList.add('_error')

            this.onFailSubmit()
          }
        },
      )
      .catch(() => {
        this.submitBtn.classList.add('_error')
        APP.plugins.toast.error('Не удалось отправить форму')
      })
  }

  onSubmit() {}

  onSuccessSubmit() {}

  onFailSubmit() {
    this.validator.validator.refresh()
  }

  resetForm() {
    this.dropzones.forEach((dropzone) => {
      dropzone.removeAllFiles()
    })

    this.form.reset()

    setTimeout(() => this.validator.validator.refresh(), 0)
  }
}
