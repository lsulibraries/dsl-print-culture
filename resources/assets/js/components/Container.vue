<template>
    <div id="container" v-bind:class="contrastString()">
      <vueHeader></vueHeader>
      <vueContent></vueContent>
  </div>
</template>

<script>
    import vueHeader from './vueHeader'
    import vueContent from './vueContent'
    export default {
        components: { vueHeader, vueContent },
        created() {
            Event.$on('toggleContrast', () => {
                this.contrast = this.$root.state.contrast;
            })
        },
        methods: {
            contrastString: function () {
                return this.$root.state.contrast + 'Contrast'
            }
        }
    }
</script>
