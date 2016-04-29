window.c.AdminContributionDetail = (function(m, _, c, h) {
    return {
        controller: function(args) {
            let l;
            const loadReward = () => {
                const model = c.models.rewardDetail,
                    reward_id = args.item.reward_id,
                    opts = model.getRowOptions(h.idVM.id(reward_id).parameters()),
                    reward = m.prop({});
                l = m.postgrest.loaderWithToken(opts);
                if (reward_id) {
                    l.load().then(_.compose(reward, _.first));
                }
                return reward;
            };
            const reward = loadReward();
            return {
                reward: reward,
                actions: {
                    transfer: {
                        property: 'user_id',
                        updateKey: 'id',
                        callToAction: 'Transfer',
                        innerLabel: 'New supporter Id:',
                        outerLabel: 'Transfer support ',
                        placeholder: 'example: 129908',
                        successMessage: 'Contribution was removed successfully!',
                        errorMessage: 'Contribution was not removed successfully!',
                        model: c.models.contributionDetail
                    },
                    reward: {
                        getKey: 'project_id',
                        updateKey: 'contribution_id',
                        selectKey: 'reward_id',
                        radios: 'rewards',
                        callToAction: 'Change Reward',
                        outerLabel: 'Reward',
                        getModel: c.models.rewardDetail,
                        updateModel: c.models.contributionDetail,
                        selectedItem: reward,
                        validate: (rewards, newRewardID) => {
                            let reward = _.findWhere(rewards, {id: newRewardID});
                            return (args.item.value >= reward.minimum_value) ? undefined : 'Reward value is smaller than the contribution value.';
                        }
                    },
                    refund: {
                        updateKey: 'id',
                        callToAction: 'Direct Refund',
                        innerLabel: 'Are you sure you want to refund this contribution?',
                        outerLabel: 'Refund contribution',
                        model: c.models.contributionDetail
                    },
                    remove: {
                        property: 'state',
                        updateKey: 'id',
                        callToAction: 'Delete',
                        innerLabel: 'Are you sure you want to remove this contribution?',
                        outerLabel: 'Remove contribution',
                        forceValue: 'deleted',
                        successMessage: 'Contribution was removed successfully!',
                        errorMessage: 'Contribution was not removed successfully!',
                        model: c.models.contributionDetail
                    }
                },
                l: l
            };
        },

        view: function(ctrl, args) {
            var actions = ctrl.actions,
                item = args.item,
                reward = ctrl.reward;

            const addOptions = (builder, id) => {
                return _.extend({}, builder, {
                    requestOptions: {
                        url: (`/admin/contributions/${id}/gateway_refund`),
                        method: 'PUT'
                    }
                });
            };

            return m('#admin-contribution-detail-box', [
                m('.divider.u-margintop-20.u-marginbottom-20'),
                m('.w-row.u-marginbottom-30', [
                    m.component(c.AdminInputAction, {
                        data: actions.transfer,
                        item: item
                    }),
                    (ctrl.l()) ? h.loader :
                    m.component(c.AdminRadioAction, {
                        data: actions.reward,
                        item: reward,
                        getKeyValue: item.project_id,
                        updateKeyValue: item.contribution_id
                    }),
                    m.component(c.AdminExternalAction, {
                        data: addOptions(actions.refund, item.id),
                        item: item
                    }),
                    m.component(c.AdminInputAction, {
                        data: actions.remove,
                        item: item
                    })
                ]),
                m('.w-row.card.card-terciary.u-radius', [
                    m.component(c.AdminTransaction, {
                        contribution: item
                    }),
                    m.component(c.AdminTransactionHistory, {
                        contribution: item
                    }),
                    (ctrl.l()) ? h.loader :
                    m.component(c.AdminReward, {
                        reward: reward,
                        key: item.key
                    })
                ])
            ]);
        }
    };
}(window.m, window._, window.c, window.c.h));
