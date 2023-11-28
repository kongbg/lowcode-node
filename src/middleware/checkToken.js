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
                    await next();
                } catch (error) {
                    // console.log('error:', error)
                    let message = error.message;
                    if (message) {
                        if (message === 'jwt expired') {
                            ctx.body = BaseController.renderJsonWarn(401, 'token 过期');
                        } else {
                            ctx.body = BaseController.renderJsonWarn(400, message);
                        }
                    } else {
                        ctx.body = BaseController.renderJsonWarn(400, '服务器出错');
                    }
                }
            } else {
                ctx.body = BaseController.renderJsonWarn(400, 'token格式错误');
            }
        } else {
            await next();
        }
    }
}