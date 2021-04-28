function saveToLocalStorage(roomId: any, userId: string, nickname: string) {
  window.localStorage.setItem(roomId, userId + roomId + nickname);
  console.log("saved");
  console.log(window.localStorage.getItem(roomId));
}

export default saveToLocalStorage;
