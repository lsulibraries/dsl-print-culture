<script>
export default {
    created(){
        Event.$on('zoomUpdate',(level,page)=>{
                this.scale = level;
                this.loadPdf(this.current_issue, page,this.scale);
        }),
        Event.$on('nextPage', (page) => {
            this.current_page += 1;
            this.loadPdf(this.current_issue, this.current_page);
        }),
        Event.$on('issueSelected', (id) => {
            this.current_page = 1;
            this.current_issue = id;
            this.loadPdf(this.current_issue, this.current_page);
        }),
        Event.$on('pdf-pageChange', (page) => {
            this.loadPdf(this.current_issue, page);
        })
        Event.$on('issueBiblSelected', (bibl) => {
            this.current_issue = bibl.issueId
            this.current_page = bibl.pdf_index
        })
    },
    data() {
        return {
            scale: 1.3,
            issueHeaderData: false
        }
    },
    mounted(){
        this.loadPdf(this.current_issue, this.current_page, this.scale);
    },
    computed: {
        biblId: function () {
            if(this.$route.params.biblid) {
                return this.$route.params.biblid
            }
            return false
        },
        current_issue: function () {
            return this.$route.params.id
        },
        current_page: function () {
            
            if (this.biblId) {
                return this.issueHeaderData[this.biblId].pieceMeta.piecePdfIndex
            }
            else {
                return 1
            } 

        },
    },
    watch: {
        '$route': 'fetchData'
    },
    methods: {
        fetchData: function () {
            if(!this.issueHeaderData) {
                let headerUrl = '/api/broadwayjournal/issue/'+ this.$route.params.id +'/header';
                axios.get(headerUrl).then(
                    response => {
                        this.issueHeaderData = response.data
                        if (this.biblId) {
                            const biblData = response.data.listBibl[this.biblId]
                            if(biblData.pieceMeta) {
                                this.current_page = biblData.pieceMeta.piecePdfIndex
                            }
                        }
                    });
            }
            this.loadPdf(this.current_issue, this.current_page, this.scale)
        },

    changePage: function (direction) {

        this.current_page = this.$root.state.content.issue.page;
        switch (direction) {
                case 'next':
                    if(this.current_page == 16){break;}
            else{
                        this.current_page += 1;
                        //console.log(this.current_page);
                break;
                    }
            case 'prev':
                    if(this.current_page == 1){break;}
            else{
                        this.current_page -= 1;
                        //console.log(this.current_page);
                break;
                    }
            default:
            this.current_page = 1;
            }
        this.current_page = this.current_page <= 1 ? 1 : this.current_page;
        Event.$emit('pdf-pageChange', this.current_page);

    },
    loadPdf: function() { 
        // If absolute URL from the remote server is provided, configure the CORS
        // header on that server.
        if(this.$root.state.content.issue.viewer == 'text'){
            return;
        }
        let issue = this.current_issue
    var url = '/storage/broadway-tei/pdf/BroadwayJournal_'+issue+'.pdf';
    // var pdfData = atob($pdf);

        // Prepare canvas using PDF page dimensions
    var canvas = document.getElementById('pdf');
        var new_canvas = document.createElement('canvas');
        new_canvas.setAttribute("id", "pdf");
        new_canvas.setAttribute("refs", "replaced");
        canvas.parentNode.replaceChild(new_canvas, canvas);
    PDFJS.disableWorker = true;

    // The workerSrc property shall be specified.
    PDFJS.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

    let page = this.current_page
    // Asynchronous download of PDF
    var loadingTask = PDFJS.getDocument(url);
    let scale = this.scale
    loadingTask.promise.then(function(pdf) {
        if(page > pdf.pdfInfo.numPages){
        return;
        }
        // Fetch the first page
        var pageNumber = parseInt(page);
        pdf.getPage(pageNumber).then(function(page) {
        //scale = 1.3
        var viewport = page.getViewport(scale);
        var canvas = document.getElementById('pdf');
        var context = canvas.getContext('2d');
        canvas.height = viewport.height; //1014
        canvas.width = viewport.width; //735

        // Render PDF page into canvas context
        var renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        var renderTask = page.render(renderContext);
        renderTask.then(function () {
        });
        });
    }, function (reason) {
        // PDF loading error
        console.error(reason);
    });
    },
    }
}
</script>
<template>
      <div id="pdf-viewer" class="pdf-viewer">
    <button class="next-page" @click="changePage('prev')" v-if="this.$root.state.content.issue.page>1" >Prev Page</button>
    <button class="next-page" @click="changePage('next')" v-if="this.$root.state.content.issue.page<16">Next Page</button>
    <canvas id="pdf" class="pdf-canvas"></canvas>
      </div>
</template>
