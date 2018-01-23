<script>
    export default {
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