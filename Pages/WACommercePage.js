import { Selector,t } from "testcafe";
import { faker } from '@faker-js/faker';
const _ = require('lodash');
import { ClientFunction } from 'testcafe';

class WACommercePage{
    constructor(){
        this.getURL = ClientFunction(() => window.location.href);
        this.urlPage = 'https://commerce.avana.asia/adidasindonesiaqa';
        this.fullName_input = Selector('#form-customer-name');
        this.phoneCodeHome_select = Selector('#__next > main > div > div:nth-child(2) > div.mb-0 > div > div.react-tel-input > div');
        this.phoneCode_select = Selector('#__next > main > div > div > div.flex.flex-1.flex-col.my-4 > div > div.relative.mt-2 > div.react-tel-input > div > div');
        this.phoneCode_input = Selector('#form-customer-phone');
        this.email_input = Selector('#form-customer-email');
        this.address1_input = Selector('#form-customer-address1');
        this.address2_input = Selector('#form-customer-address2');
        this.country_select = Selector('#form-customer-country');
        //this.country_selectIndonesia = Selector('#list-item-100');
        this.state_select = Selector('#form-customer-state');
        this.state_option = Selector('#input-list').child('li');
        this.city_select = Selector('#form-customer-city');
        this.city_searchInput = Selector('#inputSearch > div > div > div > input');
        //this.city_option = Selector('#input-list').find('li');
        this.postCode_input = Selector('#form-customer-postcode');

        this.itemSearch_input = Selector('#product-search');
        this.cart_btn = Selector('#__next > main > div > div.px-4.-mx-4.relative.flex.flex-col.flex-1.z-10 > div.z-30.sticky.top-0.bg-white.flex.flex-col.flex-1 > div.flex.items-end > div.pb-1 > button');
        this.checkout_btn = Selector('#__next > main > div > div.text-xs.text-center.py-2.sticky.bottom-0.bg-white.z-20 > div > div > div.mb-2 > button');
        this.checkout_btn2 = Selector('#__next > main > div > div > div.invoice__footer.w-full.my-1 > div:nth-child(1) > button > span.MuiButton-label');
        this.next_btn = Selector('#__next > main > div > div > div.invoice__footer.w-full.my-1 > div > button > span.MuiButton-label');
        this.fullname;
        this.courierList = ['JNE','Wahana','SiCepat'];
        this.paymentList1 = ['DANAMON ONLINE BANKING','Danamon VA','Mandiri Virtual Account','Maybank Virtual Account','Permata','BNI Virtual Account','OVO'];
        this.paymentList2 = ['BNI VA','BCA VA','BRI VA','Bank Mandiri VA','KEB Hana Indonesia VA','Bank Permata VA','Bank Danamon VA','CIMB Niaga VA','DANA','Shopeepay (QRIS)'];
        this.courierData = [];
        this.getPrice;
        this.itemCheckoutList = [];
        this.selectCourier = [];
        this.detailTransactionList = [];
        this.itemName;
        this.itemPrice;
        this.itemSize;
        this.itemQty;
        this.shippingName;
        this.shippingRate;
        this.subtotal;
        this.shippingRate2;
        this.shippingInsurance;
        this.tax;
        this.disc;
        this.total;
        this.dataTransaction_WACommerce = [];

    }
    async fillIdentity(fullname=faker.name.firstName()+' '+faker.name.lastName(), phone=faker.phone.number('89#########')){
        this.fullname = fullname;
        await t
            .typeText(this.fullName_input,fullname,{replace:true})
            .typeText(this.phoneCode_input,phone);
    }
    async chooseItem(name='adidas Originals NMD_V3',size=40,quantity=1){
        if (typeof(quantity)=='number'){
            quantity = quantity.toString();
        }
        let itemAll = Selector('#__next > main > div > div.px-4.-mx-4.relative.flex.flex-col.flex-1.z-10 > div:nth-child(2)');
        while (await itemAll.exists){
            await t
                .scrollIntoView(itemAll.nextSibling(), { offsetX: 5, offsetY: 5 });
            let getText = await itemAll.find('div > div.flex.py-4.border-b.border-gray-200 > div.flex.flex-1.items-center.relative > div.flex-1.mx-4 > div.text-sm.leading-4.font-bold.mb-2').textContent;
            if (getText==name){
                let price1 = itemAll.find('div > div.flex.py-4.border-b.border-gray-200 > div.flex.flex-1.items-center.relative > div.flex-1.mx-4 > div.text-sm.leading-2.mb-2.text-neutral-5 > strike');
                let price2 = itemAll.find('div > div.flex.py-4.border-b.border-gray-200 > div.flex.flex-1.items-center.relative > div.flex-1.mx-4 > div.text-sm.font-semibold.text-primary-orange');
                if (await price1.exists){
                    let realPrice = parseInt((await price1.textContent).replace(/^\s+|\s+$/gm,'').replace(/\,/g,'').slice(4));
                    let disc = await itemAll.find('div > div.flex.py-4.border-b.border-gray-200 > div.w-auto.cursor-pointer > div > span > span').textContent;
                    disc = parseInt(disc.slice(0,2));
                    this.getPrice = parseInt((await price2.textContent).replace(/^\s+|\s+$/gm,'').replace(/\,/g,'').slice(4));
                    
                    await t.
                        expect(this.getPrice).eql(realPrice - (disc*realPrice/100));
                }else{
                    this.getPrice = parseInt((await price2.textContent).replace(/^\s+|\s+$/gm,'').replace(/\,/g,'').slice(4));
                }
                let getBuy_btn = itemAll.find('div > div.flex.py-4.border-b.border-gray-200 > div.flex.flex-1.items-center.relative > div.w-auto.z-20 > button');
                await t
                    .click(getBuy_btn);
                let chooseVariation = await this.chooseVariation(size,quantity);
                this.itemName = getText;
                this.itemPrice = this.getPrice;
                this.itemSize = chooseVariation;
                this.itemQty = parseInt(quantity);
                this.itemCheckoutList.push([getText,this.getPrice,getBuy_btn,chooseVariation,parseInt(quantity)]);
                if (chooseVariation==-1){
                    let plusBtn = Selector('#__next > main > div > div.px-4.-mx-4.relative.flex.flex-col.flex-1.z-10 > div:nth-child(3) > div > div.flex.py-4.border-b.border-gray-200 > div.flex.flex-1.items-center.relative > div.w-auto.z-20 > section > button.button.rounded-full.bg-white.border.border-solid.border-neutral-4.h-8.w-8.text-black.focus\\:outline-none.visible');
                    if (quantity>1){
                        for (let i=1;i<quantity;i++){
                            await t
                                .expect(plusBtn.exists).ok('Item out of stock!')
                                .click(plusBtn);
                        }
                    }
                }else{
                    await t
                        .click(Selector('#container-variant > section.sticky.bottom-0.py-4.bg-white > button > span.MuiButton-label'));
                }
                break;
            }
            itemAll = itemAll.nextSibling();
        }
    }
    async chooseVariation(size=40,quantity=1){
        let quantitySelector = Selector('#container-variant > section.flex-1 > div.flex.justify-end > section > input');
        if (await Selector('#container-variant > section.relative.mb-4.flex.items-center.text-lg > span').exists && await Selector('#container-variant > section.relative.mb-4.flex.items-center.text-lg > span').textContent == 'Choose Variations'){
            if (typeof(size)=='number'){
                size = size.toString();
            }
            let sizeChoose = Selector('#container-variant > section.flex-1 > div.flex.flex-col > div > div:nth-child(2) > div > button:nth-child(1)');
            while (await sizeChoose.exists){
                let getSize = await sizeChoose.textContent;
               
                if (getSize==size){
                    if (typeof(quantity)=='number'){
                        quantity = quantity.toString();
                    }
                    await t
                        .click(sizeChoose)
                        .typeText(quantitySelector,quantity,{replace:true});
                    
                    let beforeDisc = Selector('#container-variant > section:nth-child(2) > div.flex.flex-col.mb-4 > div.flex.items-center > div.mr-2.line-through');
                    let realPrice = parseInt((await Selector('#container-variant > section:nth-child(2) > div.flex.flex-col.mb-4 > div.font-semibold.text-primary-orange').textContent).replace(/^\s+|\s+$/gm,'').replace(/\,/g,'').slice(4));
                    if (await beforeDisc.exists){
                        beforeDisc = parseInt((await beforeDisc.textContent).replace(/^\s+|\s+$/gm,'').replace(/\,/g,'').slice(4));
                        let disc = parseInt((await Selector('#container-variant > section:nth-child(2) > div.flex.flex-col.mb-4 > div.flex.items-center > div.p-1.text-white.bg-red-500').textContent).slice(0,2));
                       
                        this.getPrice = realPrice;
                        await t 
                            .expect(realPrice).eql(beforeDisc-(disc*beforeDisc/100));
                    }else{
                        this.getPrice = realPrice;
                    }

                    return size;
                }
                sizeChoose = sizeChoose.nextSibling();
            }
        }
        return -1;
    }
    async fillCheckout_ShippingAddress(country='Indonesia',
        state='Bali',
        city='UBUD',
        postcode=faker.random.numeric(5),
        address1=faker.address.streetAddress(),
        address2=faker.address.streetAddress()){
        
        await t
            .typeText(this.email_input,this.fullname+`${faker.random.numeric(2)}@gmail.com`)
            .typeText(this.address1_input,address1,{replace:true})
            .typeText(this.address2_input,address2,{replace:true})
            .click(this.country_select)
        
        let countrySel = Selector('#list-item-100');
        while (await countrySel.exists){
            if (await countrySel.find('div').textContent==country){
                await t
                    .click(countrySel);
                break;
            }
            countrySel = countrySel.nextSibling();
        }

        await t
            .click(this.state_select);
        
        while (await this.state_option.exists){
            if (await this.state_option.find('div').textContent==state){
                await t
                    .click(this.state_option);
                break;
            }
            this.state_option = this.state_option.nextSibling();
        }

        await t
            .click(this.city_select)
            .typeText(this.city_searchInput,city,{replace:true});
        let city_option = Selector('#input-list').find('li');
        while (await city_option.exists){
            
            if ( (await city_option.find('div').textContent).toLowerCase().includes(city.toLowerCase())){
                await t
                    .click(city_option);
            }
            city_option = city_option.nextSibling();
        }
        await t
            .typeText(this.postCode_input,postcode,{replace:true});
    }
    async getCourierData(){
        let courier_input = Selector('#form-shipper-courier')
        if (await courier_input.exists){
            for (let i=0;i<this.courierList.length;i++){
                await t
                    .typeText(courier_input,this.courierList[i],{replace:true})
                    .click(Selector('#form-shipper-courier-option-0'));
                
                let servisSelector = Selector('#form-shipper-service');
                await t
                    .click(servisSelector);
                
                let servisText = await Selector('#form-shipper-service-option-0').textContent;
                await t
                    .click(Selector('#form-shipper-service-option-0'));
                let asuransiText = await Selector('#form-shipper-insurance > option:nth-child(2)').textContent;
                this.courierData.push([this.courierList[i],parseInt(servisText.slice(servisText.indexOf('-')+2,servisText.indexOf('(')-1)),asuransiText]);
            }   
            return this.courierData;         
        }
    }
    async chooseCourier(name){
        let courier_input = Selector('#form-shipper-courier')
        if (await courier_input.exists){
            await t
                .typeText(courier_input,name,{replace:true})
                .click(Selector('#form-shipper-courier-option-0'));
                
            let servisSelector = Selector('#form-shipper-service');
            await t
                .click(servisSelector);
                
            let servisText = await Selector('#form-shipper-service-option-0').textContent;
            await t
                .click(Selector('#form-shipper-service-option-0'));
            let asuransiText = await Selector('#form-shipper-insurance > option:nth-child(2)').textContent;
            this.shippingName = name;
            this.shippingRate = parseInt(servisText.slice(servisText.indexOf('-')+2,servisText.indexOf('(')-1));
            this.selectCourier.push(name,parseInt(servisText.slice(servisText.indexOf('-')+2,servisText.indexOf('(')-1)),asuransiText);

        }
    }
    async detailTransaction(ss,coupon=''){
        await t 
            .wait(5000);
        this.subtotal = parseInt((await Selector('#__next > main > div > div > div.flex.flex-1.flex-col.my-4 > div > div:nth-child(4) > div:nth-child(1) > span:nth-child(2)').textContent).replace(/^\s+|\s+$/gm,'').replace(/\,/g,'').slice(4));
        this.shippingRate2 = parseInt((await Selector('#__next > main > div > div > div.flex.flex-1.flex-col.my-4 > div > div:nth-child(4) > div:nth-child(2) > span:nth-child(2)').textContent).replace(/^\s+|\s+$/gm,'').replace(/\,/g,'').slice(4));
        this.shippingInsurance = parseInt((await Selector('#__next > main > div > div > div.flex.flex-1.flex-col.my-4 > div > div:nth-child(4) > div:nth-child(3) > span:nth-child(2)').textContent).replace(/^\s+|\s+$/gm,'').replace(/\,/g,'').slice(4));
        this.tax = parseInt((await Selector('#__next > main > div > div > div.flex.flex-1.flex-col.my-4 > div > div:nth-child(4) > div:nth-child(4) > span:nth-child(2)').textContent).replace(/^\s+|\s+$/gm,'').replace(/\,/g,'').slice(4));
        this.disc = parseInt((await Selector('#__next > main > div > div > div.flex.flex-1.flex-col.my-4 > div > div:nth-child(4) > div:nth-child(5) > span:nth-child(2)').textContent).replace(/^\s+|\s+$/gm,'').replace(/\,/g,'').slice(4));
        this.total = parseInt((await Selector('#__next > main > div > div > div.flex.flex-1.flex-col.my-4 > div > div:nth-child(4) > h6 > div > span:nth-child(2)').textContent).replace(/^\s+|\s+$/gm,'').replace(/\,/g,'').slice(4));
        
        if  (coupon.length!=0){
            let couponSel = Selector('#coupon');
            let apply_btn = Selector('#__next > main > div > div > div.flex.flex-1.flex-col.my-4 > div > section > div.flex-1.mt-10 > button');
            await t 
                .typeText(couponSel,coupon,{replace:true})
                .click(apply_btn);
            this.subtotal = parseInt((await Selector('#__next > main > div > div > div.flex.flex-1.flex-col.my-4 > div > div:nth-child(4) > div:nth-child(1) > span:nth-child(2)').textContent).replace(/^\s+|\s+$/gm,'').replace(/\,/g,'').slice(4));
            this.shippingRate2 = parseInt((await Selector('#__next > main > div > div > div.flex.flex-1.flex-col.my-4 > div > div:nth-child(4) > div:nth-child(2) > span:nth-child(2)').textContent).replace(/^\s+|\s+$/gm,'').replace(/\,/g,'').slice(4));
            this.shippingInsurance = parseInt((await Selector('#__next > main > div > div > div.flex.flex-1.flex-col.my-4 > div > div:nth-child(4) > div:nth-child(3) > span:nth-child(2)').textContent).replace(/^\s+|\s+$/gm,'').replace(/\,/g,'').slice(4));
            this.tax = parseInt((await Selector('#__next > main > div > div > div.flex.flex-1.flex-col.my-4 > div > div:nth-child(4) > div:nth-child(4) > span:nth-child(2)').textContent).replace(/^\s+|\s+$/gm,'').replace(/\,/g,'').slice(4));
            this.disc = parseInt((await Selector('#__next > main > div > div > div.flex.flex-1.flex-col.my-4 > div > div:nth-child(4) > div:nth-child(5) > span:nth-child(2)').textContent).replace(/^\s+|\s+$/gm,'').replace(/\,/g,'').slice(4));
            this.total = parseInt((await Selector('#__next > main > div > div > div.flex.flex-1.flex-col.my-4 > div > div:nth-child(4) > h6 > div > span:nth-child(2)').textContent).replace(/^\s+|\s+$/gm,'').replace(/\,/g,'').slice(4));
            //    let checkout_btn = Selector('#__next > main > div > div > div.invoice__footer.w-full.my-1 > div:nth-child(1) > button > span.MuiButton-label');
        }
        this.dataTransaction_WACommerce.push([this.itemName,this.itemPrice,
            this.itemSize, this.itemQty,
            this.shippingName, this.shippingRate,
            this.subtotal, this.shippingRate2,
            this.shippingInsurance, this.tax,
            this.disc, this.total]);
        await t
            .takeScreenshot(ss);
        //[getText,this.getPrice,getBuy_btn,chooseVariation,parseInt(quantity)]
        //this.detailTransactionList.push(this.itemCheckoutList[0][0],this.itemCheckoutList[0][1],this.itemCheckoutList[0][3],this.itemCheckoutList[0][4],this.selectCourier[0],this.selectCourier[1],subtotal,shippingRate,shippingInsurance,tax,disc,total);
        await t
            .expect(this.subtotal).eql(this.itemCheckoutList[0][1]*this.itemCheckoutList[0][4],`Different price between subtotal & item price`)
            .expect(this.shippingRate2).eql(this.shippingRate,`Different price in shipping rate`)
            .expect(this.total).eql(this.subtotal+this.tax+this.shippingRate2+this.shippingInsurance-this.disc,`Total inccorect!`);
    }
    async confirmPayment(payment='DANAMON ONLINE BANKING'){
        if (this.paymentList1.includes(payment)){
            await t
                .click(Selector('#__next > main > div > div > div.flex.flex-1.flex-col.my-4 > div > label:nth-child(1)'))
                .click(Selector('#__next > main > div > div > div.invoice__footer.w-full.my-1 > div:nth-child(1) > button > span.MuiButton-label'))
                .click(Selector('#payment_options'))
                .click(Selector('#payment_options > option').withText(payment))
                .click(Selector('#shippingDetails > div.buttonArea > div.next_button > a'));
        }else{
            await t
                .click(Selector('#__next > main > div > div > div.flex.flex-1.flex-col.my-4 > div > label:nth-child(2)'))
                .click(Selector('#__next > main > div > div > div.invoice__footer.w-full.my-1 > div:nth-child(1) > button > span.MuiButton-label'))
                .click(Selector('#channel'))
                .click(Selector('#channel > option').withText(payment))
                .click(Selector('#shippingDetails > div.buttonArea > div.next_button'));
        }
    }

}

export default new WACommercePage();