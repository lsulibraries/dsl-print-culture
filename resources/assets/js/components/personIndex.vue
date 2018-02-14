<template>
  <div class='personIndex' v-if="!this.$root.empty(this.index)">
    <div class="person-index-about" v-html="this.$root.xhrDataStore.abouts.personographyDescription"></div>
      <div class="personIndexLabel">Author Index</div>
      <vue-scrollbar classes="index-scrollbar" ref="Scrollbar">
        <div class="personIndexInner scroll-me">
            <person v-for="personObj in this.index" :person="personObj" v-if="!this.loading"></person>
            <circle9 v-if="this.loading" :size="'150px'"></circle9>
        </div>
      </vue-scrollbar>
  </div>
</template>
<script>
    import VueScrollbar from 'vue2-scrollbar';
    import {Circle9} from 'vue-loading-spinner'
    import person from './person'
    export default {
        components: { Circle9, person, VueScrollbar },
        data() {
            return {
                index: {},
                loading: true
            }
        },
        methods: {
            setupIndex: function (rawIndex) {
                let deduped = {};
                let entries = Object.entries(rawIndex)
                for (const [key, value] of entries) {
                    if (Array.isArray(value)) {
                        console.log(key + ' has multiple records, arbitrarily(-ish) using the first...')
                        deduped[key] = value[0]
                    }
                    else {
                        deduped[key] = value
                    }
                }
                this.loading = false
                this.index = deduped
            }
        },
        created(){
            if (!this.$root.empty(this.$root.xhrDataStore.personography.personIndex)) {
                this.setupIndex(this.$root.xhrDataStore.personography.personIndex)
            }
            Event.$on('personographyLoaded', (index) => {
                this.setupIndex(index.personIndex);
            })
            Event.$on('filterStringUpdated', (filterString) => {
                this.$refs.Scrollbar.scrollToY(0)
            })
            Event.$on('filterRoleUpdated', (filterRole) => {
                this.$refs.Scrollbar.scrollToY(0)
            })
        }
}
</script>
<style lang="scss" scoped>
  .spinner{
    display: flex;
    justify-content: center;
    align-items: center;
    * {
      line-height: 0;
      box-sizing: border-box;
    }
  }
  .spinner-inner
  {
    width: 120px;
    height: 120px;
  }
  @keyframes circle-9-loading {
    0% {
      transform: rotate(0deg);
    }
    25%{
      transform: rotate(160deg);
    }
    50%{
      transform: rotate(0deg);
    }
    75%{
      transform: rotate(160deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
  .loading {
    background-color: transparent;
    border-radius: 50%;
    margin: 5px auto;
    animation: circle-9-loading 5s infinite linear;
  }
  .spin-1{
    border: 5px solid #ddd ;
    border-top: 5px solid transparent;
    border-left: 5px solid transparent;
    width: 120px;
    height: 120px;
  }
  .spin-2{
    border: 5px solid #ddd ;
    border-top: 5px solid transparent;
    border-left: 5px solid transparent;
    width: 100px;
    height: 100px;
    animation-delay: 1s;
  }
  .spin-3{
    border: 5px solid #ddd ;
    border-top: 5px solid transparent;
    border-left: 5px solid transparent;
    width: 80px;
    height: 80px;
    animation-delay: 1s;
  }
  .spin-4{
    border: 5px solid #ddd ;
    border-top: 5px solid transparent;
    border-left: 5px solid transparent;
    width: 60px;
    height: 60px;
    animation-delay: 1s;
  }
  .spin-5{
    border: 5px solid #ddd ;
    border-top: 5px solid transparent;
    border-left: 5px solid transparent;
    width: 40px;
    height: 40px;
    animation-delay: 1s;
  }
  .spin-6{
    border: 5px solid #ddd ;
    width: 20px;
    height: 20px;
    animation-delay: 1s;
  }
</style>
