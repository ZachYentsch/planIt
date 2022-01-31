import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class ProfilesService {
    async editProfile(updatedProfile) {
        const res = await api.put('account/', updatedProfile)
        logger.log(res.data)
        AppState.profile = res.data
    }
}

export const profilesService = new ProfilesService()