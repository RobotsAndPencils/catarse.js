window.c.AdminReward = (function(m, c, h, _) {
    return {
        view: (ctrl, args) => {
            const reward = args.reward(),
                available = parseInt(reward.paid_count) + parseInt(reward.waiting_payment_count);

            return m('.w-col.w-col-4', [
                m('.fontweight-semibold.fontsize-smaller.lineheight-tighter.u-marginbottom-20', 'Reward'),
                m('.fontsize-smallest.lineheight-looser', reward.id ? [
                    'ID: ' + reward.id,
                    m('br'),
                    'Minimum value: $' + h.formatNumber(reward.minimum_value, 2, 3),
                    m('br'),
                    m.trust('Available: ' + available + ' / ' + (reward.maximum_contributions || '&infin;')),
                    m('br'),
                    'Awaiting confirmation: ' + reward.waiting_payment_count,
                    m('br'),
                    'Decription: ' + reward.description
                ] : 'Contribution has no reward')
            ]);
        }
    };
}(window.m, window.c, window.c.h, window._));
