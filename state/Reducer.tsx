import { IVideoController } from "./Store";

const Reducer = (state: any, action: { payload: any; type: string }) => {
  switch (action.type) {
    case 'CAROUSEL_NAV':
      return {...state, comesFromCarousel: true}
    case "SET_NAV":
      return {
        ...state,
        route: action.payload,
        comesFromCarousel:true
      };
    case 'VIDEO_PLAYED':
      localStorage.setItem('video_played', action.payload)
      return {
        ...state,
        videoPlayed: action.payload,
      }
    case "REGISTER_VIDEO":
      return {
        ...state,
        // We must provide some unique id based on key property and their value.
        videoStore: Object.assign(state.videoStore, {
          [action.payload.key]: state.videoStore[action.payload.key] ? Object.assign(action.payload.value, state.videoStore[action.payload.key]) : action.payload.value ,
        }),
      };
    case "TOGGLE_VIDEO":
      const videoStore = state.videoStore[
        action.payload.key
      ] as IVideoController;
      videoStore.paused = !videoStore.paused;
      state.videoStore[action.payload.key] = videoStore;
      videoStore.videoRef?.play();
      return {
        ...state,
        videoStore: Object.assign(state.videoStore, {
          [action.payload.key]: videoStore,
        }),
      };
    case "TOGGLE_VIDEO_MUTE":
      const videoStoreMute = state.videoStore[
        action.payload.key
      ] as IVideoController;
      videoStoreMute.muted = !videoStoreMute.muted;
      return {
        ...state,
        videoStore: Object.assign(state.videoStore, {
          [action.payload.key]: videoStoreMute,
        }),
      };
      case "SKIP_VIDEO":
        const videoStoreSKIP= state.videoStore[
          action.payload.key
        ] as IVideoController;
        videoStoreSKIP.skipped = true;
        return {
          ...state,
          videoStore: Object.assign(state.videoStore, {
            [action.payload.key]: videoStoreSKIP,
          }),
        };

    default:
      return state;
  }
};

export default Reducer;
