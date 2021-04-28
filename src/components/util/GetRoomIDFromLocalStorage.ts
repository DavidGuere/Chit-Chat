function getRoomIDFromLocalStorage(roomId: string): string | null {
  let data = window.localStorage.getItem(roomId);
  if (data !== null) {
    return data.substring(6, 14);
  }
  return null;
}

export default getRoomIDFromLocalStorage;
