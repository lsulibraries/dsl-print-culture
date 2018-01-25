<template>
    <div class="personographyDiscription">
          <div class="personographyDiscriptionHeader" v-html="this.personographyDescription"></div>
      <div class="personographyDiscriptionText" ></div>
        </div>
</template>
<script>
    export default {
        data() {
            return {
                personographyDescription: this.$root.xhrDataStore.abouts.personographyDescription
            }
        },
        created() {
            if(this.$root.xhrDataStore.abouts.personographyDescription.length > 1){
                this.aboutText = this.$root.xhrDataStore.abouts.personographyDescription
            }else{
                url = '/api/broadwayjournal/abouts/personographyDescription'
                axios.get(url).then(response => this.personographyDescription = response.data);
            }
        }
    }
</script>