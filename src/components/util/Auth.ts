import axios from "axios";
import * as GraphQLQueries from "../util/Constants";

class Auth {
  authenticated;
  constructor() {
    this.authenticated = false;
  }

  async login(nickname: string, password: string): Promise<boolean> {
    const loginQuery = GraphQLQueries.loginUserQuery(nickname, password);
    const loginResult = await axios.post(GraphQLQueries.GRAPHQL_API, {
      query: loginQuery,
    });
    return loginResult.data.data.loginUser;
  }

  async logout(userId: number): Promise<boolean> {
    const logoutQuery = GraphQLQueries.logoutUserQuery(userId);
    const logoutResult = await axios.post(GraphQLQueries.GRAPHQL_API, {
      query: logoutQuery,
    });
    return logoutResult.data.data.logoutUser;
  }

  async isUserLogged(userId: number): Promise<boolean> {
    const connectedResult = await axios.post(GraphQLQueries.GRAPHQL_API, {
      query: `query{getUser(userId: ${userId}){
              connected
            }}`,
    });
    return connectedResult.data.data.getUser.connected;
  }
}

export default new Auth();
