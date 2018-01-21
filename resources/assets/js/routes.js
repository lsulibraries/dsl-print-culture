import VueRouter from 'vue-router';

let routes = [

    {
        path: '/',
        component:  require('./components/Container')

    }

];


export default new VueRouter ({
    routes
});