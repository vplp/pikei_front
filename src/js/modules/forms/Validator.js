import JustValidate from 'just-validate'
import Emittery from 'emittery'

export default class Validator extends Emittery {
  /**
   * В объекте описаны правила валидации для каждого значения data-аттрибута 'validate'
   * Объект можно дополнять при необходимости
   */
  static _validateRules = {
    field: [
      {
        rule: 'required',
        errorMessage: 'Заполните это поле',
      },
    ],
    email: [
      {
        rule: 'email',
        errorMessage: 'E-mail некорректный',
      },
    ],
    required: [
      {
        rule: 'required',
        errorMessage: 'Заполните это поле',
      },
    ],
    file: [
      {
        rule: 'minFilesCount',
        value: 1,
        errorMessage: 'Загрузите файл',
      },
    ],
    //Значения minLength и maxLength указаны с учётом маски
    tel: [
      {
        rule: 'minLength',
        value: 11,
        errorMessage: 'Номер телефона не может быть короче 11 цифр',
      },
      {
        rule: 'maxLength',
        value: 12,
        errorMessage: 'Номер телефона не может быть длиннее 12 цифр',
      },
    ],
  }

  /**
   * подсказка в Validator.md
   * @param formElement {HTMLElement} - элемент формы
   */
  constructor(formElement) {
    super()
    this.form = formElement
    this.validator = new JustValidate(this.form, {
      errorFieldCssClass: 'is-invalid',
      errorFieldStyle: '',
      errorLabelCssClass: 'error-label',
      errorLabelStyle: '',
      successFieldCssClass: 'is-valid',
      focusInvalidField: true,
    })

    formElement.querySelectorAll('[data-validate]').forEach((field) => {
      const selector = `#${field.id}`
      const ruleName = field.dataset.validate

      if (ruleName === 'group') {
        this.validator.addRequiredGroup(selector)
      } else if (ruleName) {
        let validateRules = Validator._validateRules[ruleName]

        if (field.required) {
          validateRules = [
            ...Validator._validateRules.required,
            ...validateRules,
          ]
        }
        this.validator.addField(selector, validateRules)
      }
    })

    this.validator.onSuccess(() => this.emit('validated'))

    this.validator.onFail(() => {})
  }
}
