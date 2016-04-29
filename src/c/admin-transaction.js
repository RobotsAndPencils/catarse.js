window.c.AdminTransaction = (function(m, h) {
    return {
        view: function(ctrl, args) {
            var contribution = args.contribution;
            return m('.w-col.w-col-4', [
                m('.fontweight-semibold.fontsize-smaller.lineheight-tighter.u-marginbottom-20', 'Contribution details'),
                m('.fontsize-smallest.lineheight-looser', [
                    'Value: $' + h.formatNumber(contribution.value, 2, 3),
                    m('br'),
                    'Fee: $' + h.formatNumber(contribution.gateway_fee, 2, 3),
                    m('br'),
                    'Awaiting confirmation ' + (contribution.waiting_payment ? 'Yes' : 'No'),
                    m('br'),
                    'Anonymous: ' + (contribution.anonymous ? 'Yes' : 'No'),
                    m('br'),
                    'Payment Id : ' + contribution.gateway_id,
                    m('br'),
                    'Contrubutions: ' + contribution.contribution_id,
                    m('br'),
                    'Key: \n',
                    m('br'),
                    contribution.key,
                    m('br'),
                    'Gateway: ' + contribution.gateway,
                    m('br'),
                    'Operator: ' + (contribution.gateway_data && contribution.gateway_data.acquirer_name),
                    m('br'), (function() {
                        if (contribution.is_second_slip) {
                            return [m('a.link-hidden[href="#"]', 'Pay slip'), ' ', m('span.badge', '2a via')];
                        }
                    }()),
                ])
            ]);
        }
    };
}(window.m, window.c.h));
