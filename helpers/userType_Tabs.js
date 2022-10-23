const iconUrl = '/assets/png/dashboard.png'

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
          link: '/admin/institutes',
          isVisible: true,
          children: [
            {
              id: 1,
              name: 'Manage institutes',
              link: '/admin/institute/manage',
              isVisible: true,
            },
            {
              id: 2,
              name: 'Coordinators',
              link: '/admin/institute/coordinators',
              isVisible: true,
            },
            {
              id: 3,
              name: 'Candidates',
              link: '/admin/institute/candidates',
              isVisible: true,
            },
          ]
        },
        {
          id: 3,
          name: 'Programs',
          icon: '/assets/png/programs.png',
          link: '/admin/programs',
          isVisible: true,
          children: [
            {
              id: 1,
              name: 'Program registration',
              link: '/admin/institute/Coordinators',
              isVisible: true,
            },
            {
              id: 2,
              name: 'Candidates',
              link: '/admin/institute/candidates',
              isVisible: true,
            },
          ]
        },
        {
          id: 4,
          name: 'Scoreboard',
          icon: '/assets/png/scoreboard.png',
          link: '/admin/scoreboard',
          isVisible: true,
        },
        {
          id: 5,
          name: 'Utilities',
          icon: '/assets/png/utilities.png',
          link: '/admin/utilities',
          isVisible: true,
        },
        {
          id: 6,
          name: 'Controllers',
          icon: '/assets/png/controllers.png',
          link: '/admin/controller',
          isVisible: true,
        },
        {
          id: 7,
          name: 'Settings',
          icon: '/assets/png/settings.png',
          link: '/admin/settings',
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
          isVisible: true,
        },
        {
          id: 2,
          name: 'Candidates',
          icon: '/assets/png/candidates.png',
          link: '/portal/candidates',
          isVisible: true,
          children: [
            {
              id: 1,
              name: 'Manage candidates',
              link: '/portal/candidates',
              isVisible: true,
            },]
        },
        {
          id: 3,
          name: 'Settings',
          icon: '/assets/png/settings.png',
          link: '/portal/settings',
          isVisible: true,
        },
      ]
    }]