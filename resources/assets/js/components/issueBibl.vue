<template>
  <div class="bibl" v-if="haveData()">
    <div class="issueInfo big-title" v-if="!this.frontPage">
      <biblSectionMeta :sectionMeta="this.getSectionMeta()" v-if="this.showSectionForPiece()"></biblSectionMeta>
      <div class='issueDate'>{{this.formatDate()}}</div>
      <biblIssueMeta :issueMeta="this.issueHeaderData.issueMeta"></biblIssueMeta>
    </div>
    <div class="issue">
      <biblPieceMeta :pieceMeta="this.getPieceMeta()" v-if="this.showPieceAsTitle()"></biblPieceMeta>
      <biblSectionMeta :sectionMeta="this.getSectionMeta()" v-if="this.showSectionAsTitle()"></biblSectionMeta>
    </div>
    <div class="authorInfo">
      <router-link :to="getAuthorsLink()" tag="div" class="personMetaContainer">
        <personMeta :personMeta="this.getPersonMeta()" v-if="this.getPersonMeta()"></personMeta>
      </router-link>
      <button id="show-modal" @click="openModal()" v-if="this.drawerIsAvailable()">More from this author</button>
    </div>
  </div>
</template>
<script>
  import biblIssueMeta from './biblIssueMeta'
  import biblPieceMeta from './biblPieceMeta'
  import biblSectionMeta from './biblSectionMeta'
  import personMeta from './personMeta'
  export default {
    components: {
      biblIssueMeta,
      biblPieceMeta,
      biblSectionMeta,
      personMeta,
    },
    computed: {
        frontPage: function () {
            return this.$route.params.biblid ? false : true
        }
    },
    props: {
      biblId: {
        type: String,
        required: true
      },
      issueHeaderData: {
        type: Object,
        required: true
      },
      issueId: {
        type: String,
        required: true
      },
    },
    methods: {
      authorlessPieceInSection: function (biblId) {
          if (this.$root.empty(this.issueHeaderData.listBibl[this.biblId].pieceMeta.pieceListPerson)) {
              if (!this.$root.empty(this.$root.empty(this.issueHeaderData.listBibl[this.biblId].sectionMeta))) {
                  return true
              }
          }
          return false
      },
      biblIsSection: function(biblId) {
          if(this.issueHeaderData.listBibl[biblId].sectionMeta && this.$root.empty(this.issueHeaderData.listBibl[biblId].pieceMeta)){
              return true
          }
          return false
      },
      drawerIsAvailable: function() {
              let isAnon = this.getPersonId() == 'anon'
              let biblExists_notSection = !this.biblIsSection(this.biblId) && this.issueHeaderData.listBibl[this.biblId].pieceMeta.pieceListPerson
              let sectionMetaNotEmpty = !this.$root.empty(this.issueHeaderData.listBibl[this.biblId].sectionMeta)
              let personInSection = this.getPersonMeta()
              return !isAnon && (personInSection || biblExists_notSection)
      },
      formatDate: function() {
        let d = Util.datePartsForIssueId(this.issueId)
        let date = this.lookupMonth(d.month) + ' ' + d.day + ', ' + d.year;
        return date
      },
      getAuthorsLink: function () {
          let pid = this.getPersonId();
          if (pid) {
              return '/authors/' + pid
          }
          return ''
      },
      getPieceMeta: function () {
        return this.issueHeaderData.listBibl[this.biblId].pieceMeta
      },
      getSectionMeta: function () {
        return this.issueHeaderData.listBibl[this.biblId].sectionMeta
      },
      getPersonId: function() {
          // if section, get section list person, if set.
          if(!this.$root.empty(this.issueHeaderData.listBibl[this.biblId].sectionMeta)){
              if(!this.$root.empty(this.issueHeaderData.listBibl[this.biblId].sectionMeta.sectionListPerson)){
                  return Object.keys(this.issueHeaderData.listBibl[this.biblId].sectionMeta.sectionListPerson)[0]
              }
          }
          if(!this.$root.empty(this.issueHeaderData.listBibl[this.biblId].pieceMeta)){
              if (!this.$root.empty(this.issueHeaderData.listBibl[this.biblId].pieceMeta.pieceListPerson)) {
                  return Object.keys(this.issueHeaderData.listBibl[this.biblId].pieceMeta.pieceListPerson)[0]
              }
              else if (!this.$root.empty(this.issueHeaderData.listBibl[this.biblId].sectionMeta)) {
                  const sid = this.issueHeaderData.listBibl[this.biblId].sectionMeta.sectionId
                  if (!this.$root.empty(this.issueHeaderData.listBibl[sid].sectionMeta.sectionListPerson)) {
                      return Object.keys(this.issueHeaderData.listBibl[sid].sectionMeta.sectionListPerson)[0]
                  }
              }
          }
          return false
      },
      getPersonMeta: function (){

          const pid = this.getPersonId()
          const bibl = this.biblId

          if(!pid){
              return false
          }
          if(this.$root.empty(this.$root.xhrDataStore.personography.personIndex[pid])){
              console.log('person ' + pid + ' not found!')
              return {

                  personRole: 'unknown',
                  personName: 'unknown',
                  personViaf: false
              }
          }
          if (!this.$root.empty(this.issueHeaderData.listBibl[this.biblId])) { // have bibl
              let personMeta;
              if (!this.biblIsSection(this.biblId)) {
                  if (this.authorlessPieceInSection(this.biblId)) {
                      sid = this.issueHeaderData.listBibl[this.biblId].sectionMeta.sectionId
                      if(!this.$root.empty(this.issueHeaderData.listBibl[sid].sectionMeta.sectionListPerson)) {
                          personMeta = {
                              personName: this.issueHeaderData.listBibl[sid].sectionMeta.sectionListPerson[pid].personName,
                              personId: pid
                          }
                      }
                  }
                  else {
                      personMeta = {
                          personName: this.issueHeaderData.listBibl[this.biblId].pieceMeta.pieceListPerson[pid].personName,
                          personId: pid
                      }
                  }
                  // personMeta = this.$root.xhrDataStore.personography.personIndex[pid].personMeta
              }
              else {
                  personMeta = {
                      personName: this.issueHeaderData.listBibl[this.biblId].sectionMeta.sectionListPerson[pid].personName,
                      personId: pid
                  }
              }
              if(this.$root.empty(personMeta.personName)){
                  console.log(personMeta.personName)
                  console.log(this.issueHeaderData.listBibl[this.biblId].pieceMeta.pieceListPerson[pid].personName)
                return false
              }
              return personMeta
          }
          console.log('missing list bibl for' + this.biblId)
          return false
      },
      haveData: function() {
        let empty = this.$root.empty
        if(!this.issueHeaderData){
          console.log('headerData is empty')
          return false
        }
        if(empty(this.issueHeaderData.listBibl)){
          console.log('issueHeaderData.listBibl is empty')
        }
        if(this.biblId == '') {
          return false
        }
        if(empty(this.issueHeaderData.listBibl[this.biblId])){
          console.log('listBibl does not exist for '+ this.biblId)
        }
        if(empty(this.issueHeaderData.issueMeta)){
          console.log('missing issueMeta')
        }
        return true
      },
      lookupMonth: function(monthInt){
          const monthMap = {'01':'Jan','02':'Feb','03':'Mar','04':'Apr','05':'May','06':'Jun','07':'Jul','08':'Aug','09':'Sep','10':'Oct','11':'Nov','12':'Dec'}
          return monthMap[monthInt]
      },
      openModal: function () {
        Event.$emit('showModal', true)
      },
      showBiblSectionMeta: function () {
          const biblIdSet  = this.biblId !== ''
          if (!biblIdSet) {
              return false
          }
          let metaExists = !this.$root.empty(this.issueHeaderData.listBibl[this.biblId].sectionMeta)
          return metaExists
      },
      showPieceAsTitle: function () {
        return !this.$root.empty(this.issueHeaderData.listBibl[this.biblId].pieceMeta)
      },
      showSectionAsTitle: function () {
        return this.$root.empty(this.issueHeaderData.listBibl[this.biblId].pieceMeta)
      },
      showSectionForPiece: function () {
        return this.showBiblSectionMeta() && !this.$root.empty(this.issueHeaderData.listBibl[this.biblId].pieceMeta)
      },
    }
  }
</script>
