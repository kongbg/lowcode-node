class BaseController {
    static renderJsonSuccess (code = 200, msg = '', data = {}) {
        return {
            code: code,
            msg: msg,
            data: data
        }
    }
}

export default BaseController;