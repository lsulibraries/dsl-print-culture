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

        methods:{
            isActive: function(){
                if(this.biblId == this.$route.params.biblid){ 
                    return true
                }
            },
            fetchData: function() {
                this.issueId = this.$route.params.id
                if (this.$route.params.biblid) {
                    this.biblId = this.$route.params.biblid
                }
            },
            tocItemSelected: function() {
                Event.$emit("pdf-pageChange",parseInt(this.id.pdf_index))
                this.id.issueId = this.$root.state.content.issue.id
                Event.$emit("issueBiblSelected", this.id)
            },
            getLink: function() {
                return '/issues/' + this.issueId + '/' + this.pieceIndex;
            }
        },
    }
</script>
<template>
        <router-link :to="this.getLink()" class="childPiece" @click='tocItemSelected' tag='div' v-bind:class='{tocActive: this.isActive()}'>
          <div class="childPieceTitle">{{id.title}}</div>
          <div v-if='id.auth_name' class="childPieceAuthor">{{id.auth_name}}</div>
        </router-link>
</template>