import GitHub from '@auth/core/providers/github';
import Google from '@auth/core/providers/google';
import { DataModel } from './_generated/dataModel';
import { convexAuth } from '@convex-dev/auth/server';
import { Password } from '@convex-dev/auth/providers/Password';
import { VerifyEmail } from './resend/verify_email';
import { ResetPassword } from './resend/reset_password';

const SignIn = Password<DataModel>({
  id: 'signin',
  verify: VerifyEmail,
  reset: ResetPassword,
  profile(params, ctx) {
    return {
      email: params.email as string,
      name: params.name as string,
    };
  },
});

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [GitHub, Google, SignIn],
});
