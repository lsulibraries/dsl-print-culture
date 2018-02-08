<script>
import viewerSelector from './viewerSelector'


export default {
    components: { viewerSelector },
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
        current_page: this.$root.state.content.issue.page,
        current_issue: this.$root.state.content.issue.id
    }
    },
    mounted(){
    this.loadPdf(this.current_issue, this.current_page, this.scale);
    },

    methods: {
    changePage: function (direction) {

        page = this.$root.state.content.issue.page;
        switch (direction) {
                case 'next':
                    if(page == 16){break;}
            else{
                        page += 1;
                        //console.log(page);
                break;
                    }
            case 'prev':
                    if(page == 1){break;}
            else{
                        page -= 1;
                        //console.log(page);
                break;
                    }
            default:
            page = 1;
            }
        page = page <= 1 ? 1 : page;
        Event.$emit('pdf-pageChange', page);

    },
    loadPdf: function(issue, page = 1, scale = 1.3) { 
    // If absolute URL from the remote server is provided, configure the CORS
    // header on that server.
        if(this.$root.state.content.issue.viewer == 'text'){
        return;
        }
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

    // Asynchronous download of PDF
    var loadingTask = PDFJS.getDocument(url);
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
        <div class="pdf-controls">
            <button class="next-page" @click="changePage('prev')" v-if="this.$root.state.content.issue.page>1" >Prev Page</button>
            <button class="next-page" @click="changePage('next')" v-if="this.$root.state.content.issue.page<16">Next Page</button>
            <viewerSelector></viewerSelector>            
        </div>
        <canvas id="pdf" class="pdf-canvas"></canvas>
    </div>
</template>