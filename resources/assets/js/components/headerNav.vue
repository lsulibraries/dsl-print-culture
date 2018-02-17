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
    <!-- <router-link to='/' exact @click="activeContentClicked('abouts')" tag="div" active-class="active">
            <i class="fa fa-flask" aria-hidden="true"></i>About
    </router-link> -->
    <router-link to='/issues' @click="activeContentClicked('issues')" tag="div" active-class="active">
            <i class="fa fa-bookmark" aria-hidden="true"></i>
            Read Issues
    </router-link>
          <router-link to='/authors' @click="activeContentClicked('personography')" tag="div" active-class="active"><i class="fa fa-user-circle" aria-hidden="true"></i>Authors</router-link>
    </div>
</template>
