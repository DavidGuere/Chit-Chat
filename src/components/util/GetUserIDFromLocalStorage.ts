function getUserIDFromLocalStorage(roomId: string): string | null {
  let data = window.localStorage.getItem(roomId);
  if (data !== null) {
    return data.substring(0, 6);
  }
  return null;
}

export default getUserIDFromLocalStorage;
