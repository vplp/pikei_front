<template>
  <p>{{ message }}, {{ prop1 }}, {{ prop2 }}, {{ prop3 }}</p>
</template>
<script>
export default {
  name: 'WidgetVue',
  props: {
    prop1: {
      type: Number,
      required: true,
    },
    prop2: {
      type: String,
      required: true,
    },
    prop3: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      message: 'Hello Vue!',
    }
  },
}
</script>
<style lang="scss" scoped></style>
