<template>
  <div class="masthead" v-if="frontPage">
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
</template>
<script>
  export default {
    computed: {
      frontPage: function () {
          return this.$route.params.biblid ? false : true
      },
      issueId: function () {
        return this.$route.params.id
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
    methods: {
      getMasthead: function () {
          let headerUrl = '/api/broadwayjournal/issue/'+ this.issueId +'/header';
          axios.get(headerUrl).then(response => {
            this.masthead = response.data.issueMeta
            this.parseRoles()
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
    },
    data() {
      return {
        masthead: {},
        mastheadPeopleByRole: {},
      }
    },
    created() {
      this.getMasthead()
    },
    watch: {
        '$route': 'getMasthead'
    },
  }
</script>
