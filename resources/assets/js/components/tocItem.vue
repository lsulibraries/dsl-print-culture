<script>
    import childPiece from './childPiece'
    export default {
        components: { childPiece },
        data(){
            return { 
                toggled:false,
                issueId: 18450104
            }
         },
         props:['id'],
         created() {
            if(this.$route.params.id) {
                this.issueId = this.$route.params.id
            }
         },
         methods:{
            isActive: function(){
                if(this.id.decls_id == this.$route.params.biblid){
                    console.log('match')
                    return true
                }
            },
            showChildren: function(){
                if(this.toggled==false){
                    //turn on this.$children
                    for (each in this.$children){
                        this.$children[each].meSeen=true;
                        this.toggled=true;
                    }
                    //turn off everyone else's children
                    for(one in this.$parent.$children){
                        //create new check for toc
                        if (this.$parent.$children[one].id != this.id){
                            for(two in this.$parent.$children[one].$children){
                                this.$parent.$children[one].$children[two].meSeen=false;
                                //remove activeMonth from everyone else
                                this.$parent.$children[one].toggled=false;
                            }
                        }
                    }
                }
                else{
                     //turn off this.children
                     for (each in this.$children){
                         this.$children[each].meSeen=false;
                         this.toggled=false;
                     }
                }
            },
            tocItemSelected: function() {
                this.showChildren();
                if(this.id.pdf_index >= 1){
                    Event.$emit("pdf-pageChange", parseInt(this.id.pdf_index))
                }
                let page = 1;
                if(this.id.pieces){
                    for(const key in this.id.pieces){
                        page = parseInt(this.id.pieces[key].pdf_index);
                        Event.$emit("pdf-pageChange",parseInt(this.id.pieces[key].pdf_index))
                        break
                    }
                }
                if(this.id.decls_id){
                    if(!this.id.pdf_index){
                        this.id.pdf_index = page;
                    }
                    this.id.issueId = this.$root.state.content.issue.id
                    Event.$emit("issueBiblSelected", this.id)
                }
            },
            getLink: function() {
                const issueId = this.issueId
                const  biblId  = this.id.decls_id
                let pdfIndex
                if(!this.id.hasOwnProperty('pdf_index')) {
                    if (this.id.hasOwnProperty('pieces')) {
                        pdfIndex = this.id.pieces[Object.keys(this.id.pieces)[0]].pdf_index
                    }
                }
                else {
                    pdfIndex = parseInt(this.id.pdf_index)
                }

                const viewerMode = this.$route.query.viewer == 'pdf' ? '?viewer=pdf&page=' + pdfIndex : ''
                return '/issues/' + issueId + '/' + biblId + viewerMode;
            }
        },
    }
</script>
<template>
    <div class="tocItem" v-bind:class='id.type'>
        <router-link :to="this.getLink()" class="tocToggle" tag='div' v-bind:class="{tocActive: this.isActive()}">
            <div class="tocTitle">{{id.title}}</div>
            <div v-if='id.auth_name' class="author">{{id.auth_name}}</div>
            <div v-if='id.start' class="pageNumber"></div>
        </router-link>
        <child-piece v-if='id.pieces'  v-for='(piece, index) in  id.pieces' :id='id.pieces[index]' :pieceIndex='index'></child-piece>
    </div>
</template>