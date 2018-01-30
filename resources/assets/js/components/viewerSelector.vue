<template>
    <router-link tag="div" :to="link" class='viewerSelector' v-bind:class="{pdfSelected: pdfSelected}" @click="toggleViewer">
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
    </router-link>
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
        computed: {
            active: function () {
                return this.viewer
            },
            link: function () {
                if (this.viewer == 'pdf') {
                    return this.$route.path
                }
                return this.$route.path + '?viewer=pdf'
            },
            pdfSelected: function () {
                return this.viewer == 'pdf'
            },
            viewer: function () {
                if (this.$route.query.viewer == 'pdf') {
                    return 'pdf'
                }
                return 'text'
            }
        },
        data(){
            return {
                
            }
        }
    }
</script>
