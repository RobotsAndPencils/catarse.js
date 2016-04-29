/**
 * window.c.ProjectMode component
 * A simple component that displays a badge with the current project mode
 * together with a description of the mode, shown inside a tooltip.
 * It receives a project as resource
 *
 * Example:
 *  view: {
 *      return m.component(c.ProjectMode, {project: project})
 *  }
 */
window.c.ProjectMode = ((m, c, h, _) => {
    return {
        view: (ctrl, args) => {
            let project = args.project(),
                mode = project.mode,
                modeImgSrc = (mode === 'aon') ? '/assets/aon-badge.png' : '/assets/flex-badge.png',
                modeTitle = (mode === 'aon') ? 'All or Nothing ' : 'Flexible ',
                goal = (_.isNull(project.goal) ? 'not defined' : h.formatNumber(project.goal)),
                tooltip = (el) => {
                    return m.component(c.Tooltip, {
                        el: el,
                        text: (mode === 'aon') ? `You only receive the funding if you reach the target goal before the deadline on: ${h.momentify(project.zone_expires_at, 'DD/MM/YYYY')}.` : 'The project owner receives all the resources when the campaign ends, even if it has not reached this goal.',
                        width: 280
                    });
                };

            return m(`#${mode}.w-row`, [
                m('.w-col.w-col-2.w-col-small-2.w-col-tiny-2', [
                    !_.isEmpty(project) ? m(`img[src="${modeImgSrc}"][width='30']`) : ''
                ]),
                m('.w-col.w-col-10.w-col-small-10.w-col-tiny-10', [
                    m('.fontsize-smaller.fontweight-semibold', 'Goal $ ' + h.selfOrEmpty(goal, '--')),
                    m('.w-inline-block.fontsize-smallest._w-inline-block', [
                        !_.isEmpty(project) ? modeTitle : '',
                        tooltip('span.w-inline-block.tooltip-wrapper.fa.fa-question-circle.fontcolor-secondary')
                    ])
                ])
            ]);
        }
    };
}(window.m, window.c, window.c.h, window._));
