/**
 * window.c.AdminUserDetail component
 * Return action inputs to be used inside AdminList component.
 *
 * Example:
 * m.component(c.AdminList, {
 *     data: {},
 *     listDetail: c.AdminUserDetail
 * })
 */
window.c.AdminUserDetail = (function(m, _, c){
    return {
        controller: function(){
            return {
                actions: {
                    reset: {
                        property: 'password',
                        callToAction: 'Change',
                        innerLabel: 'New Password:',
                        outerLabel: 'Change Password',
                        placeholder: 'ex: 123mud@r',
                        model: c.models.user
                    },
                    reactivate: {
                        property: 'deactivated_at',
                        updateKey: 'id',
                        callToAction: 'Reactivate',
                        innerLabel: 'Are you sure you want to reactivate this user?',
                        successMessage: 'User reactivation successfully!',
                        errorMessage: 'User cannot be reactivated!',
                        outerLabel: 'Reactivate user',
                        forceValue: null,
                        model: c.models.user
                    }
                }
            };
        },

        view: function(ctrl, args){
            var actions = ctrl.actions,
                item = args.item,
                details = args.details;

            const addOptions = (builder, id) => {
                return _.extend({}, builder, {
                    requestOptions: {
                        url: (`/users/${id}/new_password`),
                        method: 'POST'
                    }
                });
            };

            return m('#admin-contribution-detail-box', [
                m('.divider.u-margintop-20.u-marginbottom-20'),
                m('.w-row.u-marginbottom-30', [
                    m.component(c.AdminResetPassword, {
                        data: addOptions(actions.reset, item.id),
                        item: item
                    }),
                    (item.deactivated_at) ?
                        m.component(c.AdminInputAction, {data: actions.reactivate, item: item}) : ''
                ]),
                m('.w-row.card.card-terciary.u-radius', [
                    m.component(c.AdminNotificationHistory, {
                        user: item
                    }),
                ]),
            ]);
        }
    };
}(window.m, window._, window.c));
