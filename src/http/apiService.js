import httpService from "./httpService";

const apiService = {

    // logIn
    logIn(data) {
        return httpService.post(`login`, data);
    },

    // addStoreMenu
    addStoreMenu(data) {
        return httpService.post(`store-menu`, data);
    },

    // addStoreMenuImages
    addStoreMenuImages(data) {
        return httpService.post(`store-menu/images`, data);
    },

    // addStoreMenuImages
    addStoreMenuImages(data) {
        return httpService.post(`store-menu/images`, data);
    },

    // addStoreImage
    addStoreImage(data) {
        return httpService.post(`store/image`, data);
    },

    // addMenuCategory
    addMenuCategory(data) {
        return httpService.post(`menu-category`, data);
    },

    // getMenuCategory
    getMenuCategory(storeid) {
        return httpService.get(`menu-category/${storeid}`);
    },

    // getStoreOrder
    getStoreOrder(storeId) {
        return httpService.get(`order/store/${storeId}`);
    },

    // getStoreOrderById
    getStoreOrderById(orderId) {
        return httpService.get(`order/${orderId}`);
    },

    // getStoreMenu
    getStoreMenu(storeid) {
        return httpService.get(`store-menu/${storeid}`);
    },

    // getStoreMenuByCategory
    getStoreMenuByCategory(categoryid) {
        return httpService.get(`store-menu/category/${categoryid}`);
    },

    // getOrderByCode
    getOrderByCode(storeid,ordercode) {
        return httpService.get(`order-by-code/${storeid}/${ordercode}`);
    },

    // getStoreOrderStatistics
    getStoreOrderStatistics(data) {
        return httpService.get(`order-statistics/${storeid}`, data);
    },

    // updateOrder
    updateOrder(data) {
        return httpService.put(`order`,data);
    },
}

export default apiService;
