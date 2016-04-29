window.c.root.Publish = ((m, c, h, models, _, I18n) => {
    const I18nScope = _.partial(h.i18nScope, 'projects.publish');

    return {
        controller: (args) => {
            let filtersVM = m.postgrest.filtersVM({
                    project_id: 'eq'
                }),
                publishVM = c.PublishVM,
                projectAccount = m.prop([]),
                projectDetails = m.prop([]),
                acceptTerm = m.prop([true,true,true,true,true,true,true,true,true]),
                flexAcceptTerm = m.prop([true,true,true,true,true,true,true,true,true]),
                showNextTerm = (index, acceptTerms) => {
                    var terms = acceptTerms();
                    if (terms[index]) {
                        terms[index] = false;
                        acceptTerms(terms);
                        var nextTerm = document.getElementsByClassName('w-hidden publish-rules');
                        if (nextTerm[0] !== undefined) {
                            nextTerm[0].classList.remove('w-hidden');
                        }
                    }
                    //show publish button after accepting all rules
                    if (index === terms.length - 1){
                        document.getElementsByClassName('publish-btn-section')[0].classList.remove('w-hidden');
                    }
                },
                loader = m.postgrest.loaderWithToken;

            filtersVM.project_id(args.root.getAttribute('data-id'));

            const l = loader(models.projectDetail.getRowOptions(filtersVM.parameters())),
                accountL = loader(models.projectAccount.getRowOptions(filtersVM.parameters()));
            l.load().then(projectDetails);
            accountL.load().then(projectAccount);

            return {
                l: l,
                accountL: accountL,
                filtersVM: filtersVM,
                acceptTerm: acceptTerm,
                flexAcceptTerm: flexAcceptTerm,
                showNextTerm: showNextTerm,
                projectAccount: projectAccount,
                projectDetails: projectDetails
            };
        },

        view: function(ctrl, args) {
            const project = _.first(ctrl.projectDetails()),
              account = _.first(ctrl.projectAccount()),
              flexTerms = (project) => {
                  return [
                      m('.w-col.w-col-11', [
                        m('div', [
                            m('span.fontsize-smallest.fontcolor-secondary', '1/9'),
                            ' ',
                          m('span.fontweight-semibold', 'Rules of the FLEX modality')
                        ]),
                        m('div', 'You chose the flexible campaign. This way, you will receive the funds raised from the supporters at the end of the period of the campaign (discounting the Startio fee) and must comply with the project execution and delivery of rewards offered regardless of how much you raised.')
                      ]),
                      m('.w-col.w-col-11', [
                        m('div', [
                            m('span.fontsize-smallest.fontcolor-secondary', '2/9'),
                            ' ',
                          m('span.fontweight-semibold', 'Target goal')
                        ]),
                        m('div', 'The project goal cannot be changed after the project is published.')
                      ]),
                      m('.w-col.w-col-11', [
                        m('div', [
                            m('span.fontsize-smallest.fontcolor-secondary', '3/9'),
                            ' ',
                          m('span.fontweight-semibold', 'Fees')
                        ]),
                        m('div', [
                          'After the end of the campaign we charge 13% ',
                          m('span.fontweight-semibold', 'of the value raised.')
                        ])
                      ]),
                      m('.w-col.w-col-11', [
                        m('div', [
                            m('span.fontsize-smallest.fontcolor-secondary', '4/9'),
                            ' ',
                          m('span.fontweight-semibold', 'Campaign deadline')
                        ]),
                        m('div', 'Your campaign may be online for up to 12 months. During this period you should set a deadline to end the campaign so that you can receive the funds raised. Once set, the closing date can not be changed.')
                      ]),
                      m('.w-col.w-col-11', [
                        m('div', [
                            m('span.fontsize-smallest.fontcolor-secondary', '5/9'),
                            ' ',
                          m('span.fontweight-semibold', 'Transfer deadline')
                        ]),
                        m('div', 'After you campaign has ended and you confirm you bank details, Startio will make the money transfer directly to your bank account in less than 10 business days. Startio will take its 13% fee before depositing your funding.')
                      ]),
                      m('.w-col.w-col-11', [
                        m('div', [
                            m('span.fontsize-smallest.fontcolor-secondary', '6/9'),
                            ' ',
                          m('span.fontweight-semibold', 'What you can and can not change in the project page after publication?')
                        ]),
                      [m('div', [m('span.fontweight-semibold', 'You cannot:'),' change the name of the project, the URL (link) of the project, its categorie, a meta de arrecadação, o prazo escolhido e as recompensas onde existirem apoios já efetuados.\ '                          ,m('br'),m('br'),m('span.fontweight-semibold', 'You can: '),'edit the description of the project, change the primary campaign video, the image of the project, the rewards where there are no contribution made, and add new rewards for the collection.'])]
                      ]),
                      m('.w-col.w-col-11', [
                        m('div', [
                            m('span.fontsize-smallest.fontcolor-secondary', '7/9'),
                            ' ',
                          m('span.fontweight-semibold', 'Startio is responsible for:')
                        ]),
                      [m('div', [m('span.fontweight-semibold'),m('span.fontweight-semibold', 'Startio is responsible for'),' developing the platform, questions of care and problems (for supporters and producers), hosting the project on the platform and ensure the security of financial transactions.\ ',m('br'),m('br'),m('span.fontweight-semibold', 'Startio is not responsible for'),' for funding, disclosure and enforcement or the delivery of rewards of the projects submitted.'])]
                      ]),
                      m('.w-col.w-col-11', [
                        m('div', [
                            m('span.fontsize-smallest.fontcolor-secondary', '8/9'),
                            ' ',
                          m('span.fontweight-semibold', 'Your responsabilities')
                        ]),
                        m('div', [m('span.fontweight-semibold'),m('span.fontweight-semibold'),'It is your responsibility the format of the project, the planning and dissemination of the fundraising campaign, as well as mobilizing supporters, the project execution, the production and delivery of rewards within the estimated time and the communication with supporters.'])
                      ]),
                      m('.w-col.w-col-11', [
                        m('div', [
                          m('span.fontsize-smallest.fontcolor-secondary', '9/9'),
                          ' ',
                          m('span', {style: {'font-weight': ' 600'}}, 'Removal of published projects')
                        ]),
                        m('div', [m('span.fontweight-semibold'),'Startio reserves the right, at its sole discretion and once notified of, cancel projects and close PROJECT CREATORS accounts that violate our ',m('a.alt-link[href=\'http://suporte.catarse.me/hc/pt-br/articles/202387638-Diretrizes-para-cria%C3%A7%C3%A3o-de-projetos\'][target=\'_blank\']', 'Terms of service'),' and ',m('a.alt-link[href=\'http://www.catarse.me/terms-of-use\'][target=\'_blank\']', 'Terms of Use'),'.'])
                      ])

              ];
              },

              terms = (project) => {
                  return [m('.w-col.w-col-11', [
                          m('div', [
                            m('span.fontsize-smallest.fontcolor-secondary', '1/9'),
                            ' ',
                            m('span.fontweight-semibold', 'All-or-nothin campaign rules: ')
                          ]),
                          m('div', ['You have chosen the  all-or-nothing campaign. This way, you will only receive the funds raised',m('span.fontweight-semibold', 'in case you reach your target goal'),'. Otherwise, all your supporters will be refunded. You will be responsible for delivering the offered rewards if your project reach the collection target.'])
                        ]),

                        m('.w-col.w-col-11', [
                          m('div', [
                            m('span.fontsize-smallest.fontcolor-secondary', '2/9'),
                            ' ',
                            m('span', {style: {'font-weight': ' 600'}}, 'Target Goal')
                          ]),
                          m('div', 'The goal can not be changed after the publication of the project.'),

                        ]),

                        m('.w-col.w-col-11', [
                          m('div', [
                            m('span.fontsize-smallest.fontcolor-secondary', '3/9'),
                            ' ',
                            m('span', {style: {'font-weight': ' 600'}}, 'Taxas')
                          ]),
                          m('div', [
                            'We charge a 13% fee over  ',
                            m('span.fontweight-semibold', 'the total amount raised'),
                            ' by your project if it reaches or exceeds the target within the campaign. If the project does not reach the goal, no fee will be charged.',
                            m('span.fontweight-semibold')
                          ])
                        ]),

                        m('.w-col.w-col-11', [
                          m('div', [
                            m('span.fontsize-smallest.fontcolor-secondary', '4/9'),
                            ' ',
                            m('span', {style: {'font-weight': ' 600'}}, 'Campaign deadline')
                          ]),
                          m('div', `Your project will be raising funds until: ${h.momentify(project.zone_expires_at)} at 11:59:59PM. You can't change the deadline of this project after it was published.`)
                        ]),

                        m('.w-col.w-col-11', [
                          m('div', [
                            m('span.fontsize-smallest.fontcolor-secondary', '5/9'),
                            ' ',
                            m('span', {style: {'font-weight': ' 600'}}, 'Transfer and refund rules')
                          ]),
                          m('div', ['After finishing your project and confirming your bank details, Startio will deposit the amount raised, already with the discount rate in your checking account within 10 business days. If the project does not reach 100% of the target within the deadline, the Startio will refund supporters. ',m('a.alt-link[href=\'http://suporte.catarse.me/hc/pt-br/articles/202365507\'][target=\'_blank\']', 'Find out more about the refund process'),'.'])
                        ]),

                        m('.w-col.w-col-11', [
                          m('div', [
                            m('span.fontsize-smallest.fontcolor-secondary', '6/9'),
                            ' ',
                            m('span', {style: {'font-weight': ' 600'}}, 'What you can and can not change in the project page after publication?')
                          ]),
                        [m('div', [m('span.fontweight-semibold', 'You cannot: '),' change the name of the project, the URL (link) of the project, its categorie, a meta de arrecadação, o prazo escolhido e as recompensas onde existirem apoios já efetuados.\ ',m('br'),m('br'),m('span.fontweight-semibold', 'You can: '),'edit the description of the project, change the primary campaign video, the image of the project, the rewards where there are no contribution made, and add new rewards for the collection.'])]]),

                        m('.w-col.w-col-11', [
                          m('div', [
                            m('span.fontsize-smallest.fontcolor-secondary', '7/9'),
                            ' ',
                            m('span', {style: {'font-weight': ' 600'}}, 'Startio is responsible for:')
                          ]),
                        [m('div', [m('span.fontweight-semibold'),m('span.fontweight-semibold', 'Startio is responsible for'),' developing the platform, questions of care and problems (for supporters and producers), hosting the project on the platform and ensure the security of financial transactions.\ ',m('br'),m('br'),m('span.fontweight-semibold', 'Startio is not responsible for'),' for funding, disclosure and enforcement or the delivery of rewards of the projects submitted.'])]]),

                        m('.w-col.w-col-11', [
                          m('div', [
                            m('span.fontsize-smallest.fontcolor-secondary', '8/9'),
                            ' ',
                            m('span', {style: {'font-weight': ' 600'}}, 'Your responsabilities')
                          ]),
                          m('div', [m('span.fontweight-semibold'),m('span.fontweight-semibold'),'It is your responsibility the format of the project, the planning and dissemination of the fundraising campaign, as well as mobilizing supporters, the project execution, the production and delivery of rewards within the estimated time and the communication with supporters.'])
                        ]),

                        m('.w-col.w-col-11', [
                          m('div', [
                            m('span.fontsize-smallest.fontcolor-secondary', '9/9'),
                            ' ',
                            m('span', {style: {'font-weight': ' 600'}}, 'Removal of published projects')
                          ]),
                          m('div', [m('span.fontweight-semibold'),'Startio reserves the right, at its sole discretion and once notified of, cancel projects and close PROJECT CREATORS accounts that violate our ',m('a.alt-link[href=\'http://suporte.catarse.me/hc/pt-br/articles/202387638-Diretrizes-para-cria%C3%A7%C3%A3o-de-projetos\'][target=\'_blank\']', 'Terms of service'),' and ',m('a.alt-link[href=\'http://www.catarse.me/terms-of-use\'][target=\'_blank\']', 'Terms of Use'),'.'])
                        ])

                  ];
              };

            return [!ctrl.l() ? [
            (project.is_owner_or_admin ? m.component(c.ProjectDashboardMenu, {
                project: m.prop(project),
                hidePublish: true
            }) : ''),
            m(`.w-section.section-product.${project.mode}`),
            m('.w-section.section', [
              m('.w-container', [
                m('.w-row', [
                  m('.w-col.w-col-3'),
                  m('.w-col.w-col-6', [
                    m('.u-text-center', [
                      m('img.u-marginbottom-20[src=\'/assets/catarse_bootstrap/launch-icon.png\'][width=\'94\']'),
                      m('.fontsize-large.fontweight-semibold.u-marginbottom-20', 'Ready to start you campaign?'),
                      m('.fontsize-base.u-marginbottom-30', 'We prepared a list with information for you to double check before publishing your project online!')
                    ])
                  ]),
                  m('.w-col.w-col-3')
                ])
              ])
            ]),
            m('.divider'),
            m('.w-section.section-one-column.bg-gray.section.before-footer', [
              m('.w-container', [
                m('.card.medium.u-marginbottom-60.card-terciary', [
                  m('.w-row', [
                    m('.w-col.w-col-6.w-clearfix', [
                      m('img.card-project-thumb.u-right[src=' + project.large_image + ']')
                    ]),
                    m('.w-col.w-col-6', [
                      m('.u-marginbottom-30.fontsize-base', [
                        m('div', [m('span.fontweight-semibold', 'Title: '), project.name]),
                        m('div', [m('span.fontweight-semibold', 'Link: '),`www.startio-staging.com/${project.permalink}`]),
                        m('div', [m('span.fontweight-semibold', 'Funding modality:'), I18n.t(project.mode, I18nScope())]),
                        m('div', [m('span.fontweight-semibold', 'Target goal: '),`$ ${h.formatNumber(project.goal, 2, 3)}`]),
                        (project.mode !== 'flex') ? m('div', [m('span.fontweight-semibold', `Deadline: ${project.online_days} days`)]) : '',
                        m('div', [m('span.fontweight-semibold', 'Owner: '), project.user.name]),
                        m('div', [m('span.fontweight-semibold', 'SIN/Incorporation Number: '), ctrl.accountL() ? 'loading information...' : account.owner_document])
                      ])
                    ])
                  ]),
                  m('.u-text-center', [
                    m('.w-row', [
                      m('.w-col.w-col-1'),
                      m('.w-col.w-col-10', [
                        m('.divider.u-marginbottom-10'),
                        m('.fontsize-small.fontcolor-secondary', 'The above data can not be changed after the project goes live. If you need to make changes, navigate using the sidebar and come back when you are done!')
                      ]),
                      m('.w-col.w-col-1')
                    ])
                  ])
                ]),
                m('.card.medium.u-radius.u-marginbottom-60', [
                  m('.u-text-center.u-marginbottom-60', [
                    m('.fontsize-large.fontweight-semibold', 'Remember the rules'),
                    m('.w-row', [
                      m('.w-col.w-col-2'),
                      m('.w-col.w-col-8', [
                        m('.fontsize-small', ['Before you post, click on the circles below and confirm that you are aware of how the Startio. Any doubt, ',m('a.alt-link[href=\'https://equipecatarse.zendesk.com/account/dropboxes/20298537\'][target=\'_blank\']', 'contact us'),'!'])
                      ]),
                      m('.w-col.w-col-2')
                    ])
                  ]),

                  _.map(project.mode == 'flex' ? flexTerms(project) : terms(project), (term, index) => {
                      return m(`.u-marginbottom-30.fontsize-base${index == 0 ? '' : '.w-hidden.publish-rules'}`, [
                        m(`.w-row[id='rule-${index}']`, [
                          m('.w-col.w-col-1.u-text-center', [
                            m('div', [
                              m((project.mode == 'flex' ? ctrl.flexAcceptTerm() : ctrl.acceptTerm())[index] ? `a.w-inline-block.checkbox-big[href='#rule-${index + 1}']` : `a.w-inline-block.checkbox-big.checkbox--selected.fa.fa-check.fa-lg[href='#rule-${index + 1}']`, {onclick: () => ctrl.showNextTerm(index, (project.mode == 'flex' ? ctrl.flexAcceptTerm : ctrl.acceptTerm))})
                            ])
                          ]),
                          term
                        ])
                    ]);
                  })

                ]),
                m('.w-row.publish-btn-section.w-hidden', [
                  m('.w-col.w-col-4'),
                  m('.w-col.w-col-4', [
                    m(`a.btn.btn-large.u-marginbottom-20[href=/${project.mode == 'flex' ? 'flexible_projects' : 'projects'}/${project.mode == 'flex' ? project.flex_id : project.id}/push_to_online]`, 'Publish now!'),
                    m('.u-text-center.fontsize-smaller', [
                      'When you publish your project, you are accepting the ',
                      m('a.alt-link[href=\'/terms-of-use\'][target=\'_blank\']', 'Terms of  Use'),
                      ', ',
                      project.mode == 'flex' ?
                        m('a.alt-link[href=\'http://suporte.catarse.me/hc/pt-br/articles/206574833-Regras-para-a-fase-de-testes-do-Catarse-Flex\'][target=\'_blank\']', 'Flex rules') : '',
                      ' e ',
                      m('a.alt-link[href=\'/privacy-policy\'][target=\'_blank\']', 'Privacy policy')
                    ])
                  ]),
                  m('.w-col.w-col-4')
                ])
              ])
            ]),
            '\ '
          ] : h.loader()];
        }
    };
}(window.m, window.c, window.c.h, window.c.models, window._, window.I18n));
