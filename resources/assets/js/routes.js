import VueRouter from 'vue-router';

let routes = [

    // {
    //     path: '/',
    //     redirect: '/about',
    // },

    {
        path: '/issues',
        redirect: '/issues/18450104',
        component:  require('./components/Issue'),
        children: [

            {
                path: ':id',
                component:  require('./components/Issue')

            },
            {
                path: ':id/:biblid',
                component:  require('./components/Issue')

            },

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

    },

    {
        path: '/',
        // redirect: '/project/about',
        component:  require('./components/Abouts'),
        children: [

            {

                path: ':id',
                component:  require('./components/Abouts'),
            },

        ],
    },

];


export default new VueRouter ({
    routes
});
