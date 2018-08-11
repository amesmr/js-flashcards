import { NEXT_FC_INDEX, PREV_FC_INDEX } from './fcContainerConstants';

const initialState = {
    index: 0
}



const fcContainerReducer = (state = initialState, action) {
    switch (action.type) {
        case NEXT_FC_INDEX:
            return {};
        case PREV_FC_INDEX:
            return {};
        default: 
            return state;
    }
}

export default fcContainerReducer;