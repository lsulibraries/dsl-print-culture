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
            <div class='teiMarkup' v-html="this.highlightText()" v-if="!frontPage"></div>
        </div>
</template>
<script>
    export default {
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
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            fetchData: function() {
                this.issueId = this.$route.params.id

                if(this.$route.params.biblid) {
                    this.biblId = this.$route.params.biblid
                }
                else { // no biblId supplied in the route
                    this.biblId = false
                }
                this.getText()
                this.getMasthead()
            },
            highlightText: function(){
                let needle = this.$root.state.content.searchString
                if(needle.length < 1){
                  return this.issueText
                }
                //Thanks !! http://stackoverflow.com/questions/29433696/create-regex-from-variable-with-capture-groups-in-javascript
                pattern = new RegExp('('+needle+')', 'gi')
                return this.issueText.replace(pattern, "<span class='searchHit'>$1</span>")
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
                  let url = '/api/broadwayjournal/'+ this.issueId + '/piece-text/' + this.biblId;
                  axios.get(url).then(response => this.issueText = response.data);
                }else {
                    return 'full-text goes here '
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
            }
        },
        mounted() {


        },
        data(){
            return{
                issueId: '',
                markdown:[],
                issueText: '',
                masthead: {},
                biblData: {},
                biblId: false,
                mastheadPeopleByRole: {

                },
            }
        },
    }
</script>
