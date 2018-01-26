
<template>
    <div class="header">
      <a href="." class="headerTitle">The<br>Broadway<br>Journal</a>
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
    import headerNav from './headerNav';
    import headerLogo from './headerLogo';
    export default {
        components: { headerNav, headerLogo },
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
