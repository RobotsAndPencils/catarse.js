window.c.admin.Users = (function(m, c, h) {
    var admin = c.admin;
    return {
        controller: function() {
            var listVM = admin.userListVM,
                filterVM = admin.userFilterVM,
                error = m.prop(''),
                itemBuilder = [{
                    component: 'AdminUser',
                    wrapperClass: '.w-col.w-col-4'
                }],
                filterBuilder = [{ //name
                    component: 'FilterMain',
                    data: {
                        vm: filterVM.full_text_index,
                        placeholder: 'Search by name, email, user id ...',
                    },
                }, { //status
                    component: 'FilterDropdown',
                    data: {
                        label: 'With status',
                        index: 'status',
                        name: 'deactivated_at',
                        vm: filterVM.deactivated_at,
                        options: [{
                            value: '',
                            option: 'Any'
                        }, {
                            value: null,
                            option: 'active'
                        }, {
                            value: !null,
                            option: 'disabled'
                        }]
                    }
                }],
                submit = function() {
                    listVM.firstPage(filterVM.parameters()).then(null, function(serverError) {
                        error(serverError.message);
                    });
                    return false;
                };

            return {
                filterVM: filterVM,
                filterBuilder: filterBuilder,
                listVM: {
                    list: listVM,
                    error: error
                },
                submit: submit
            };
        },

        view: function(ctrl) {
            const label = 'Users';

            return [
                m.component(c.AdminFilter, {
                    form: ctrl.filterVM.formDescriber,
                    filterBuilder: ctrl.filterBuilder,
                    label: label,
                    submit: ctrl.submit
                }),
                m.component(c.AdminList, {
                    vm: ctrl.listVM,
                    label: label,
                    listItem: c.AdminUserItem,
                    listDetail: c.AdminUserDetail
                })
            ];
        }
    };
}(window.m, window.c, window.c.h));
