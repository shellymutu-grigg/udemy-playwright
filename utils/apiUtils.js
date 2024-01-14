class apiUtils{
    
    constructor(apiContext, loginPayLoad){
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }

    async getToken(resetPasswordPayLoad) {
        let loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', 
        {
            data: this.loginPayLoad,
        });
    
        if(!(await loginResponse).ok() === true){
            const resetPasswordResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/new-password', 
            {
                data: resetPasswordPayLoad,
            });
        }
    
        loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', 
        {
            data: this.loginPayLoad,
        });
    
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        return token;
    }

    async createOrder(orderPayLoad, resetPasswordPayLoad){
        let response = {};
        response.token = await this.getToken(resetPasswordPayLoad);
        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', 
            {
                data: orderPayLoad,
                headers: {
                    'Authorization': response.token,
                    'Content-Type': 'application/json'
                }
            });
        const orderResponseJson = await orderResponse.json();
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;
        return response;
    }
}
module.exports = { apiUtils }