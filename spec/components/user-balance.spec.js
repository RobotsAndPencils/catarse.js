describe('UserBalance', () => {
    let $output, component, parentComponent,
        UsersBalance = window.c.root.UsersBalance,
        UserBalance = window.c.UserBalance;

    beforeAll(() => {
        parentComponent = m.component(UsersBalance, {user_id: 1});
        component = m.component(UserBalance, _.extend({}, parentComponent.controller(), {user_id: 1}));
        $output = mq(component);
    });

    it('should call balances endpoint', () => {
        const lastRequest = jasmine.Ajax.requests.mostRecent();
        expect(lastRequest.url).toEqual(apiPrefix + '/balances?user_id=eq.1');
        expect(lastRequest.method).toEqual('GET');
    });

    it('should render user balance', () => {
        expect($output.contains('$ 205.00')).toEqual(true);
    });

    it('should render request fund btn', () => {
        $output.should.have('.r-fund-btn');
    });

    it('should call bank_account endpoint when click on request fund btn and show modal', () => {
        $output.click('.r-fund-btn');
        $output.should.have('.modal-dialog-inner');
        expect($output.contains('Bank XX')).toEqual(true);

        const lastRequest = jasmine.Ajax.requests.mostRecent();
        expect(lastRequest.url).toEqual(apiPrefix + '/bank_accounts?user_id=eq.1');
        expect(lastRequest.method).toEqual('GET');
    });
});
