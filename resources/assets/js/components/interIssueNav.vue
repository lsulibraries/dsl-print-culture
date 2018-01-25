<script>
  import issueMonth from './issueMonth' 
  import intraIssueNav from './intraIssueNav'
  export default {
    components: {
      intraIssueNav,
      issueMonth
    },
    data(){
      return {
          months:['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'],
          hasData: this.$root.journals ? true : false
      }
    },
    methods:{
      lookupMonth: function(month){
          let monthConvert = {'JAN':'01','FEB':'02','MAR':'03','APR':'04','MAY':'05','JUN':'06','JUL':'07','AUG':'08','SEP':'09','OCT':'10','NOV':'11','DEC':'12'}
          return monthConvert[month]
      },
      lookup: function(month, year){
          let intMonth = this.lookupMonth(month);
          let ret = []
          for(const j in this.$root.journals){
          let tmp = this.$root.journals[j]
          if(tmp.month == intMonth && tmp.year == year){
              ret.push(tmp.id)
          }
          }
          return ret
      }
    },
  }
</script>
<template>
            <div v-if="hasData" class="interIssueNav">
              <div class="issueMask"></div>
              <div class="issueIndex">
                <div class="singleIndex">
                  <div class="yearText">1845</div>
                  <div class="indicatorYear"></div>
                </div>
                <issue-month v-for="month in this.months" :list='lookup(month,"1845")' class="singleIndex" :month="month"></issue-month>
              </div>
              <div class="issueIndex">
                <div class="singleIndex">
                  <div class="yearText">1846</div>
                  <div class="indicatorYear"></div>
                </div>
                <issue-month :month='this.months[0]' :list='lookup("JAN","1846")' class="singleIndex"></issue-month>
              </div>
              <intraIssueNav></intraIssueNav>
            </div>
</template>