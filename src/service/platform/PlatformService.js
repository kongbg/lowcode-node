import PlatformUser from '../../model/platform/User.js'


class PlatformService {
    getPlatformUsersByPage() {
        return PlatformUser.findOne({
            where: {
                id: ''
            }
        })
    }
}

export default PlatformService;