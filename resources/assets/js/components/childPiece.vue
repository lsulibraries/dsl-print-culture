<script>
    export default {
        data(){
            return {

                issueId: '',
                biblId: '',
                author: ''
            }
        },

        watch: {
            '$route': 'fetchData'
        },

        props:['id','pieceIndex'],

        created() {
            this.issueId = this.$route.params.id
            this.biblId = this.$route.params.biblid
        },
        computed: {
            isActive: function(){
                if(this.biblId == this.$route.params.biblid){ 
                    return true
                }
                return false
            },
        },
        methods:{
            fetchData: function() {
                this.issueId = this.$route.params.id
                if (this.$route.params.biblid) {
                    this.biblId = this.$route.params.biblid
                }
            },
            getLink: function() {
                const pdfIndex = this.id.pdf_index
                const viewerMode = this.$route.query.viewer == 'pdf' ? '?viewer=pdf&page=' + pdfIndex : ''
                return '/issues/' + this.issueId + '/' + this.pieceIndex + viewerMode;
            }
        },
    }
</script>
<template>
    <router-link :to="this.getLink()" class="childPiece" tag='div' active-class="tocActive">
      <div class="childPieceTitle">{{id.title}}</div>
      <div v-if='id.auth_name' class="childPieceAuthor">{{id.auth_name}}</div>
    </router-link>
</template>