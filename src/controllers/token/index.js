import jwt from 'jsonwebtoken';

let secret = process.env.TOKEN_SECRET;
class TokenController {
    createToken(data, time=3600) {
        const token = jwt.sign(
            data,
            secret,
            { expiresIn: 60 *60 } // 60 * 60 s
        );
        return `Bearer ${token}`;
    }
}

export default new TokenController;