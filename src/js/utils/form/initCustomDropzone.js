import CustomDropzone from '../../modules/forms/CustomDropzone'

// language=HTML
const previewTemplate = `
<div class="ui-file">
  <div class="ui-file__title">
      <svg>
          <use href="/i/sprite.svg#document"></use>
      </svg>
      <p data-dz-name></p>

  </div>

  <div class="ui-file__size" data-dz-size>
  </div>

  <button type="button" class="ui-file__delete" data-dz-remove>
    <svg>
      <use href="/i/sprite.svg#close"></use>
    </svg>
  </button>
</div>
`

const basicOptions = {
  url: '/api/file',
  maxFiles: 5,
  maxFilesize: 100,
  thumbnailWidth: null,
  thumbnailHeight: null,
  previewTemplate,
  autoProcessQueue: false,
  clickable: '.js-dropzone-clickable',
}

/**
 * Абстракция, позволяющая удобно передавать опции в класс CustomDropzone
 * @param dropzone {HTMLElement}
 * @param customOptions {Object}
 * @returns {CustomDropzone, undefined}
 */
export default function initCustomDropzone(dropzone, customOptions = {}) {
  if (!dropzone) return undefined

  return new CustomDropzone(dropzone, {
    ...basicOptions,
    ...customOptions,
  })
}
