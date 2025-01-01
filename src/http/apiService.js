import httpService from "./httpService";

apiService = {

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
    getMenuCategory(data) {
        return httpService.get(`menu-category/${storeid}`, data);
    },

    // getStoreOrder
    getStoreOrder(data) {
        return httpService.get(`order/store/${storeid}`, data);
    },

    // getStoreMenuByCategory
    getStoreMenuByCategory(data) {
        return httpService.get(`store-menu/category/${categoryid}`, data);
    },

    // getOrderByCode
    getOrderByCode(data) {
        return httpService.get(`order-by-code/${storeid}/${ordercode}`, data);
    },

    // getStoreMenuByCategory
    getStoreMenuByCategory(data) {
        return httpService.get(`order-statistics/${storeid}`, data);
    },
}