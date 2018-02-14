<template>
        <div class='tei-markup'>
          <masthead></masthead>
          <div class='teiMarkup' v-html="text"></div>
        </div>
</template>
<script>
    import masthead from './masthead.vue'

    export default {
        components: { masthead },
        props: ['issue', 'bibl'],
        created(){
            if (this.$route) {
                if(this.$route.params.id) {
                    this.issueId = this.$route.params.id
                }
                if (this.$route.params.biblid) {
                    this.biblId = this.$route.params.biblid
                }
                else {
                    this.biblId = false
                }
            }
            this.getText()
            this.parseRoles()
        },
        computed: {
            textLoaded: {
              get: function () {
                let loaded = false;
                if(this.$root.xhrDataStore.issueText.hasOwnProperty(this.issueId)) {
                  if (this.biblId) {
                      loaded = this.$root.xhrDataStore.issueText[this.issueId].hasOwnProperty(this.biblId)
                  }
                  else {
                    loaded = this.$root.xhrDataStore.issueText[this.issueId].hasOwnProperty('full')
                  }
                }
                if (!loaded) {
                  this.getText()
                }
                return loaded
              },
              set: function (newValue) {
                return newValue
              }
            },
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
          textForRoute: function () {
            const iid = this.$route.params.id
            if (!this.$route.params.biblid) {
              return this.$root.xhrDataStore.issueText.hasOwnProperty(iid) && this.$root.xhrDataStore.issueText[iid].hasOwnProperty('full')
            }
            else {
              return this.$root.xhrDataStore.issueText.hasOwnProperty(iid) && this.$root.xhrDataStore.issueText[iid].hasOwnProperty(this.$route.params.biblid)
            }
          },
          fetchData: function() {

              this.issueId = this.$route.params.id

              if(this.$route.params.biblid) {
                  this.biblId = this.$route.params.biblid
              }
              else { // no biblId supplied in the route
                  this.biblId = false
              }
              this.text = ''
              if (!this.textForRoute()) {
                this.getText()
              }
              else {
                this.setText()
              }
              if (this.$refs.Scrollbar) {
                this.$refs.Scrollbar.scrollToY(0)
              }
            },
            getText: function(){
                if(this.biblId){
                  if(!this.$root.xhrDataStore.issueText[this.issueId] || !this.$root.xhrDataStore.issueText[this.issueId][this.biblId]) {
                    let url = '/api/broadwayjournal/'+ this.issueId + '/piece-text/' + this.biblId;
                    if (!this.$root.xhrDataStore.issueText[this.issueId]) {
                      this.$root.xhrDataStore.issueText[this.issueId] = {}
                    }
                    axios.get(url).then(response => {
                      this.$root.xhrDataStore.issueText[this.issueId][this.biblId] = response.data
                      this.text = response.data
                      this.textLoaded = true
                    });
                  }
                  else {

                  }
                }
                else {
                  if (!this.$root.xhrDataStore.issueText[this.issueId] || !this.$root.xhrDataStore.issueText[this.issueId]['full']) {
                    if (!this.$root.xhrDataStore.issueText[this.issueId]) {
                      this.$root.xhrDataStore.issueText[this.issueId] = {}
                    }
                    let url = '/api/broadwayjournal/' + this.issueId + '/issue-text';
                    axios.get(url).then(response => {
                      this.$root.xhrDataStore.issueText[this.issueId]['full'] = response.data
                      this.text = response.data
                      this.textLoaded = true
                    });
                  }
                  else {

                  }
                }
            },
            getTocEntry: function(issueId, itemId){

                url = '/api/broadwayjournal/' + issueId + '/toc';
                axios.get(url).then((response) => {
                    bibl = response.data
                    for (item in bibl.toc){
                        if(item == itemId){
                            this.biblData = bibl.toc[item]
                            return
                        }
                        if(bibl.toc[item].pieces){
                            for (piece in bibl.toc[item].pieces){
                                if(piece == itemId){
                                    this.biblData = bibl.toc[item].pieces.piece
                                    return
                                }
                            }
                        }
                    }
                });
            },
            setText: function () {
              if (this.textForRoute()) {
                const leaf = this.$route.params.biblid ? this.$route.params.biblid : 'full'
                this.text = this.$root.xhrDataStore.issueText[this.issueId][leaf]
              }
              else {
                this.text = ''
              }
            },
        },
        mounted() {


        },
        created() {
          this.fetchData()
        },
        data(){
            return{
                issueId: '',
                markdown:[],
                biblData: {},
                biblId: false,
                text: ''
            }
        },
    }
</script>
