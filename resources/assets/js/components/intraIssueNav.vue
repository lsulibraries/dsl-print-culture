<template>
    <div class='intraIssueNav'>
        <router-link :to="getFullTextLink" tag="div" :class="'toc-full-text'">Back to Full Text</router-link>
        <div class='tocDropdown'>Table of Contents</div>
        <toc-item  v-for='id in tocContent.toc' :id='id'></toc-item>
    </div>
</template>
<script>
    import tocItem from './tocItem'
    export default {
        components: { tocItem },
        data(){
            return {
                issueId: '',
                tocContent: false
            }
        },
        created() {
            // order matters here; see conditional in called fn.
            this.setTocContent()
            this.issueId = this.$route.params.id
        },
        methods: {
            getPdfIndex: function (id) {

            },
            setTocContent: function () {
                if(this.issueId !== this.$route.params.id) {
                    this.tocContent = false
                    this.issueId = this.$route.params.id
                    let url = '/api/broadwayjournal/' + this.issueId + '/toc';
                    axios.get(url).then(response => this.tocContent = response.data);
                }
            },
        },
        computed: {
          getFullTextLink: function () {
            return '/issues/' + this.issueId
          },
        },
        watch: {
            '$route': 'setTocContent'
        },
    }
</script>
