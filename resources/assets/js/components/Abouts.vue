<template>
       <div class="abouts">
         <div class="aboutToggle">
           <router-link :to="'/project/about'" tag='div' class="about" active-class="active">Project</router-link>
           <router-link :to="'/project/methodology'" tag='div' class="technical" active-class="active">Methodology</router-link>
           <router-link :to="'/project/staff'" tag='div' class="credits" active-class="active">Staff</router-link>
         </div>
         <div class="aboutViewer">
           <logo v-if="this.context == 'about'"></logo>
           <div class="about-about" v-if="this.context == 'about' && !this.isLoading" v-html="this.text"></div>
           <div class="about-methodology" v-if="this.context == 'methodology'  && !this.isLoading">
             <div class="about-methodology-html" v-html="this.text"></div>
             <div class="about-opendata">
               <h2>Open Data</h2>
               <div class="about-opendata-description">All of the data used to build this site are available for use and
                 reuse under the CC BY 4.0 license. Feel free to download, share, mix it up, build your own projects with it.
                 We just ask that you attribute the LSU Digital Scholarship Lab. Read more about the CC BY 4.0 license
                 here:https://creativecommons.org/licenses/by/4.0</div>
              <div class="about-opendata-pdf-wrapper">
                <h3 class="about-opendata-pdf-header">PDF Files</h3>
                <div class="about-opendata-pdf-description">
                  <p>The PDF scan of each issue is also available for download. </p>
                  <p>PDF scans of individual issues can be downloaded from the issue view (details here)</p>
                  <p>Bulk PDF scans are also available to download. The files are named by the date of the issue.
                    For example, the PDF file for the issue from January 5, 1845 is entitled "BroadwayJournal_18450104.pdf".
                    To see how this issue displays on the site: <a href="/#/issues/18450104?viewer=pdf">/#/issues/18450104?viewer=pdf</a></p>
                  <h4 class="about-opendata-download-header">Bulk Download PDF Files</h4>
                  <div class="about-opendata-download-link"><a href="/api/broadwayjournal/download/pdf">pdf.zip</a></div>
                </div>
              </div>
              <div class="about-opendata-tei-wrapper">
                <h3 class="about-opendata-tei-header">PDF Files</h3>
                <div class="about-opendata-tei-description">
                  <p>Text Encoding Initiative, or TEI, is a markup standard for representing of texts in digital form. Learn more about TEI here: http://www.tei-c.org/index.xml</p>
                  <p>Each issue of the Broadway Journal is available as an TEI file. Use this link to download all issues. The files are named by the date of the issue.
                    For example, the TEI file for the issue from January 5, 1845 is entitled "BroadwayJournal_18450104.xml". To see how this issue displays on our site: <a href='/#/issues/18450104'>/#/issues/18450104</a></p>
                  <h4 class="about-opendata-download-header">Bulk Download TEI Files</h4>
                  <div class="about-opendata-download-link"><a href="/api/broadwayjournal/download/tei">tei.zip</a></div>
                </div>
              </div>
              <div class="about-opendata-intermediate-wrapper">
                <h3 class="about-opendata-intermediate-header">PDF Files</h3>
                <div class="about-opendata-intermediate-description">
                  <p>In the process of building this site a type of intermediate data was created. This data was created for the specific needs of this project, but is being offered here for anyone who would like it. </p>
                  <h4 class="about-opendata-download-header">Bulk Download intermediate Files</h4>
                  <div class="about-opendata-download-link"><a href="/api/broadwayjournal/download/intermediate_xml">intermediate_xml.zip</a></div>
                </div>
              </div>
              <div class="about-opendata-all-wrapper">
                <h3 class="about-opendata-all-header">PDF Files</h3>
                <div class="about-opendata-all-description">
                  <p>For ease of use, all data (PDF, TEI, and Intermediate) is available as a single download.</p>
                  <h4 class="about-opendata-download-header">Bulk Download All Files</h4>
                  <div class="about-opendata-download-link"><a href="/api/broadwayjournal/download/all">all.zip</a></div>
                </div>
              </div>
             </div>
           </div>
         </div>
         <div class="about-staff" v-if="this.context == 'staff'">
          <creditsPersonList v-if="!this.isLoading"></creditsPersonList>
         </div>
       </div>
     </div>
</template>

<script>
  import logo from './logo'
  import creditsPersonList from './creditsPersonList'
  export default {
      components: { creditsPersonList, logo },

      data() {
          return {
            links: [
              {
                label: 'TEI text files',
                link: '/api/broadwayjournal/download/tei',
                description: "placeholder ..."
              },
              {
                label: 'PDF files',
                link: '/api/broadwayjournal/download/pdf',
                description: "placeholder ..."
              },
              {
                label: 'Intermediate data',
                link: '/api/broadwayjournal/download/intermediate_xml',
                description: "placeholder ..."
              },
              {
                label: 'all',
                link: '/api/broadwayjournal/download/all',
                description: "placeholder ..."
              }
            ]
          }
      },

      computed: {
        context: function () {
          let context = 'about'
          if (['project', 'methodology', 'opendata', 'staff'].indexOf(this.$route.params.id) != -1) {
            context = this.$route.params.id
          }
          console.log(context)
          return context
        },
        text: function () {
          return this.$root.xhrDataStore.abouts[this.context]
        },
        isLoading: function () {
          if (this.context == 'staff') {
            return this.$root.empty(this.$root.xhrDataStore.personography.personIndex)
          }
          return this.$root.xhrDataStore.abouts[this.context].length < 1
        }
      },

      methods: {

      },
      created() {

      }
  }
</script>
