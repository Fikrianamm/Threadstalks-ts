/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { IUserRegisterData, IUserCredentials } from '../types/user';
import IResponse from '../types/response';
import { IThreadData } from '../types/threads';

const BASE_URL = import.meta.env.VITE_BASE_URL;

function putAccessToken(token: string) {
  localStorage.setItem('accessToken', token);
}

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function fetchWithToken(method:'get' | 'post', url?:string, data:any = {}) {
  return axios({
    method,
    url: `${BASE_URL}${url}`,
    data,
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

export const getErrorMessage = (error: unknown): string => {
  let message;
  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = String(error.message);
  } else if (typeof error === 'string') {
    message = error;
  } else {
    message = 'Something went wrong';
  }

  return message;
};

async function register(registerData: IUserRegisterData): Promise<IResponse> {
  try {
    const response = await axios.post(`${BASE_URL}/register`, registerData);
    const { status, message, data } = response.data;
    if (status !== 'success') {
      throw new Error(message);
    }
    return { status, message, user: data.user };
  } catch (error) {
    const e = getErrorMessage(error);
    console.error(e);
    return { status: 'fail', message: e };
  }
}

async function login(loginData: IUserCredentials): Promise<IResponse> {
  try {
    const response = await axios.post(`${BASE_URL}/login`, loginData);
    const { status, message, data } = response.data;
    if (status !== 'success') {
      throw new Error(message);
    }
    return { status, message, token: data.token };
  } catch (error) {
    const e = getErrorMessage(error);
    console.error(e);
    return { status: 'fail', message: e };
  }
}

async function getAllUsers(): Promise<IResponse> {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    const { status, message, data } = response.data;
    if (status !== 'success') {
      throw new Error(message);
    }
    return { status, message, users: data.users };
  } catch (error) {
    const e = getErrorMessage(error);
    console.error(e);
    return { status: 'fail', message: e };
  }
}

async function getOwnProfile(): Promise<IResponse> {
  try {
    const response = await fetchWithToken('get', '/users/me');
    const { status, message, data } = response.data;
    if (status !== 'success') {
      throw new Error(message);
    }
    return { status, message, user: data.user };
  } catch (error) {
    const e = getErrorMessage(error);
    console.error(e);
    return { status: 'fail', message: e };
  }
}

async function createThread(createThreadData: IThreadData): Promise<IResponse> {
  try {
    const response = await fetchWithToken('post', '/threads', createThreadData);
    const { status, message } = response.data;
    if (status !== 'success') {
      throw new Error(message);
    }
    return { status, message };
  } catch (error) {
    const e = getErrorMessage(error);
    console.error(e);
    return { status: 'fail', message: e };
  }
}

async function getAllThreads(): Promise<IResponse> {
  try {
    const response = await axios.get(`${BASE_URL}/threads`);
    const { status, message, data } = response.data;
    if (status !== 'success') {
      throw new Error(message);
    }
    return { status, message, threads: data.threads };
  } catch (error) {
    const e = getErrorMessage(error);
    console.error(e);
    return { status: 'fail', message: e };
  }
}

async function getDetailThread(id: string): Promise<IResponse> {
  try {
    const response = await axios.get(`${BASE_URL}/threads/${id}`);
    const { status, message, data } = response.data;
    if (status !== 'success') {
      throw new Error(message);
    }
    return { status, message, detailThread: data.detailThread };
  } catch (error) {
    const e = getErrorMessage(error);
    console.error(e);
    return { status: 'fail', message: e };
  }
}

async function createComment(commentData:
{ id: string, data: { content: string }
}): Promise<IResponse> {
  try {
    const response = await fetchWithToken('post', `/threads/${commentData.id}/comments`, commentData.data);
    const { status, message } = response.data;
    if (status !== 'success') {
      throw new Error(message);
    }
    return { status, message };
  } catch (error) {
    const e = getErrorMessage(error);
    console.error(e);
    return { status: 'fail', message: e };
  }
}

async function upVoteThread(id: string): Promise<IResponse> {
  try {
    const response = await fetchWithToken('post', `/threads/${id}/up-vote`);
    const { status, message } = response.data;
    if (status !== 'success') {
      throw new Error(message);
    }
    return { status, message };
  } catch (error) {
    const e = getErrorMessage(error);
    console.error(e);
    return { status: 'fail', message: e };
  }
}

async function downVoteThread(id: string): Promise<IResponse> {
  try {
    const response = await fetchWithToken('post', `/threads/${id}/down-vote`);
    const { status, message } = response.data;
    if (status !== 'success') {
      throw new Error(message);
    }
    return { status, message };
  } catch (error) {
    const e = getErrorMessage(error);
    console.error(e);
    return { status: 'fail', message: e };
  }
}

async function neutralVoteThread(id: string): Promise<IResponse> {
  try {
    const response = await fetchWithToken('post', `/threads/${id}/neutral-vote`);
    const { status, message } = response.data;
    if (status !== 'success') {
      throw new Error(message);
    }
    return { status, message };
  } catch (error) {
    const e = getErrorMessage(error);
    console.error(e);
    return { status: 'fail', message: e };
  }
}

async function upVoteComment(idContent:
{ idThread: string, idComment: string }): Promise<IResponse> {
  try {
    const response = await fetchWithToken('post', `/threads/${idContent.idThread}/comments/${idContent.idComment}/up-vote`);
    const { status, message } = response.data;
    if (status !== 'success') {
      throw new Error(message);
    }
    return { status, message };
  } catch (error) {
    const e = getErrorMessage(error);
    console.error(e);
    return { status: 'fail', message: e };
  }
}

async function downVoteComment(idContent:
{ idThread: string, idComment: string }): Promise<IResponse> {
  try {
    const response = await fetchWithToken('post', `/threads/${idContent.idThread}/comments/${idContent.idComment}/down-vote`);
    const { status, message } = response.data;
    if (status !== 'success') {
      throw new Error(message);
    }
    return { status, message };
  } catch (error) {
    const e = getErrorMessage(error);
    console.error(e);
    return { status: 'fail', message: e };
  }
}

async function neutralVoteComment(idContent:
{ idThread: string, idComment: string }): Promise<IResponse> {
  try {
    const response = await fetchWithToken('post', `/threads/${idContent.idThread}/comments/${idContent.idComment}/neutral-vote`);
    const { status, message } = response.data;
    if (status !== 'success') {
      throw new Error(message);
    }
    return { status, message };
  } catch (error) {
    const e = getErrorMessage(error);
    console.error(e);
    return { status: 'fail', message: e };
  }
}

async function getLeaderboards(): Promise<IResponse> {
  try {
    const response = await axios.get(`${BASE_URL}/leaderboards`);
    const { status, message, data } = response.data;
    if (status !== 'success') {
      throw new Error(message);
    }
    return { status, message, leaderboards: data.leaderboards };
  } catch (error) {
    const e = getErrorMessage(error);
    console.error(e);
    return { status: 'fail', message: e };
  }
}

export {
  register,
  login,
  putAccessToken,
  getAccessToken,
  getAllUsers,
  getOwnProfile,
  createThread,
  getAllThreads,
  getDetailThread,
  createComment,
  upVoteThread,
  downVoteThread,
  neutralVoteThread,
  upVoteComment,
  downVoteComment,
  neutralVoteComment,
  getLeaderboards,
};
