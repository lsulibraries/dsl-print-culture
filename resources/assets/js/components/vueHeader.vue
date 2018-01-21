
<template>
        <div class="header">
          <headerTitle></headerTitle>
      <headerNav></headerNav>
      <div class="contrast" @click='toggleContrast'>
        <div class="contrastTitle">High Contrast</div>
        <div class="contrastSwitch">
          <div class="contrastOff">Off</div>
          <div class="contrastOn">On</div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        methods: {
            resetSearchString: function(){
                this.searchString = this.$root.state.content.searchString = ''
            },
            toggleContrast: function (){
                this.$root.state.contrast = this.$root.state.contrast == 'high' ? 'normal' : 'high';
                Event.$emit('toggleContrast');
            },
            searchSubmitted: function (){
                Event.$emit('activeContentChange', 'search')
                Event.$emit('searchSubmitted', this.searchString)
            }
        },
        data() {
            return {
                searchString: ''
            }
        }
    }
</script>
