<template>
    <div class="network" v-if="this.isLoaded">
      <d3-network :net-nodes="nodes" :net-links="links" :options="options" />
    </div>
</template>
<script>
    import D3Network from 'vue-d3-network'
    export default {
        components: { D3Network },
        data() {
            return {
              nodesX: [
                { id: 1, name: 'my node 1' },
                { id: 2, name: 'my node 2' },
                { id: 3, _color:'orange' },
                { id: 4 },
                { id: 5 },
                { id: 6 },
                { id: 7 },
                { id: 8 },
                { id: 9 }
              ],
              links: [
                // { sid: 1, tid: 2, _color:'red' },
                // { sid: 2, tid: 8, _color:'f0f' },
                // { sid: 3, tid: 4,_color:'rebeccapurple' },
                // { sid: 4, tid: 5 },
                // { sid: 5, tid: 6 },
                // { sid: 7, tid: 8 },
                // { sid: 5, tid: 8 },
                // { sid: 3, tid: 8 },
                // { sid: 7, tid: 9 }
              ],
              options:
              {
                force: 3000,
                nodeSize: 20,
                nodeLabels: true,
                linkWidth:5
              }
            }
        },
        computed: {
            isLoaded: function () {
                return !this.$root.empty(this.$root.xhrDataStore.personography)
            },
            nodes: function () {
                if(!this.isLoaded) {
                    return {}
                }
                let nodes = []
                let contributors = {}
                let mentioned = {}
                let nodeIds = []
                let linksMap = []
                const p = this.$root.xhrDataStore.personography.personIndex

                for (let id in p) {
                    if (id == 'anon') {
                        continue
                    }
                    if (this.$root.empty(p[id].personListBibl)) {
                        continue
                    }
                    let bibls = p[id].personListBibl
                    for (const [key, value] of Object.entries(bibls)) {
                        if(value.personPieceMeta) {
                            let role = value.personPieceMeta.personPieceRole
                            if (!linksMap.hasOwnProperty(key)) {
                                linksMap[key] = { 
                                    links: {
                                        target: []    
                                    }
                                }
                            }
                            let color;
                            if (role == 'Contributor') {
                                linksMap[key].links.source = id
                                color = 'red'
                            }
                            else if (role == 'Mentioned') {
                                linksMap[key].links.target.push(id)
                                color = 'blue'
                            }
                            if(nodeIds.indexOf(id) == -1){
                                nodeIds.push(id)
                                nodes.push({
                                    id: id,
                                    name: id,
                                    _color: color
                                })
                            }
                        }
                    }
                }
                // nodeIds.forEach(
                //     function (item, index, array) {
                //         nodes.push({ id: item, name: item })
                //     });

                for (const [key, value] of Object.entries(linksMap)) {
                    if (value.links.source) {

                        for (let target of value.links.target) {
                            this.links.push({
                                sid: value.links.source,
                                tid: target,
                                _color: 'blue'
                            })
                        }
                    }
                }

                return nodes
            },
        },
        methods: {
        },
    }
</script>

<style src="vue-d3-network/dist/vue-d3-network.css"></style>