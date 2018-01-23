import VueRouter from 'vue-router';

let routes = [

    {
        path: '/',
        component:  require('./components/Abouts')

    },
    {
        path: '/issues',
        component:  require('./components/Issue')

    },
    {
        path: '/authors',
        component:  require('./components/Personography')

    }

];


export default new VueRouter ({
    routes
});