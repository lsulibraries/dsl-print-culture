<script>
    export default {
        data() {
            return { 
                meSeen:false,
            }
        },
        props: ['id'],
        methods: {
            getLink: function () {
                return '/issues/' + this.id
            },
        },
        computed: {
            isCurrentIssue: function(){
                if (this.$route.params.id == this.id){
                    return true
                }
                return false
            },
            isMonthShown: function(){
                if(this.id.substring(0,6) == this.$route.params.id.substring(0,6)){
                    return true
                }
                return false
            }
        },
    }
</script>
<template>
    <div v-if="this.isMonthShown" class="childIndex">
        <router-link :to="getLink()" tag='div'>
            <div v-bind:class="{active: this.isCurrentIssue}" v-text="id.slice(-2)"></div>
        </router-link>
    </div>
</template>
