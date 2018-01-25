<script>
    export default {
        data() {
            return { 
                meSeen:false,
                toggled:false,
            }
        },
        props: ['id'],
        methods: {
            selectIssue: function(){
                this.toggled = this.$route.params.id == this.id
            },
            getLink: function () {
                return '/issues/' + this.id
            },
        },
        watch: {
            '$route': 'selectIssue'
        },
    }
</script>
<template>
    <div v-if="meSeen" @click="selectIssue(id)" class="childIndex">
        <router-link :to="getLink()" tag='div'>
            <div v-bind:class="[{active: toggled}, 'childText']" v-text="id.slice(-2)"></div>
        </router-link>
    </div>
</template>
