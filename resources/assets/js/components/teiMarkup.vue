<template>
        <div class='tei-markup'>
            <div class="masthead" v-if="frontPage && masthead">
                <div class="masthead-title">{{ this.mastheadIssueTitle }}</div>
                <div class="masthead-issue">
                    <div class="masthead-volume">{{ this.mastheadIssueVol }}</div>
                    <div class="masthead-publication">{{ this.mastheadPublication }}</div>
                    <div class="masthead-number">{{ this.mastheadIssueNum }}</div>
                </div>
                <div class="masthead-staff">
                    <div :class="'masthead-' + role.toLowerCase()" v-for="(names,role) in this.mastheadPeopleByRole">
                        <div class="masthead-role-label">{{ role }}</div>
                        <div class="masthead-name" v-for="name in names">{{ name }}</div>
                    </div>
                </div>
            </div>
            <vue-scrollbar class="issue-scrollbar" v-if="text">
              <div class='teiMarkup' v-html="text"></div>
            </vue-scrollbar>
        </div>
</template>
<script>
    import VueScrollbar from './vue-scrollbar.vue'

    export default {
        components: { VueScrollbar },
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
            this.getMasthead()
            this.getText()
            this.parseRoles()
        },
        computed: {
            frontPage: function () {
                return this.$route.params.biblid ? false : true
            },
            mastheadIssueTitle: function() {
                return this.masthead.issueTitle
            },
            mastheadIssueNum: function () {
                return 'No. ' + this.masthead.issueNum
            },
            mastheadIssueVol: function () {
                return 'Vol. ' + this.masthead.issueVol
            },
            mastheadPublication: function () {
                return this.masthead.issueDate
            },
            mastheadPeople: function () {
                return this.masthead.issueListPerson
            },
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
              this.getMasthead()
              this.$refs.Scrollbar.scrollToY(0)

            },
            getMasthead: function () {
                let headerUrl = '/api/broadwayjournal/issue/'+ this.issueId +'/header';
                axios.get(headerUrl).then(response => {
                  this.masthead = response.data.issueMeta
                  this.parseRoles()
                });

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
            parseRoles: function () {
                if (!this.masthead.issueListPerson) {
                    return []
                }
                let people = []
                let groups = {}
                for (const item of Object.values(this.mastheadPeople)) {
                    if(Array.isArray(item)) {
                        for(let i in item) {
                            if(!groups.hasOwnProperty(item[i].personIssueRole)) {
                                groups[item[i].personIssueRole] = []
                            }
                            groups[item[i].personIssueRole].push(item[i].personName)
                        }
                    }
                    else {
                        if(!groups.hasOwnProperty(item.personIssueRole)) {
                            groups[item.personIssueRole] = []
                        }
                        groups[item.personIssueRole].push(item.personName)
                    }
                }
                for (const [key, value] of Object.entries(groups)) {
                    this.mastheadPeopleByRole[key] = []
                    for (const name of Object.values(value)) {
                        this.mastheadPeopleByRole[key].push(name)
                    }
                }
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
                masthead: {},
                biblData: {},
                biblId: false,
                mastheadPeopleByRole: {},
                text: ''
            }
        },
    }
</script>
