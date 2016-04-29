window.c.root.Flex = (function(m, c, h, models) {
    return {
        controller: function() {
            const stats = m.prop([]),
                projects = m.prop([]),
                l = m.prop(),
                sample3 = _.partial(_.sample, _, 3),
                builder = {
                    customAction: '//catarse.us5.list-manage.com/subscribe/post?u=ebfcd0d16dbb0001a0bea3639&amp;id=8a4c1a33ce'
                },
                addDisqus = (el, isInitialized) => {
                    if (!isInitialized) {
                        h.discuss('https://www.catarse-staging.com/en/flex', 'flex_page');
                    }
                },
                flexVM = m.postgrest.filtersVM({
                    mode: 'eq',
                    state: 'eq',
                    recommended: 'eq'
                }),
                statsLoader = m.postgrest.loaderWithToken(models.statistic.getRowOptions());

            flexVM.mode('flex').state('online').recommended(true);

            const projectsLoader = m.postgrest.loader(models.project.getPageOptions(flexVM.parameters()));

            statsLoader.load().then(stats);

            projectsLoader.load().then(_.compose(projects, sample3));

            return {
                addDisqus: addDisqus,
                builder: builder,
                statsLoader: statsLoader,
                stats: stats,
                projectsLoader: projectsLoader,
                projects: {
                    loader: projectsLoader,
                    collection: projects
                }
            };
        },
        view: function(ctrl, args) {
            let stats = _.first(ctrl.stats());
            return [
                m('.w-section.hero-full.hero-zelo', [
                    m('.w-container.u-text-center', [
                        m('img.logo-flex-home[src=\'/assets/logo-flex.png\'][width=\'359\']'),
                        m('.w-row', [
                            m('.w-col.fontsize-large.u-marginbottom-60.w-col-push-2.w-col-8', 'Let us build a new type of crowdfunding! Register your email and find out how enter your project in Startio Flex!')
                        ]),
                        m('.w-row', [
                            m('.w-col.w-col-2'),
                            m.component(c.landingSignup, {
                                builder: ctrl.builder
                            }),
                            m('.w-col.w-col-2')
                        ])
                    ])
                ]), [
                    m('.section', [
                        m('.w-container', [
                            m('.fontsize-largest.u-margintop-40.u-text-center', 'Who is the audience'), m('.fontsize-base.u-text-center.u-marginbottom-60', 'We begin the testing phase with specific projects categories'), m('div', [
                                m('.w-row.u-marginbottom-60', [
                                    m('.w-col.w-col-6', [
                                        m('.u-text-center.u-marginbottom-20', [
                                            m('img[src=\'https://daks2k3a4ib2z.cloudfront.net/54b440b85608e3f4389db387/560e393a01b66e250aca67cb_icon-zelo-com.png\'][width=\'210\']'), m('.fontsize-largest.lineheight-loose', 'Causes')
                                        ]), m('p.fontsize-base', 'Flexibility for important causes! We are open to people or organizations fundraising campaigns for personal reasons, welfare projects, health, humanitarian aid, protection of animals, environmental entrepreneurship, activism or anything that unites people to do good.')
                                    ]), m('.w-col.w-col-6', [
                                        m('.u-text-center.u-marginbottom-20', [
                                            m('img[src=\'https://daks2k3a4ib2z.cloudfront.net/54b440b85608e3f4389db387/560e3929a0daea230a5f12cd_icon-zelo-pessoal.png\'][width=\'210\']'), m('.fontsize-largest.lineheight-loose', 'Donations')
                                        ]), m('p.fontsize-base', 'Simple campaigns that need the flexibility to raise money from people close to them. We will be open to a variety of personal campaigns that can go from investigative cost studies to campaigns to help those in need of medical treatment.')
                                    ])
                                ])
                            ])
                        ])
                    ]), m('.w-section.section.bg-greenlime.fontcolor-negative', [
                        m('.w-container', [
                            m('.fontsize-largest.u-margintop-40.u-marginbottom-60.u-text-center', 'How does it work?'), m('.w-row.u-marginbottom-40', [
                                m('.w-col.w-col-6', [
                                    m('.u-text-center', [
                                        m('img[src=\'https://daks2k3a4ib2z.cloudfront.net/54b440b85608e3f4389db387/560e39c578b284493e2a428a_zelo-money.png\'][width=\'180\']')
                                    ]), m('.fontsize-large.u-marginbottom-10.u-text-center.fontweight-semibold', 'Keep what you collect'), m('p.u-text-center.fontsize-base', 'Flex was built to boost campaigns where all the money is welcome! You get everything you can raise.')
                                ]), m('.w-col.w-col-6', [
                                    m('.u-text-center', [
                                        m('img[src=\'https://daks2k3a4ib2z.cloudfront.net/54b440b85608e3f4389db387/560e39d37c013d4a3ee687d2_icon-reward.png\'][width=\'180\']')
                                    ]), m('.fontsize-large.u-marginbottom-10.u-text-center.fontweight-semibold', 'You do not need rewards'), m('p.u-text-center.fontsize-base', 'On Flex rewards are optional. You choose to offer if it makes sense for your project and campaign.')
                                ])
                            ]), m('.w-row.u-marginbottom-40', [
                                m('.w-col.w-col-6', [
                                    m('.u-text-center', [
                                        m('img[src=\'https://daks2k3a4ib2z.cloudfront.net/54b440b85608e3f4389db387/560e39fb01b66e250aca67e3_icon-curad.png\'][width=\'180\']')
                                    ]), m('.fontsize-large.u-marginbottom-10.u-text-center.fontweight-semibold', 'Publish your project yourself'), m('p.u-text-center.fontsize-base', 'All projects posted on Flex go online. It is easy to fund raise using the internet.')
                                ]), m('.w-col.w-col-6', [
                                    m('.u-text-center', [
                                        m('img[src=\'https://daks2k3a4ib2z.cloudfront.net/54b440b85608e3f4389db387/560e39e77c013d4a3ee687d4_icon-time.png\'][width=\'180\']')
                                    ]), m('.fontsize-large.u-marginbottom-10.u-text-center.fontweight-semibold', 'Finish the campaign whenever you want'), m('p.u-text-center.fontsize-base', 'Campaigns do not have a deadline. You choose when to end it and when to receive the funds.')
                                ])
                            ])
                        ])
                    ]),
                    m('.w-section.section', [
                        m('.w-container', [
                            m('.w-editable.fontsize-larger.u-margintop-40.u-margin-bottom-40.u-text-center', 'Read about some of the first Flex Projects'),
                            ctrl.projectsLoader() ? h.loader() : m.component(c.ProjectRow, {collection: ctrl.projects, ref: 'ctrse_flex', wrapper: '.w-row.u-margintop-40'})
                        ])
                    ]),
                    m('.w-section.divider'),
                    m('.w-section.section', [
                        m('.w-container', [
                            m('.fontsize-larger.u-text-center.u-marginbottom-60.u-margintop-40', 'Dúvidas'), m('.w-row.u-marginbottom-60', [
                                m('.w-col.w-col-6', [
                                    m.component(c.landingQA, {
                                        question: 'What are the fees for the Flex campaign? ',
                                        answer: 'Adding a project will not cost anything, but similarly to the "all or nothing" modality, Startio will keep a percentage of the funding.'
                                    }),
                                    m.component(c.landingQA, {
                                        question: 'Where does the money from my project come from?',
                                        answer: 'Family, friends, fans and community members that you are part of its major contributors. It is they who will disclose their campaign to the people they know, and so the circle of supporters is increasing and your campaign gains momentum.'
                                    }),
                                    m.component(c.landingQA, {
                                        question: 'What is the difference between the flexible and the "all or nothing" modalities?',
                                        answer: 'Currently we only use the "all or nothing" modality, where we only get funded if you reached your target goal before your deadline is reached. The Flex modality is different because it permit the project owner to receive funding despite the project not reaching the goal. There is not deadline. Startio Flex is an exciting new modality!'
                                    }),
                                ]), m('.w-col.w-col-6', [
                                    m.component(c.landingQA, {
                                        question: 'Can I already enroll my project as a Flex campaign?',
                                        answer: 'Yes! You can register your email here in this page to discover how to add your project to it.'
                                    }),
                                    m.component(c.landingQA, {
                                        question: 'Why do you want to make Startio Flex?',
                                        answer: 'We believe that the American crowdfunding environment still has lots of room for inovation, tests and trials to really understand what people need. We dream of making the collective funding a habit in the USA. Startio Flex is another step in that direction.'
                                    }),
                                    m.component(c.landingQA, {
                                        question: 'When is Startio Flex going to be available?',
                                        answer: 'We still do not know when we are going to open Flex for the public. You can register your email here in this page to discover how to add your project to it.'
                                    })
                                ])
                            ])
                        ])
                    ]),
                    m('.w-section.section-large.u-text-center.bg-purple', [
                        m('.w-container.fontcolor-negative', [
                            m('.fontsize-largest', 'Register your project!'), m('.fontsize-base.u-marginbottom-60', 'Register your email and find out how enter your project in Startio Flex!'), m('.w-row', [
                                m('.w-col.w-col-2'),
                                m.component(c.landingSignup, {
                                    builder: ctrl.builder
                                }),
                                m('.w-col.w-col-2')
                            ])
                        ])
                    ]), m('.w-section.section-one-column.bg-catarse-zelo.section-large[style="min-height: 50vh;"]', [
                        m('.w-container.u-text-center', [
                            m('.w-editable.u-marginbottom-40.fontsize-larger.lineheight-tight.fontcolor-negative', 'Startio Flex is an new crowdfunding experience!'),
                            m('.w-row.u-text-center', (ctrl.statsLoader()) ? h.loader() : [
                                m('.w-col.w-col-4', [
                                    m('.fontsize-jumbo.text-success.lineheight-loose', h.formatNumber(stats.total_contributors, 0, 3)), m('p.start-stats.fontsize-base.fontcolor-negative', 'People contributed to  at least 1 project on Startio')
                                ]),
                                m('.w-col.w-col-4', [
                                    m('.fontsize-jumbo.text-success.lineheight-loose', h.formatNumber(stats.total_projects_success, 0, 3)), m('p.start-stats.fontsize-base.fontcolor-negative', 'Project financed on Startio')
                                ]),
                                m('.w-col.w-col-4', [
                                    m('.fontsize-jumbo.text-success.lineheight-loose', stats.total_contributed.toString().slice(0, 2) + ' million'), m('p.start-stats.fontsize-base.fontcolor-negative', 'Were invested in ideas published on Startio')
                                ])
                            ])
                        ])
                    ]),
                    m('.w-section.section.bg-blue-one.fontcolor-negative', [
                        m('.w-container', [
                            m('.fontsize-large.u-text-center.u-marginbottom-20', 'Recommend Stario to your friends! '),
                            m('.w-row', [
                                m('.w-col.w-col-2'),
                                m('.w-col.w-col-8', [
                                    m('.w-row', [
                                        m('.w-col.w-col-6.w-col-small-6.w-col-tiny-6.w-sub-col-middle', [
                                            m('div', [
                                                m('img.icon-share-mobile[src=\'https://daks2k3a4ib2z.cloudfront.net/54b440b85608e3f4389db387/53a3f66e05eb6144171d8edb_facebook-xxl.png\']'),
                                                m('a.w-button.btn.btn-large.btn-fb[href="http://www.facebook.com/sharer/sharer.php?u=https://www.catarse.me/flex?ref=facebook&title=' + encodeURIComponent('Discover the Startio Flex!') + '"][target="_blank"]', 'Facebook')
                                            ])
                                        ]),
                                        m('.w-col.w-col-6.w-col-small-6.w-col-tiny-6', [
                                            m('div', [
                                                m('img.icon-share-mobile[src=\'https://daks2k3a4ib2z.cloudfront.net/54b440b85608e3f4389db387/53a3f65105eb6144171d8eda_twitter-256.png\']'),
                                                m('a.w-button.btn.btn-large.btn-tweet[href="http://twitter.com/?status=' + encodeURIComponent('Let us build a new type of crowdfunding! Register your email and find out how enter your project in Startio Flex!') + 'https://www.startio-staging.com/en/flex?ref=twitter"][target="_blank"]', 'Twitter')
                                            ])
                                        ])
                                    ])
                                ]),
                                m('.w-col.w-col-2')
                            ])
                        ])
                    ]), m('.w-section.section-large.bg-greenlime', [
                        m('.w-container', [
                            m('#participe-do-debate.u-text-center', {config: h.toAnchor()}, [
                                m('h1.fontsize-largest.fontcolor-negative','Help us build Startio'), m('.fontsize-base.u-marginbottom-60.fontcolor-negative', 'Start a conversation, ask, comment, criticize and make suggestions!')
                            ]),
                            m('#disqus_thread.card.u-radius[style="min-height: 50vh;"]', {
                                config: ctrl.addDisqus
                            })
                        ])
                    ])
                ]
            ];
        }
    };
}(window.m, window.c, window.c.h, window.c.models));
