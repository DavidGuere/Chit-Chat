export const GRAPHQL_API = "https://chit-chatdegg.herokuapp.com/graphql";

export function saveToFirestoreQuery(userJSON: String): string {
  return `query saveToFirestore(newUser: "${userJSON}")`;
}

export function saveUserChatRoomToFirestoreQuery(
  userId: number,
  roomId: number
): string {
  return `saveUserChatRoomToFirestore(userId: ${userId}, roomId: ${roomId})`;
}

export function removeUserChatRoomFromFirebaseQuery(
  userId: number,
  roomId: number
): string {
  return `query removeUserChatRoomFromFirebase(userId: ${userId}, roomId: ${roomId})`;
}

export function loginUserQuery(userId: number): string {
  return `query loginUser(userId: ${userId})`;
}

export function logoutUserQuery(userId: number): string {
  return `query logoutUser(userId: ${userId})`;
}

export function isRoomIDAvailableQuery(roomId: string): string {
  return `query isRoomIDAvailable(roomId: "${roomId}")`;
}

export function createNewRoomQuery(roomId: string): string {
  return `query createNewRoom(roomId: "${roomId}")`;
}
