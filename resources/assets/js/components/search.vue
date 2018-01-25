// Vue.component('searchResults',{
//     template: `
//  <div class="searchResults">
//    <div class="searchResultsHeader" v-if="this.results.searchResult">
//      <div class="searchResultsTitle">Search Results</div>
//             <div class="searchResultsCount">{{this.searchResultCount()}}</div>
//             <div class="searchResultsString">{{this.searchString}}</div>
//            </div>
//           <searchResult v-for="result in results.searchResult" :result="result" :searchString="searchString"></searchResult>
//         </div>
//     `,
//     data(){
//  return {
//      results: {},
//      searchString: this.$root.state.content.searchString
//  }
//     },
//     created() {
//  this.executeSearch()
//  Event.$on('searchSubmitted', (searchString) => {
//      this.searchString = searchString
//      this.executeSearch()
//  })
//     },
//     methods: {
//  searchResultCount: function() {
//      return this.results.searchResult.length
//  },
//  executeSearch: function() {
//      search_url = '/api/broadwayjournal/issue/search/' + this.searchString;
//      axios.get(search_url).then(response => this.results = response.data);       
//  }
//     }
// })

// Vue.component('searchResult',{
//     props: ['result', 'searchString'],
//     methods: {
//  resultClicked: function(){
//      this.$root.state.content.issue.id = this.result.issueMeta.issueId
//      this.$root.state.content.issue.decls_id = this.result.pieceMeta.pieceId

//      Event.$emit('activeContentChange', 'issues')
//      Event.$emit('issueBiblSelected', {
//      issueId: this.result.issueMeta.issueId,
//      pdf_index: 1,
//      decls_id: this.result.pieceMeta.pieceId
//      })
//  },
//  pieceTitle: function() {
//      if(this.$root.empty(this.result.pieceMeta.pieceTitle)){
//      return "---No title found---"
//      }
//      return this.result.pieceMeta.pieceTitle
//  },
//     },
//     template: `
//  <div class="searchResult" @click="resultClicked">
//    <div class="pieceTitle"><strong>{{this.pieceTitle()}}</strong></div>
//             <div class="context">{{this.result.contextBefore}}<span class="searchHit">{{this.result.hit}}</span>{{this.result.contextAfter}}</div>
//  </div>
//     `
// })
