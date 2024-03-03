import axios from 'axios';
import {
  RegisterData, Response, ThreadData, UserCredentials,
} from './types';

const { BASE_URL } = process.env;

function putAccessToken(token: string) {
  localStorage.setItem('accessToken', token);
}

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

const headers = {
  Authorization: `Bearer ${getAccessToken()}`,
};

const getErrorMessage = (error: unknown): string => {
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

async function register(registerData: RegisterData): Promise<Response> {
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

async function login(loginData: UserCredentials): Promise<Response> {
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

async function getAllUsers(): Promise<Response> {
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

async function getOwnProfile(): Promise<Response> {
  try {
    const response = await axios.get(`${BASE_URL}/users/me`, { headers });
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

async function createThread(createThreadData: ThreadData): Promise<Response> {
  try {
    const response = await axios.post(`${BASE_URL}/threads`, createThreadData, { headers });
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

async function getAllThreads(): Promise<Response> {
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

async function getDetailThread(id: string): Promise<Response> {
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

async function createComment(id: string, content: string): Promise<Response> {
  try {
    const response = await axios.post(`${BASE_URL}/threads/${id}/comments`, content, { headers });
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

async function upVoteThread(id: string): Promise<Response> {
  try {
    const response = await axios.post(`${BASE_URL}/threads/${id}/up-vote`, { headers });
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

async function downVoteThread(id: string): Promise<Response> {
  try {
    const response = await axios.post(`${BASE_URL}/threads/${id}/down-vote`, { headers });
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

async function neutralVoteThread(id: string): Promise<Response> {
  try {
    const response = await axios.post(`${BASE_URL}/threads/${id}/neutral-vote`, { headers });
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

async function upVoteComment(idThread: string, idComment: string): Promise<Response> {
  try {
    const response = await axios.post(`${BASE_URL}/threads/${idThread}/comments/${idComment}/up-vote`, { headers });
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

async function downVoteComment(idThread: string, idComment: string): Promise<Response> {
  try {
    const response = await axios.post(`${BASE_URL}/threads/${idThread}/comments/${idComment}/down-vote`, { headers });
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

async function neutralVoteComment(idThread: string, idComment: string): Promise<Response> {
  try {
    const response = await axios.post(`${BASE_URL}/threads/${idThread}/comments/${idComment}/neutral-vote`, { headers });
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

async function getLeaderboards(): Promise<Response> {
  try {
    const response = await axios.post(`${BASE_URL}/leaderboards`);
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
