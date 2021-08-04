const Reducer = (state: any, action:{payload:any, type:string}) => {
    switch (action.type) {
        case 'SET_NAV':
            return {
                ...state,
                route: action.payload
            };
        case 'MOVE_SLIDE':
            return {
                ...state,
                slide: action.payload
            };
        default:
            return state;
    }
};

export default Reducer;