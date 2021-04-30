// export const GRAPHQL_API = "https://chit-chatdegg.herokuapp.com/graphql";
export const GRAPHQL_API = "http://localhost:8080/graphql";

export function saveToFirestoreQuery(
  nickname: String,
  password: String
): string {
  //   return `query {saveToFirestore(newUser: "${userJSON}")}`;
  return `query {saveToFirestore(newUser: "{\\"userId\\":1,\\"nickname\\":\\"${nickname}\\",\\"password\\":\\"${password}\\",\\"connected\\":true, \\"chatRooms\\":null, \\"currentRoom\\":null}")}`;
}

export function saveUserChatRoomToFirestoreQuery(
  userId: number,
  roomId: string
): string {
  return `query {saveUserChatRoomToFirestore(userId: ${userId}, roomId: "${roomId}")}`;
}

export function removeUserChatRoomFromFirebaseQuery(
  userId: number,
  roomId: string
): string {
  return `query {removeUserChatRoomFromFirebase(userId: ${userId}, roomId: "${roomId}")}`;
}

export function loginUserQuery(nickname: string, password: string): string {
  return `query {loginUser(userNick: "${nickname}", userPass: "${password}")}`;
}

export function logoutUserQuery(userId: number): string {
  return `query {logoutUser(userId: ${userId})}`;
}

export function isRoomIDAvailableQuery(roomId: string): string {
  return `query {isRoomIDAvailable(roomId: "${roomId}")}`;
}

export function createNewRoomQuery(roomId: string): string {
  return `query {createNewRoom(roomId: "${roomId}")}`;
}

export function setUserCurrentRoomQuery(
  userId: number,
  roomId: string
): string {
  return `query {setUserCurrentRoom(userId: ${userId}, roomId: "${roomId}")}`;
}

export function joinUserToRoomQuery(userId: number, roomId: string) {
  return `query {joinUserToRoom(userId: ${userId}, roomId: "${roomId}")}`;
}

export function leaveCurrentRoomQuery(userId: number): String {
  return `query {leaveCurrentRoom(userId: ${userId})}`;
}
