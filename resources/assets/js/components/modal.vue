<script>
  import VueScrollbar from './vue-scrollbar.vue';   
  import drawer from './drawer'
  export default {
    components: { drawer, VueScrollbar },
    data() {
        return {
            authorShipLegend: `Author will have 2-3 a`,
            bibl_data: {},
            ppm: {},
            biblId: 's1',
            showModal: false,        
            issueHeaderData: {}
        }
    },
    props: ['authorId', 'issueId', 'declsId'],
  }
</script>
<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
            </slot>
          </div>

          <div class="modal-body">
            <vue-scrollbar classes="modal-scrollbar" ref="Scrollbar">
              <slot name="body">
              </slot>
              <drawer  :authorId="this.authorId" :declsId="this.biblId" :issueId="this.issueId"></drawer>
            </vue-scrollbar>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="$emit('close')">
                Close
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>