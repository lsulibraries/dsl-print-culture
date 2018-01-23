<template>
       <div class="abouts">
         <div class="aboutToggle">
       <div class="about" v-bind:class="{active: this.abouts == 'about'}" @click="selectMe('about')">Project</div>
       <div class="technical" v-bind:class="{active: this.abouts == 'tech'}" @click="selectMe('tech')">Methodology</div>
       <div class="credits" v-bind:class="{active: this.abouts == 'credits'}" @click="selectMe('credits')">Staff</div>
         </div>
         <div class="aboutViewer">
           <logo v-if="this.abouts == 'about'"></logo>
           <div v-if="this.abouts == 'about'" v-html="this.aboutText"></div>
           <div v-if="this.abouts == 'tech'" v-html="this.techText"></div>
           <div v-if="this.abouts == 'credits'">
            <creditsPersonList></creditsPersonList>
           </div>
         </div>
       </div>
</template>

<script>
  import creditsPersonList from './creditsPersonList'  
  export default { 
      components: { creditsPersonList },
      data() {
          return {
              abouts: this.$root.state.content.abouts,
              aboutText: this.$root.xhrDataStore.abouts.about,
              techText: this.$root.xhrDataStore.abouts.tech
          }
      },
      methods: {
          selectMe: function(about) {
              this.abouts = about;
              Event.$emit('aboutsSelected', this.abouts);
          },
      },
      created() {
          var url;
          if(this.$root.xhrDataStore.abouts.about.length > 1){
              this.aboutText = this.$root.xhrDataStore.abouts.about
          }else{
              url = '/api/broadwayjournal/abouts/about'
              axios.get(url).then(response => this.aboutText = response.data);
          }
          if(this.$root.xhrDataStore.abouts.tech.length > 1){
              this.techText = this.$root.xhrDataStore.abouts.tech
          }else{
              url = '/api/broadwayjournal/abouts/tech'
              axios.get(url).then(response => this.techText = response.data);
          }
      }
  }
</script>
