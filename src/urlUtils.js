// export helper functions to read/wrtie uri
export function roomUrlFromPageUrl() {
  //window.location.href = window.location.href.split('?')[0]
  const match = window.location.search.match(/roomUrl=([^&]+)/i);
  return match && match[1] ? decodeURIComponent(match[1]) : null;
}

export function pageUrlFromRoomUrl(roomUrl) {
  return (
    window.location.href.split('?')[0] +
    (roomUrl ? `?roomUrl=${encodeURIComponent(roomUrl)}` : '')
  );
}