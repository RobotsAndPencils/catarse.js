describe('ProjectRewardList', () => {
    let generateContextByNewState,
        ProjectRewardList = window.c.ProjectRewardList;

    describe('view', () => {
        beforeAll(() => {
            generateContextByNewState = (newState = {}) => {
                spyOn(m, 'component').and.callThrough();
                let rewardDetail = RewardDetailsMockery(newState),
                    component = m.component(ProjectRewardList, {
                        project: m.prop({
                            id: 1231
                        }),
                        rewardDetails: m.prop(rewardDetail)
                    });

                return {
                    output: mq(component.view()),
                    rewardDetail: rewardDetail[0]
                };
            };
        });

        it('should render card-gone when reward sould out', () => {
            let {
                output, rewardDetail
            } = generateContextByNewState({
                maximum_contributions: 4,
                paid_count: 4
            });

            expect(output.find('.card-gone').length).toEqual(1);
            expect(output.contains('Esgotada')).toEqual(true);
        });

        it('should render card-reward when reward is not sould out', () => {
            let {
                output, rewardDetail
            } = generateContextByNewState({
                maximum_contributions: null
            });

            expect(output.find('.card-reward').length).toEqual(1);
            expect(output.contains('Esgotada')).toEqual(false);
        });

        it('should render card-reward stats when reward is limited', () => {
            let {
                output, rewardDetail
            } = generateContextByNewState({
                maximum_contributions: 10,
                paid_count: 2,
                waiting_payment_count: 5
            });

            expect(output.find('.card-reward').length).toEqual(1);
            expect(output.contains('Limitada')).toEqual(true);
            expect(output.contains('(3 de 10 disponíveis)')).toEqual(true);
            expect(output.contains('2 apoios')).toEqual(true);
            expect(output.contains('5 apoios em prazo de confirmação')).toEqual(true);
        });

        it('should render card-reward details', () => {
            let {
                output, rewardDetail
            } = generateContextByNewState({
                minimum_value: 20
            });

            expect(output.find('.card-reward').length).toEqual(1);
            expect(output.contains('Para R$ 20 ou mais')).toEqual(true);
            expect(output.contains('Estimativa de Entrega:')).toEqual(true);
            expect(output.contains(window.c.h.momentify(rewardDetail.deliver_at, 'MMM/YYYY'))).toEqual(true)
            expect(output.contains(rewardDetail.description)).toEqual(true);
        });
    });
});