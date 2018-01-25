<script>
    import indexChild from './indexChild'
    export default {
        components: {
            indexChild
        },
        data(){
            return {
                toggled: false,
                monthConvert: {'JAN':'01','FEB':'02','MAR':'03','APR':'04','MAY':'05','JUN':'06','JUL':'07','AUG':'08','SEP':'09','OCT':'10','NOV':'11','DEC':'12'},
            }
        },
        props: {month: '',  list: ''},
        created(){
            Event.$on('issueSelected',(id) =>{
                for(let each in this.$children){
                    if(this.$children[each].id==id){
                        this.$children[each].toggled=true;
                    }else{this.$children[each].toggled=false;}
                }
            })
        },
        methods: {
            showChildren: function(){
            if(this.toggled==false){
                //turn on this.$children
                for (let each in this.$children){
                this.$children[each].meSeen=true;
                this.toggled=true;
                }
                //turn off everyone else's children
                for(let one in this.$parent.$children){
                if (this.$parent.$children[one].list != this.list){
                    for(let two in this.$parent.$children[one].$children){
                    this.$parent.$children[one].$children[two].meSeen=false;
                    //remove activeMonth from everyone else
                    this.$parent.$children[one].toggled=false;
                    }                           }
                }
                }
                else{
                //turn off this.children
                for (let each in this.$children){
                        this.$children[each].meSeen=false;
                        this.toggled=false;
                        }
                }
            }
        },
    }
</script>
<template>
            <div v-bind:class="{activeMonth: toggled}">
              <div @click="showChildren()">
                <div class="singleText" >{{this.month}}</div>
                <div class="indicatorIndex"></div>
              </div>
              <index-child :id="each" v-for="each in this.list"></index-child>
            </div>
</template>