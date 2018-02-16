<template>
    <router-link tag="div" :to="link" class='viewerSelector' v-bind:class="{pdfSelected: pdfSelected}" @click="toggleViewer">
          <div class="viewerTitle">{{ toggleLabel }}</div>
          <div class="viewerSwitch">          </div>
    </router-link>
</template>
<script>
    export default {
        created(){
            Event.$on('viewerSelected', (viewer) =>{
                this.active = viewer
            })
            this.setTocContent()
        },
        methods: {
            isActive: function(viewerType){
                return viewerType == this.active
            },
            toggleViewer: function(){
                this.pdfSelected = !this.pdfSelected
                this.active = this.active == 'pdf' ? 'text' : 'pdf'
                Event.$emit('viewerSelected', this.active)
            },
            bibl4page: function () {
                let bibl = this.pageMap[this.$route.query.page]
                if (!bibl) {
                    if (!this.$route.params.biblid) {
                        console.log("Cannot determine text bibl for " + this.$route.fullPath)
                        return 'p1'
                    }
                    else {
                        return this.$route.params.biblid
                    }
                }
                return bibl
            },
            setTocContent: function () {
                if(this.issueId !== this.$route.params.id) {
                    this.tocContent = false
                    this.issueId = this.$route.params.id
                    let url = '/api/broadwayjournal/' + this.issueId + '/toc';
                    axios.get(url).then(response => this.tocContent = response.data.toc);
                }
            },
        },
        computed: {
            active: function () {
                return this.viewer
            },
            link: function () {
                if (this.viewer == 'pdf') {
                    const issueId = this.$route.params.id
                    const biblId = this.$route.query.page ? this.bibl4page() : this.$route.biblid
                    if (this.$route.query.page) {
                        return '/issues/' + issueId + '/' + this.bibl4page()
                    }
                    else {
                        return this.$route.path
                    }
                }
                else {
                    const issueId = this.$route.params.id
                    const biblId = this.$route.query.page ? this.bibl4page() : this.$route.biblid
                    return this.$route.path + '?viewer=pdf'
                }
            },
            pdfSelected: function () {
                return this.viewer == 'pdf'
            },
            pageMap: function () {
                let map = {}
                for (const [key, value] of Object.entries(this.tocContent)) {
                     if (value.hasOwnProperty('pdf_index')) {
                        if (!map.hasOwnProperty(value.pdf_index)) {
                            map[value.pdf_index] = key
                        }
                     }
                     else if (value.hasOwnProperty('pieces')) {
                        for (const [k, v] of Object.entries(value.pieces)) {
                            if (v.hasOwnProperty('pdf_index')) {
                                if (!map.hasOwnProperty(v.pdf_index)) {
                                    map[v.pdf_index] = k
                                }
                             }
                        }
                     }
                }

                return map
            },
            toggleLabel: function () {
              return this.viewer == 'pdf' ? "View Text" : "View PDF"
            },
            viewer: function () {
                if (this.$route.query.viewer == 'pdf') {
                    return 'pdf'
                }
                return 'text'
            },
            pdfIndex: function () {
                if (this.$route.query.page) {
                    return parseInt(this.$route.query.page)
                }
                return false
            }
        },
        watch: {
            '$route': 'setTocContent'
        },
        data(){
            return {
                tocContent: {}
            }
        },
    }
</script>
