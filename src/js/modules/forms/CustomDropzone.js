import { Dropzone } from 'dropzone'
import { APP } from '@js/app'

export default class CustomDropzone extends Dropzone {
  /**
   * Класс, расширяющий функционал Dropzone
   * (Текущий вариант работает только для загрузки одного файла)
   * @param element {HTMLElement} - dropzone
   * @param options {Object} - dropzone options
   */
  constructor(element, options = {}) {
    super(element, options)

    this.input = element.querySelector('input[type="file"]')
    this.dataTransfer = new DataTransfer()

    this.on('addedfiles', (files) => this.onAddedFiles(files))
    this.on('removedfile', (file) => {
      this.onRemovedFile(file)
    })
  }

  onAddedFiles(files) {
    // this.dataTransfer.items.clear()
    let size = 0
    Array.prototype.forEach.call(files, (file) => {
      size += file.size

      // Проверка размера файла
      if (size > this.options.maxFilesize * 1024 ** 2) {
        this.removeFile(file)
        APP.plugins.toast.error('Допустимый размер файлов превышен')
        return
      }

      // Проверка количества файлов
      if (this.files.length > 5) {
        this.removeFile(this.files[0])
      }

      this.updateFile(file)
    })
  }

  onRemovedFile(file) {
    this.dataTransfer.items.remove(
      Array.prototype.findIndex.call(this.dataTransfer.items, (dtFile) => {
        return dtFile.getAsFile().name === file.name
      }),
    )
  }

  /**
   * трансфер файла в интпут https://stackoverflow.com/questions/1696877/how-to-set-a-value-to-a-file-input-in-html/70485949#70485949
   * @param file {File, undefined}
   */
  updateFile(file = undefined) {
    if (file) {
      this.dataTransfer.items.add(file)
    }

    this.input.files = this.dataTransfer.files
    this.emit('dropzone:update')
  }
}
