window.c.AdminTransactionHistory = (function(m, h, _) {
    return {
        controller: function(args) {
            var contribution = args.contribution,
                mapEvents = _.reduce([{
                    date: contribution.paid_at,
                    name: 'Contribution confirmed'
                }, {
                    date: contribution.pending_refund_at,
                    name: 'Refund requested'
                }, {
                    date: contribution.refunded_at,
                    name: 'Refund confirmed'
                }, {
                    date: contribution.created_at,
                    name: 'Contribution created'
                }, {
                    date: contribution.refused_at,
                    name: 'Contribution canceled'
                }, {
                    date: contribution.deleted_at,
                    name: 'Contribution deleted'
                }, {
                    date: contribution.chargeback_at,
                    name: 'Chargeback'
                }], function(memo, item) {
                    if (item.date !== null && item.date !== undefined) {
                        item.originalDate = item.date;
                        item.date = h.momentify(item.date, 'DD/MM/YYYY, HH:mm');
                        return memo.concat(item);
                    }

                    return memo;
                }, []);

            return {
                orderedEvents: _.sortBy(mapEvents, 'originalDate')
            };
        },

        view: function(ctrl) {
            return m('.w-col.w-col-4', [
                m('.fontweight-semibold.fontsize-smaller.lineheight-tighter.u-marginbottom-20', 'Transaction history'),
                ctrl.orderedEvents.map(function(cEvent) {
                    return m('.w-row.fontsize-smallest.lineheight-looser.date-event', [
                        m('.w-col.w-col-6', [
                            m('.fontcolor-secondary', cEvent.date)
                        ]),
                        m('.w-col.w-col-6', [
                            m('div', cEvent.name)
                        ])
                    ]);
                })
            ]);
        }
    };
}(window.m, window.c.h, window._));
