import conf from "../Conf/conf.js";
import { ID, Client, Account } from "appwrite";

//class
export class auth {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectid);
    this.account = new Account(this.client);
  }

  async signup({ email, password, name }) {
    try {
      const data = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (data) {
        return this.login({ email, password });
      } else return data;
    } catch (error) {
      return error;
    }
  }
  async login({ email, password }) {
    try {
      const user = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return user;
    } catch (error) {
      throw error;
    }
  }
  async getUser() {
    try {
      await this.account.get();
    } catch (error) {
      return error;
    }
    return null;
  }
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      return error;
    }
    return null;
  }
}
//object
const authService = new auth();

export default authService;
