/* eslint-disable @typescript-eslint/no-explicit-any */
export interface JSONObjectKeyAndTypeValidator {
    key: string;
    required: boolean;
    type:
      | 'string'
      | 'number'
      | 'boolean'
      | 'function'
      | 'object'
      | 'symbol'
      | 'symbol'
      | 'any'
      | 'bigint';
    regex?: RegExp;
    Extra?: JSONObjectKeyAndTypeValidator[];
  }
  export interface GetUserRequestInterface {
    email_id?: string | string[];
    user_name?: string;
    password?: string;
    user_type?: number;
    number?: number;
    is_active?: boolean;
    user_id?: string | string[];
    select_extra_data?: boolean;
    or_user_name?: string | string[];
    or_user_id?: string | string[];
    or_number?: number;
    or_email?: string;
  }
  
  export interface PythonSendFirebaseConfig {
    type: 'firebase-config';
    data: {
      config: {
        type: string;
        project_id: string;
        private_key_id: string;
        private_key: string;
        client_email: string;
        client_id: string;
        auth_uri: string;
        token_uri: string;
        auth_provider_x509_cert_url: string;
        client_x509_cert_url: string;
      };
      'database-url': string;
    };
  }
  export interface PythonSendSymbolConfig {
    type: 'symboles-data';
    data: {
      symboles: {
        [key: string]: string;
      };
    };
  }
  export interface PythonSendMetaTradersConfig {
    type: 'metatrader-crad';
    data: {
      uname: string;
      password: string;
      server: string;
    };
  }
  export interface PytyhonPlaceOrder {
    type: 'place_order';
    data: {
      id: string;
      symbol: string;
      volume: string;
      price: number;
      type: 'buy' | 'sell';
    };
  }
  export interface PythonSendServerConfig {
    type: 'config';
    data: PythonSeverConfig;
  }
  export interface PythonSeverConfig {
    productCalculations: {
      [product_id: string]: {
        buy: string;
        sell: string;
      };
    };
    live_rates?:boolean;
    auto_hedgin_on: boolean;
    rate_delay?: number;
  }
  export interface PythonSendLimits {
    type: 'watch';
    data: PythonLimitWatcher;
  }
  export interface GetFeedsObjects {
    ishtml?: '0' | '1';
    post_date?: string | string[];
    orderby_post_date?: 'desc' | 'asc';
    orderby_created_at?: 'desc' | 'asc';
    orderby_edited_on?: 'desc' | 'asc';
    limit?: number;
    stream?: number;
    get_all?: boolean;
    lessthen_postdate?: string;
    greater_postdate?: string;
  }
  
  export interface FeedAndNewsObject {
    id?: number;
    title: string;
    is_html: 0 | 1;
    data: string;
    post_date?: number;
    created_at?: number;
    edited_on?: number;
  }
  
  export interface FirebaseDatabaseBasicRateConfig {
    is_live_rates_on?: boolean;
    online_treding_on?: boolean;
    last_rate: { [key: string]: LastRate };
    product_list: { [key: string]: FirebaseProductList };
    volume_config: {
      GOLD?: {
        [weight: string]: {
          multiply: number;
          volume: number;
        };
      };
      SILVER?: {
        [weight: string]: {
          multiply: number;
          volume: number;
        };
      };
    };
  }
  export interface LastRate {
    'ask-high-price': number;
    'ask-low-price': number;
    'ask-price': number;
    'bid-high-price': number;
    'bid-low-price': number;
    'bid-price': number;
    'currency-base': string;
    symbole: string;
  }
  export interface ProductIdCalculationString {
    ask: string;
    bid: string;
  }
  
  export interface MainServerConfig {
    auto_approve_one_time_reg: boolean;
    online_treding_on?: boolean;
    is_live_rates_on?: boolean;
    sms_auth_key?: string;
    header_name?: string;
    otp_auth_key?: string;
    admin_numbers?: string[];
  }
  export interface SmsFlowIds {
    market_buy_order_message?: string;
    limit_modified?: string;
    limit_cancelled?: string;
    limit_passed?: string;
    limit_expired?:string;
    limit_placed?: string;
    account_activated?: string;
    registration_msg?: string;
    otp_flow?: string;
  }
  
  export interface GetOneTimeRegstrationUsersReq {
    is_active?: '0' | '1';
    created_at?: string | string[];
    orderby_created_at?: 'desc' | 'asc';
    limit?: number;
    stream?: number;
    get_all?: boolean;
    lessthen_created_at?: string;
    greater_created_at?: string;
    user_number?: string | string[];
    token?: string | string[];
    city?: string | string[];
    compnay_name?: string | string[];
    name?: string | string[];
    user_id?: string | string[];
  }
  
  export interface OneTimeRegisterdUserObj {
    id?: number;
    name: string;
    number: number;
    city: string;
    compnay_name: string;
    token?: string;
    is_active?: number;
    created_at?: number;
  }
  
  export interface ModifyLimit {
    type?: 'modify_limit';
    status?: boolean;
    data: {
      mode: 'create' | 'modify' | 'delete';
      return_id: string;
      limit_data: {
        symbole: string;
        buy_sell: 'buy' | 'sell';
        product_id: string | number;
        old_price?: string | number;
        new_price?: string | number;
        price?: string | number;
        old_volume?: number;
        new_volume?: number;
        volume?: number;
        order_id?: number;
      };
    };
  }
  export interface PythonLimitWatcher {
    [symbole: string]: {
      [pid: string]: {
        buy?: {
          [price: string]: number;
        };
        sell?: {
          [price: string]: number;
        };
      };
    };
  }
  
  export interface ChangeCalcStringReqInterface {
    pid: number;
    calc_base_id: number;
    variables: {
      buy: any[];
      sell: any[];
    };
    base_symbole: string;
  }
  
  export interface CalcBaseObject {
    id: string | number;
    name: string;
    variables: string[];
    calc_string: string;
    created_at: number;
  }
  
  export interface CalcBaseHistoryObj {
    id?: string | number;
    calc_base_id: number;
    variable_snapshot: {
      buy: any[];
      sell: any[];
    };
    calc_gen_string: {
      bid: string;
      ask: string;
    };
    created_at: number;
  }
  export interface ProductObject {
    pid?: number;
    name?: string;
    base_symbole?: string;
    is_active?: 0 | 1;
    is_calculated?: '0' | '1';
    is_trading_available?: '0' | '1';
    show_to?: {
      users: 'all' | number[] | boolean;
    };
    number_tofix?: number;
    show_in?: 'comex' | 'base' | 'product';
    calc_id?: number | string;
    calc_base_id?: number;
    variable_snapshot?: {
      buy: any[];
      sell: any[];
    };
    calc_gen_string?: {
      bid: string;
      ask: string;
    };
    ori_variables?: string[];
    calc_string?: string;
    extra?: any;
    ori_calc_string?: string;
    created_at?: number;
    edited_on?: number;
    display_rate_type?: string;
  }
  
  export interface CreateUserObject {
    id?: number;
    first_name: string;
    last_name?: string;
    firm_name: string;
    number: number;
    user_name?: string;
    email_id: string;
    password: string;
    is_active: boolean;
    user_type: string | number;
    settings?: any;
    created_at?: number;
    edited_on?: number;
  }
  export interface userValidationReq {
    user_name?: string;
    email?: string;
    number?: string;
  }
  export interface GetProductReqObj {
    pid?: string | string[];
    name?: string | string[];
    base_symbole?: string | string[];
    is_active?: '0' | '1';
    limit?: number;
    stream?: number;
    get_all?: boolean;
    is_calculated?: '0' | '1';
    show_in?: 'comex' | 'base' | 'product';
    calc_id?: string | string[];
    calc_base_id?: string | string[];
    add_variables_snapshot?: boolean;
    order_by_pid?: boolean;
  }
  
  export interface FirebaseProductList {
    calculated: boolean;
    calculation: ProductCalculationString;
    name: string;
    number_tofixed: number;
    trading_on: boolean;
    calc_id?: any;
    extra?: {
      delivery_date?: string;
    };
    pid: string | number;
    show: string | string[] | number[] | boolean;
    show_in: 'comex' | 'product' | 'base';
    symbole_name: string;
  }
  export interface ProductCalculationString {
    ask: string;
    bid: string;
  }
  export interface GetPopListObjects {
    is_active?: boolean;
    start_date?: string[] | string;
    end_date?: string[] | string;
    created_at?: string[] | string;
    orderby_created_at?: 'desc' | 'asc';
    orderby_start_date?: 'desc' | 'asc';
    orderby_end_date?: 'desc' | 'asc';
    limit?: number;
    stream?: number;
    get_all?: boolean;
    lessthen_postdate?: string;
    greater_postdate?: string;
  }
  export interface popListObject {
    pop_id?: number;
    img_url?: string;
    redirect_url?: string;
    is_active?: boolean;
    config?: 'one' | 'every';
    start_date?: number;
    end_date?: number;
    created_at?: number;
  }
  export interface PlaceOrderReq {
    type: 'market_buy' | 'place_limit' | 'modify_limit' | 'delete_limit';
    market_buy?: PlaceOrderMArketBuy;
    place_limit?: PlaceLimitOrder;
    modify_limit?: ModifyLimitOrder;
    delete_limit?: number;
  }
  export interface ModifyLimitOrder {
    pid?: string | number;
    order_id?: string | number;
    old_price?: number;
    new_price?: number;
    old_weight?: number;
    new_weight?: number;
  }
  export interface PlaceLimitOrder {
    weight: number;
    price: number;
    pid: number;
  }
  export interface PlaceOrderMArketBuy {
    weight: number;
    price: number;
    ori_price: number;
    pid: number;
  }
  export interface GetOrderHistoryObjects {
    sendAll?: boolean;
    id?: string | string[];
    user_id?: string | string[];
    order_type?: 'market' | 'limit';
    product_id?: string | string[];
    user_name?: string;
    base_symbole?: string | string[];
    orders_status?: number | number[];
    price?: string | string[] | number | number[];
    orderby_id?: 'desc' | 'asc';
    orderby_created_at?: 'desc' | 'asc';
    orderby_execute_date?: 'desc' | 'asc';
    limit?: number;
    stream?: number;
    get_all?: boolean;
    lessthen_postdate?: string;
    greater_postdate?: string;
  }
  export interface OrderHistoryObject {
    id?: number;
    order_type?: 'market' | 'limit';
    product_id?: string | number;
    name?: string;
    user_id?: number;
    base_symbole?: string;
    orders_status?: number;
    status_name?: string;
    volume?: number;
    weight?: string | number;
    price?: number;
    original_price?: number;
    calc_id?: number;
    extra?:
      | any
      | {
          delivered?: number;
          note?: string;
        };
    executed_on?: number;
    created_at?: number;
    edited_on?: number;
  }
  export interface OrderHistoryObjectWithUser extends OrderHistoryObject {
    first_name: string;
    firm_name: string;
    number: number;
    user_name?:string;
    email_id: string;
    user_type: number;
  }
  export interface BankDetailsObject {
    id?: number;
    date?: number;
    img_url?: string;
    bank_name?: string;
    ifsc_code?: string;
    branch_name?: string;
    account_number?: number;
    account_name?: string;
  }
  
  export interface PythonLimitPassedResponseObj {
    result?: any;
    extra: {
      symbol: string;
      volume: number;
      price: number;
      type: 'buy' | 'sell';
      order_place_keys: {
        [pid: string]: string[];
      };
    };
    req?: any;
  }
  
  export interface GetAlertReq {
    id?: string | string[];
    one_time_user_id?: any | any[];
    pid?: any | any[];
    price?: any | any[];
    is_active?: '0' | '1' | ['0', '1'];
    orderby_created_at?: 'asc' | 'desc';
    greater_created_at?: string | number;
    addUserData?: boolean;
    addProductData?: boolean;
    great_price?: any;
  }
  
  export interface AlertsObjects {
    id?: number;
    one_time_user_id?: number;
    pid?: number;
    price?: number;
    is_active?: '0' | '1' | 0 | 1;
    created_at?: number;
    passed_at?: number;
    token?: string;
  }
  export interface UserReqObject {
    number?: number;
    email_id?: string;
    user_name?: string;
    get_all?: boolean;
  }
  export interface userLimitedFieldList {
    created_at?: number;
    edited_on?: number;
    email_id?: string;
    firm_name?: string;
    first_name?: string;
    id?: number;
    is_active?: 0 | 1;
    last_name?: string;
    number?: number;
    password?: string;
    user_name?: string;
    user_type?: number;
    settings?: {
      user_margin?: {
        gold?: number;
        silver?: number;
      };
    };
  }
  export interface userListInterface extends userLimitedFieldList {
    type_short_name?: string;
    uset_type_setting?: string;
  }
  
  export interface GetOrdersCountInterface {
    start_date: number;
    end_date: number;
    product_id: number | number[];
    orders_status: number | number[];
    group_by_product?: boolean;
  }
  
  export interface UpdateDeliveryDetailsInterface {
    order_id: number;
    volume: number;
    note: string;
  }
  
  export interface SendSmsVariables {
    mobile: string;
    variable: {
      [key: string]: string;
    };
  }
  