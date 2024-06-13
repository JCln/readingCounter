import { trigger, transition, style, animate, state } from "@angular/animations";

export const transitionAnimation = [
    trigger('openClose', [
        state('slideUp', style({
            height: '0',
            opacity: '0',
            visibility: 'hidden',
            marginTop: '-.5rem'
        })),
        state('slideDown', style({
            height: '100%',
            opacity: '1',
            visibility: 'visible',
            marginTop: '0'
        })),
        transition('slideUp<=>slideDown', animate('250ms cubic-bezier(0.65, 0.05, 0.36, 1)'))
    ])
]
export const transitionLoginHelp = [
    trigger('openClose', [
        state('closeSubItems', style({
            height: '0',
            width: '0',
            opacity: '0',
            visibility: 'hidden'
        })),
        state('openSubItems', style({
            opacity: '1',
            maxHeight: '15rem',
            width: '19rem',
            visibility: 'visible'
        })),
        transition('closeSubItems<=>openSubItems', animate('250ms ease-in-out'))
    ])
]
// export const transitionSideBar = [
//     trigger('openClose', [
//         state('closeSubItems', style({
//             height: '0',
//             opacity: '0',
//             visibility: 'hidden',
//             marginTop: '-.5rem'
//         })),
//         state('openSubItems', style({
//             height: '100%',
//             opacity: '1',
//             visibility: 'visible',
//             marginTop: '0'
//         })),
//         transition('closeSubItems => openSubItems', [
//             animate('250ms cubic-bezier(0.65, 0.05, 0.36, 1)')
//         ]),
//         transition('openSubItems => closeSubItems', [
//             animate('200ms ease-in')
//         ])
//     ])
// ]
export const transitionColorPalette = [
    trigger('openClose', [
        state('closeSubItems', style({
            visibility: 'hidden',
            height: '0',
            width: '0',
            opacity: '0'
        })),
        state('openSubItems', style({
            visibility: 'visible',
            padding: '.25rem 0.5rem',
            height: 'auto',
            width: 'auto',
            opacity: '1'
        })),
        transition('closeSubItems <=> openSubItems', animate('150ms ease-in-out'))
    ])
]