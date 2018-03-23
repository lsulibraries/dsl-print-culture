<template>
    <div class="content">
        <router-view></router-view>
    </div>
</template>

<script>
    import abouts from './Abouts'
    import issue from './Issue'

    export default {
        components: { abouts, issue },
    }
</script>