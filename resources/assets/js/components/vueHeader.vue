
<template>
    <div class="header">
      <div class="headerTitle">The<br>Broadway<br>Journal</div>
      <headerNav></headerNav>
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
