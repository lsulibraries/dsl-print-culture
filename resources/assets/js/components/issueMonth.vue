<script>
    import indexChild from './indexChild'
    export default {
        components: {
            indexChild
        },
        data(){
            return {
                monthConvert: {'JAN':'01','FEB':'02','MAR':'03','APR':'04','MAY':'05','JUN':'06','JUL':'07','AUG':'08','SEP':'09','OCT':'10','NOV':'11','DEC':'12'},
            }
        },
        computed: {
            activeMonth: function () {
                if(this.hasData) {
                    return (this.issueIds[0].substring(0,6) == this.getCurrentYearMonth())
                }
                return false;
            },
            hasData:  function() {
                const loaded = this.$root.journals.length > 0 ? true : false
                return loaded
            },
        },
        props: {month: '',  issueIds: ''},
        methods: {
            getCurrentYearMonth: function () {
                return this.$route.params.id.substring(0,6)
            },
            getLink: function () {
                return '/issues/' + this.issueIds[0]
            }
        },
    }
</script>
<template>
    <div v-bind:class="{activeMonth: this.activeMonth}" v-if="this.hasData">
        <router-link :to="this.getLink()" tag="div">
            <div class="singleText" >{{this.month}}</div>
            <div class="indicatorIndex"></div>
        </router-link>
        <div v-if="this.activeMonth" class="childContainer">
            <index-child :id="issueId" v-for="issueId in this.issueIds"></index-child>
        </div>
    </div>
</template>