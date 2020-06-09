import * as axios from 'axios';

const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "a0b67196-6f3b-4506-b458-acfa1793de42",
    },
    baseURL: "https://social-network.samuraijs.com/api/1.0/"
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return axiosInstance
            .get(
                `users?page=${currentPage}&count=${pageSize}`
            ).then(response => response.data);
    },
    postFollowUser(userId) {
        return axiosInstance
            .post(
                `follow/${userId}`
            );
    },
    deleteUnfollowUser(userId) {
        return axiosInstance
            .delete(
                `follow/${userId}`
            );
    },
    getProfile(userId){
        console.warn("Obsolete method. Please use profileAPI object")
        return profileAPI.getProfile(userId);
    }
}

export const profileAPI = { 
    getProfile(userId){
        return axiosInstance
			.get(
				`profile/${userId}`
			);
    },
    getStatus(userId){
        return axiosInstance
            .get(
                `profile/status/${userId}`
            )
    },
    updateStatus(status){
        return axiosInstance
            .put(
                `profile/status`, 
                { status }
            )
    }
}

export const authAPI = {
    myUserData(){
        return axiosInstance
            .get(
                `auth/me`
            );
    },
    login(email, password, rememberMe = false) {
        return axiosInstance
            .post(
                `auth/login`, 
                { email, password, rememberMe }
            );
    },
    logout() {
        return axiosInstance
            .delete(
                `auth/login`, 
            );
    }  
}
 