interface User {
  id: string
  name: string
  avatar: string
}

interface UserCredentials {
  email: string
  password: string
}

interface RegisterData extends UserCredentials {
  name: string
}

interface Profile extends User {
  email: string
}

interface Response {
  status: 'success' | 'fail'
  message: string
  token?: string
  users?: Profile[]
  user?: Profile
  threads?: ThreadItem[]
  detailThread?: DetailThread
  leaderboards?: UserLeaderboard<Profile>[]
}

interface ThreadItem extends ThreadData, Summary {
  ownerId: string
  totalComments: number
}

interface ThreadData {
  title: string
  body: string
  category?: string
}

interface Summary {
  id: string
  createdAt: string
  owner: User
  upVotesBy: string[]
  downVotesBy: string[]
}

interface Comment extends Summary {
  content: string
}

interface DetailThread extends ThreadData, Summary {
  comments: Comment[]
}

interface UserLeaderboard<T> {
  user: T
  score: number
}

export type {
  RegisterData,
  Profile,
  UserCredentials,
  Response,
  ThreadData,
};
