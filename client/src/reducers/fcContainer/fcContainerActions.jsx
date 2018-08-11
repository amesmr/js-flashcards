import { NEXT_FC_INDEX, PREV_FC_INDEX } from './fcContainerConstants';

export const nextCard = () => {
    return {
        type: NEXT_FC_INDEX
    }
}

export const prevCard = () => {
    return {
        type: PREV_FC_INDEX
    }
}