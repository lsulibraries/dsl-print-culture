<script>
    import personIndex from './personIndex'
    export default {
        components: { personIndex },
        data(){
            return {
                modalActive:false,
                personography:[],
                chosen: ''
            }
        }
    }
</script>
<template>
    <div class="personography">
        <div class="personographyAbout">Lorem ipsum</div>
        <personFilter></personFilter>
        <personIndex></personIndex>
    </div>
</template>