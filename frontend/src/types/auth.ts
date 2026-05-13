export type AuthUser = {
  email: string;
  name?: string;
  picture?: string;
};

export type AuthState =
  | { status: 'loading' }
  | { status: 'signed-out' }
  | { status: 'not-approved' }
  | { status: 'signed-in'; user: AuthUser };

export type GoogleCredentialResponse = {
  credential?: string;
};
