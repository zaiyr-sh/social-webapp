import * as axios from 'axios';

const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "f61e89ea-1c0a-463c-a3cd-945a70549aff",
    },
    baseURL: "https://social-network.samuraijs.com/api/1.0/"
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return axiosInstance
            .get(
                `users?page=${currentPage}&count=${pageSize}`)
                .then(response => response.data);
    },
    postFollowUser(userId) {
        return axiosInstance
            .post(
                `follow/${userId}`);
    },
    deleteUnfollowUser(userId) {
        return axiosInstance
            .delete(
                `follow/${userId}`);
    },
    getProfile(userId){
        return axiosInstance
			.get(
				`profile/${userId}`
			);
    }
}

export const authAPI = {
    myUserData(){
        return axiosInstance
            .get(
                `auth/me`
            );
    }
}
 