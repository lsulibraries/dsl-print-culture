import VueRouter from 'vue-router';

let routes = [

    {
        path: '/',
        redirect: '/project',
    },
    {
        path: '/project',
        redirect: '/project/about',
        component:  require('./components/Abouts'),
        children: [
            
            {

                path: ':id',
                component:  require('./components/Abouts'),
            },

        ],
    },
    {
        path: '/issues',
        redirect: '/issues/18450104',
        component:  require('./components/Issue'),
        children: [

            {
                path: ':id/:biblid',
                component:  require('./components/Issue')

            },
            {
                path: ':id',
                component:  require('./components/Issue')

            }

        ]

    },
    {
        path: '/authors',
        component:  require('./components/Personography'),
        children: [

            {
                path: ':id',
                component:  require('./components/Personography')

            },

        ]

    }

];


export default new VueRouter ({
    routes
});