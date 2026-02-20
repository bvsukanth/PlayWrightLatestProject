class APIUtils
{
    constructor(apiContext, loginPayload)
    {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken()
    {
    const logingResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data:this.loginPayload
    });
    
    //expect(logingResponse.ok()).toBeTruthy();
    const loginResponseJson = await logingResponse.json();
    const token = loginResponseJson.token;
    console.log(token);
    return token;
    }

    async createOrder(orderpayLoad)
    {
        let response = {};
        response.token = await this.getToken();
         const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        
                {
                    data:orderpayLoad,
                    headers:{
                                'Authorization' : response.token,
                                'Content-Type' : 'application/json'
                            },
                })
        
            const orderResponseJson = await orderResponse.json();
            const orderId = await orderResponseJson.orders[0];
            console.log(orderId);
            response.orderId = orderId;
            console.log(response);
            return response;
    }
}

module.exports = {APIUtils};