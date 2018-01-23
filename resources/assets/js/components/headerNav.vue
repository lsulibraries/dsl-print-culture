<script>
    export default {
        data() {
            return {
                content: this.$root.state.activeContent
            }
        },
        methods: {
            activeContentClicked: function(content) {
                this.content = content
                Event.$emit('activeContentChange', content)
            },
            showSearch: function () {
                return this.$root.state.activeContent == 'issues'
            }
        }
    }
</script>
<template>
    <div class='headerNav'>
    <router-link to='/' exact v-bind:class="{active: this.content == 'abouts'}" @click="activeContentClicked('abouts')" tag="div">
            <i class="fa fa-flask" aria-hidden="true"></i>About
    </router-link>
    <router-link to='/issues' v-bind:class="{active: this.content == 'issues'}" @click="activeContentClicked('issues')" tag="div">
            <i class="fa fa-bookmark" aria-hidden="true"></i>
            Read Issues
    </router-link>
          <router-link to='/authors' v-bind:class="{active: this.content == 'personography'}" @click="activeContentClicked('personography')" tag="div"><i class="fa fa-user-circle" aria-hidden="true"></i>Authors</router-link>
    </div>
</template>