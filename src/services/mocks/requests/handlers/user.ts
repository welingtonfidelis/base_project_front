import { rest } from 'msw';
import { userDB } from '../../repositories/user';

export const userHandler = [
    rest.post('/login', async (req, res, ctx) => {
        const { user_name, password } = await req.json();
        const user = await userDB.findByUserNameOrEmail(user_name);
        console.log('user_name, password: ', user_name, password);
        console.log('user: ', user);
        
        return res(ctx.json({ ok: true }));
      })
]