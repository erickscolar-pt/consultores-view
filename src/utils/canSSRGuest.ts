import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { parseCookies, destroyCookie } from 'nookies';
import { AuthTokenError } from '../services/errors/AuthTokenError';

export function canSSRGuest<P>(fn: GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx);
        const token = cookies['@nextauth.consultores.token'];

        if (token) {
            try {
                return {
                    redirect: {
                        destination: '/chat',
                        permanent: false,
                    }
                };
            } catch (err) {
                if (err instanceof AuthTokenError) {
                    destroyCookie(ctx, '@nextauth.consultores.token');
                    return await fn(ctx);
                }
            }
        }

        return await fn(ctx);
    };
}
