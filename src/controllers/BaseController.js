class BaseController {
    static renderJsonSuccess (code = 200, msg = '', data = {}) {
        return {
            code: code,
            msg: msg,
            data: data
        }
    }
    static renderJsonWarn (code = 400, msg = '', data = null) {
        return {
            code: code,
            msg: msg,
            data: data
        }
    }
}

export default BaseController;