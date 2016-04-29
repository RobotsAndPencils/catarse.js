window.c.TeamTotal = (function(m, h, models) {
    return {
        controller: function() {
            var vm = {
                collection: m.prop([])
            };

            models.teamTotal.getRow().then(function(data) {
                vm.collection(data);
            });

            return {
                vm: vm
            };
        },

        view: function(ctrl) {
            return m('#team-total-static.w-section.section-one-column.section.u-margintop-40.u-text-center.u-marginbottom-20', [
                ctrl.vm.collection().map(function(teamTotal) {
                    return m('.w-container', [
                        m('.w-row', [
                            m('.w-col.w-col-2'),
                            m('.w-col.w-col-8', [
                                m('.fontsize-base.u-marginbottom-30',
                                    'We are ' + teamTotal.member_count + ' people from ' + teamTotal.total_cities + ' cities in ' + teamTotal.countries.length +
                                    ' countries (' + teamTotal.countries.toString() + ')! Our passion is to build an environment where more and more projects to come to life.'),
                                m('.fontsize-larger.lineheight-tight.text-success',
                                    'Our team, together, has provided $' + h.formatNumber(teamTotal.total_amount) + ' for ' + teamTotal.total_contributed_projects + ' projects!')
                            ]),
                            m('.w-col.w-col-2')
                        ])
                    ]);
                })
            ]);
        }
    };
}(window.m, window.c.h, window.c.models));
