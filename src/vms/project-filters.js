window.c.vms.projectFilters = ((m, h, moment) => {
    return () =>{
        const filters = m.postgrest.filtersVM,

              nearMe = filters({
                  near_me: 'eq',
                  open_for_contributions: 'eq'
              }).open_for_contributions('true').near_me(true),

              expiring = filters({
                  expires_at: 'lte',
                  open_for_contributions: 'eq'
              }).open_for_contributions('true').expires_at(moment().add(14, 'days').format('YYYY-MM-DD')),

              recent = filters({
                  online_date: 'gte',
                  open_for_contributions: 'eq'
              }).open_for_contributions('true').online_date(moment().subtract(5, 'days').format('YYYY-MM-DD')),

              recommended = filters({
                  recommended: 'eq',
                  open_for_contributions: 'eq'
              }).recommended('true').open_for_contributions('true'),

              online = filters({
                  open_for_contributions: 'eq'
              }).open_for_contributions('true'),

              successful = filters({
                  state: 'eq'
              }).state('successful');

        return {
            recommended: {
                title: 'Recommended',
                filter: recommended
            },
            online: {
                title: 'Online',
                filter: online
            },
            expiring: {
                title: 'Expiring',
                filter: expiring
            },
            successful: {
                title: 'Successful',
                filter: successful
            },
            recent: {
                title: 'Recent',
                filter: recent
            },
            near_me: {
                title: 'Near Me',
                filter: nearMe
            }
        };
    };
}(window.m, window.c.h, window.moment));
