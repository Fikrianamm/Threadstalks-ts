interface IUser {
  id: string
  name: string
  avatar: string
}

interface IUserCredentials {
  email: string
  password: string
}

interface IUserRegisterData extends IUserCredentials {
  name: string
}

interface IUserProfile extends IUser {
  email: string
}

export type {
  IUser,
  IUserCredentials,
  IUserRegisterData,
  IUserProfile,
};
