<script>
  import issueMonth from './issueMonth' 
  import intraIssueNav from './intraIssueNav'
  import VueScrollbar from './vue-scrollbar.vue'   
  export default {
    components: {
      intraIssueNav,
      issueMonth,
      VueScrollbar
    },
    data(){
      return {
          months:['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'],
      }
    },
    computed: {
      hasData: function hasData() {
          var loaded = this.$root.journals.length > 0 ? true : false;
          return loaded;
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
          <vue-scrollbar classes="nav-scrollbar" ref="Scrollbar">
            <div v-if="hasData" class="interIssueNav">
              <div class="issueMask"></div>
              <div class="issueIndex">
                <div class="singleIndex">
                  <div class="yearText">1845</div>
                  <div class="indicatorYear"></div>
                </div>
                <issueMonth v-for="month in this.months" :issueIds='lookup(month,"1845")' class="singleIndex" :month="month" ></issueMonth>
              </div>
              <div class="issueIndex">
                <div class="singleIndex">
                  <div class="yearText">1846</div>
                  <div class="indicatorYear"></div>
                </div>
                <issueMonth :month='this.months[0]' :issueIds='lookup("JAN","1846")' class="singleIndex"></issueMonth>
              </div>
              <intraIssueNav></intraIssueNav>
            </div>
          </vue-scrollbar>
</template>