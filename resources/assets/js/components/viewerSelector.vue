<template>
    <div class='viewerSelector' v-bind:class="{pdfSelected: pdfSelected}" @click="toggleViewer">
          <div class="viewerTitle">Toggle View</div>
          <div class="viewerSwitch">
            <div class="viewerText">
              <div class="viewerTextIcon"><i class="fa fa-file-text-o" aria-hidden="true"></i></div>
              <div class="viewerTextLabel">Text</div>
            </div>
            <div class="viewerPdf">
              <div class="viewerPdfIcon"><i class="fa fa-file-pdf-o" aria-hidden="true"></i></div>
              <div class="viewerPdfLabel">PDF</div>
            </div>
          </div>
    </div>
</template>
<script>
    export default {
        created(){
            Event.$on('viewerSelected', (viewer) =>{
            this.active = viewer
            })

        },
        methods: {
            isActive: function(viewerType){
                return viewerType == this.active
            },
            toggleViewer: function(){
                this.pdfSelected = !this.pdfSelected
                this.active = this.active == 'pdf' ? 'text' : 'pdf'
                Event.$emit('viewerSelected', this.active)
            }
        },
        data(){
            return {
                active: this.$root.state.content.issue.viewer,
                pdfSelected: false
            }
        }
    }
</script>
