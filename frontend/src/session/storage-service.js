const userIdKey = 'UserId';

class StorageService {
    setUser(userId) {
        localStorage.setItem(userIdKey, userId);
        this._userId = userId;
    }
    getUser() {
        if (!this._userId) {
            this._userId = localStorage.getItem(userIdKey);
        }
        return this._userId;
    }
}

export default new StorageService;