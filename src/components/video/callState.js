/**
 * Call state is comprised of:
 * - "Call items" (inputs to the call, i.e. participants)
 * - UI state that depends on call items (for now, just whether to show "click allow" message)
 *
 * Call items are keyed by id:
 * - "local" for the current participant
 * - A session id for each remote participant
 */
const initialCallState = {
  callItems: {
    local: {
      isLoading: true,
      audioTrack: null,
      videoTrack: null,
      isMainScreen: null
    },
  },
  clickAllowTimeoutFired: false,
  camOrMicError: null,
  fatalError: null,
};

// --- Actions ---

/**
 * CLICK_ALLOW_TIMEOUT action structure:
 * - type: string
 */
const CLICK_ALLOW_TIMEOUT = 'CLICK_ALLOW_TIMEOUT';

/**
 * PARTICIPANTS_CHANGE action structure:
 * - type: string
 * - participants: Object (from Daily callObject.participants())
 */
const PARTICIPANTS_CHANGE = 'PARTICIPANTS_CHANGE';

/**
 * CAM_OR_MIC_ERROR action structure:
 * - type: string
 * - message: string
 */
const CAM_OR_MIC_ERROR = 'CAM_OR_MIC_ERROR';

/**
 * CAM_OR_MIC_ERROR action structure:
 * - type: string
 * - message: string
 */
const FATAL_ERROR = 'FATAL_ERROR';

function callReducer(callState, action) {
  switch (action.type) {
    case CLICK_ALLOW_TIMEOUT:
      return {
        ...callState,
        clickAllowTimeoutFired: true,
      };
    case PARTICIPANTS_CHANGE:
      const callItems = getCallItems(action, callState.callItems);
      return {
        ...callState,
        callItems,
      };
    case CAM_OR_MIC_ERROR:
      return { ...callState, camOrMicError: action.message };
    case FATAL_ERROR:
      return { ...callState, fatalError: action.message };
    default:
      throw new Error();
  }
}

function getLocalCallItem(callItems) {
  return callItems['local'];
}

function getCallItems(action, prevCallItems) {
  //debugger
  let callItems = { ...initialCallState.callItems }; // Ensure we *always* have a local participant
  // console.log('callItems at before loop in getCallItems:', callItems)
  
  for (const [id, participant] of Object.entries(action.participants)) {
    // if (isAdmin && isLocal(id)) {
    //   change event participant to owner
    // }

    // identify admins browser as "alpha"
      // if isLocal(id) and user_is_admin
        // configure this browser to show their own screen as large tile and disable audio and video on clients
        // clients should appear with email in box
    const hasLoaded = prevCallItems[id] && !prevCallItems[id].isLoading;
    // Here we assume that a participant will join with audio/video enabled.
    // This assumption lets us show a "loading" state before we receive audio/video tracks.
    const missingTracks = !(participant.audioTrack || participant.videoTrack);
    callItems[id] = {
      isLoading: !hasLoaded && missingTracks,
      audioTrack: participant.audioTrack,
      videoTrack: participant.videoTrack,
      isMainScreen: isLocal(id)
    };
  }
  // Maybe here I should void audio and video for non admin parties? Or inside of the loop?
  console.log('callItems before return in getCallItems:', callItems)
  return callItems;
}

// --- Derived data ---

// True if id corresponds to local participant (*not* their screen share)
function isLocal(id) {
  return id === 'local';
}

function getMessage(callState) {
  function shouldShowClickAllow() {
    const localCallItem = getLocalCallItem(callState.callItems);
    const hasLoaded = localCallItem && !localCallItem.isLoading;
    return !hasLoaded && callState.clickAllowTimeoutFired;
  }

  let header = null;
  let detail = null;
  let isError = false;
  if (callState.fatalError) {
    header = `Fatal error: ${callState.fatalError}`;
    isError = true;
  } else if (callState.camOrMicError) {
    header = `Camera or mic access error: ${callState.camOrMicError}`;
    detail =
      'See https://help.daily.co/en/articles/2528184-unblock-camera-mic-access-on-a-computer to troubleshoot.';
    isError = true;
  } else if (shouldShowClickAllow()) {
    header = 'Click "Allow" to enable camera and mic access';
  }
  return header || detail ? { header, detail, isError } : null;
}

export {
  initialCallState,
  CLICK_ALLOW_TIMEOUT,
  PARTICIPANTS_CHANGE,
  CAM_OR_MIC_ERROR,
  FATAL_ERROR,
  callReducer,
  isLocal,
  getMessage,
};