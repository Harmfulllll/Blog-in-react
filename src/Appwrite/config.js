import { combineReducers } from "@reduxjs/toolkit";
import conf from "../Conf/conf";
import { ID, Client, Account, Query, Storage, Databases } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectid);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, content, featuredImage, status, userId, slug }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseid,
        conf.appwriteCollectionid,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseid,
        conf.appwriteCollectionid,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async deleteDocument(slug) {
    try {
      return await this.databases.deleteDocument(
        conf.appwriteDatabaseid,
        conf.appwriteCollectionid,
        slug
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseid,
        conf.appwriteCollectionid,
        slug
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseid,
        conf.appwriteCollectionid,
        queries
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      await this.bucket.createFile(conf.appwriteBucketid, ID.unique(), file);
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketid, fileId);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketid, fileId);
  }
}

const service = new Service();

export default service;
