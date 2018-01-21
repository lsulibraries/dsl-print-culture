<template>
    <div id="container" v-bind:class="contrastString()">
      <vueHeader></vueHeader>
      <vueContent></vueContent>
      <vueFooter></vueFooter>
  </div>
</template>

<script>
    import vueHeader from './vueHeader'
    import vueContent from './vueContent'
    import vueFooter from './vueFooter'
    export default {
        components: { vueHeader, vueContent, vueFooter },
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
