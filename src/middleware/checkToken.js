import jwt from 'jsonwebtoken';
import BaseController from '../controllers/BaseController.js';
/**
 * 检查token
 * @param {string} key 请求头中保存token的键值
 * @param {string} secret jet加密字符串
 * @param {Array} whites 不校验token的接口
 * @returns 
 */
export const verifToken = ({key='', secret='', whites=[]}=options) => {
    return async (ctx, next) => {
        const authorization = ctx.request.header[key];
        let path = ctx.request.url.split('?')[0];
        if (!whites.includes(path)) {
            if (authorization) {
                let token = authorization.replace('Bearer ','');
                try {
                    let result = jwt.verify(
                        token,
                        secret
                    )
                    ctx.payload = {...result, token};
                } catch (error) {
                    ctx.payload = {token, id: null}
                    let message = error.message === 'jwt expired' ? 'token 过期' : 'token 出错';
                    ctx.body = BaseController.renderJsonWarn(401, message);
                }
            } else {
                ctx.body = BaseController.renderJsonWarn(400, 'token格式错误');
            }
        }
        await next();
    }
}