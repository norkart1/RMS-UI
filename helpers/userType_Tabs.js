export default [
  {
    id: 1,
    name: 'Admin',
    path: '/admin',
    tabs: [
      {
        id: 1,
        name: 'Dashboard',
        icon: '/assets/png/dashboard.png',
        link: '/admin/dashboard',
        isVisible: true,
      },
      {
        id: 2,
        name: 'Institutes',
        icon: '/assets/png/institutes.png',
        link: '/admin/institute',
        isVisible: true,
        // children: [
        //   {
        //     id: 1,
        //     name: 'Institutes',
        //     link: '/admin/institute',
        //     isVisible: true,
        //   },
        // ]
      },
      {
        id: 3,
        name: 'Coordinators',
        icon: '/assets/png/coordinator.png',
        link: '/admin/institute/coordinators',
        isVisible: true,
      },
      {
        id: 4,
        name: 'Candidates',
        icon: '/assets/png/candidates.png',
        link: '/admin/institute/candidates',
        isVisible: true,
      },
      {
        id: 5,
        name: 'Programs',
        icon: '/assets/png/programs.png',
        link: '/admin/programs',
        isVisible: true,
        children: [
          {
            id: 1,
            name: 'Programs',
            link: '/admin/programs',
            isVisible: true,
          },
          {
            id: 2,
            name: 'Categories',
            link: '/admin/programs/categories',
            isVisible: true,
          },


        ]
      },
      {
        id: 6,
        name: 'Scoreboard',
        icon: '/assets/png/scoreboard.png',
        link: '/admin/scoreboard',
        isVisible: false,
      },
      {
        id: 7,
        name: 'Utilities',
        icon: '/assets/png/utilities.png',
        link: '/admin/utilities',
        isVisible: false,
      },
      {
        id: 8,
        name: 'Controllers',
        icon: '/assets/png/controllers.png',
        link: '/admin/controller',
        isVisible: false,
      },
      {
        id: 9,
        name: 'Settings',
        icon: '/assets/png/settings.png',
        link: '/admin/settings',
        isVisible: false,
      },
      {
        id: 10,
        name: 'search',
        icon: '/assets/png/search.png',
        link: '/admin/search',
        isVisible: true,
      },

    ]
  },
  {
    id: 2,
    name: 'Institute',
    path: '/portal',
    tabs: [
      {
        id: 1,
        name: 'Dashboard',
        icon: '/assets/png/dashboard.png',
        link: '/portal/dashboard',
        isVisible: false,
      },
      {
        id: 2,
        name: 'Candidates',
        icon: '/assets/png/candidates.png',
        link: '/portal/candidates',
        isVisible: true,
      },
      //   children: [
      //     {
      //       id: 1,
      //       name: 'Manage candidates',
      //       link: '/portal/candidates',
      //       isVisible: true,
      //     },

      //   ]
      // },
      {
        id: 3,
        name: 'Programs',
        icon: '/assets/png/programs.png',
        link: '/portal/programs',
        isVisible: true,
        children: [

          {
            id: 1,
            name: 'Register programs',
            link: '/portal/programs/program_registration',
            isVisible: true,
          },
          {
            id: 2,
            name: 'Registered programs',
            link: '/portal/programs/registered_programs',
            isVisible: true,
          },

        ]
      },
      {
        id: 4,
        name: 'Scoreboard',
        icon: '/assets/png/scoreboard.png',
        link: '/portal/scoreboard',
        isVisible: false,
      },
      {
        id: 4,
        name: 'Settings',
        icon: '/assets/png/settings.png',
        link: '/portal/settings',
        isVisible: false,
      },
    ]
  }]