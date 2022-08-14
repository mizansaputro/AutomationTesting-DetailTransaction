import WACommercePage from '../Pages/WACommercePage';
import AdidasPageVer2 from '../Pages/AdidasPageVer2';


fixture`Detail Transaction From WACommercePage`
    .page(WACommercePage.urlPage);

for (let i=0;i<WACommercePage.courierList.length;i++){
    test(`Shipper: ${WACommercePage.courierList[i]}`, async t => {
        await t
            .setTestSpeed(0.5)
            .takeScreenshot(`${i+1}\. WACommerce - Shipper ${WACommercePage.courierList[i]}/1\. main-page`);
        await WACommercePage.fillIdentity();
        await t
            .takeScreenshot(`${i+1}\. WACommerce - Shipper ${WACommercePage.courierList[i]}/2\. main-page-fillIdentity`);
        await WACommercePage.chooseItem("adidas Originals NMD_V3",41,2);
        await t
            .takeScreenshot(`${i+1}\. WACommerce - Shipper ${WACommercePage.courierList[i]}/3\. main-page-selectItem`);
        await t
            .click(WACommercePage.checkout_btn);
        await WACommercePage.fillCheckout_ShippingAddress();
        await t
            .takeScreenshot(`${i+1}\. WACommerce - Shipper ${WACommercePage.courierList[i]}/4\. Shipping-page-fillIdentity`);
        await WACommercePage.chooseCourier(WACommercePage.courierList[i]);
        await t
            .takeScreenshot(`${i+1}\. WACommerce - Shipper ${WACommercePage.courierList[i]}/5\. Shipping-page-fillShipper`);
        await t
            .click(WACommercePage.next_btn);
        await WACommercePage.detailTransaction(`${i+1}\. WACommerce - Shipper ${WACommercePage.courierList[i]}/6\. DetailTransaction-page`,'avana123');
        await t
            .click(WACommercePage.checkout_btn2);
    });
}
fixture`Detail Transaction From Webstore`
    .page(AdidasPageVer2.pageURL);

for (let i=0;i<WACommercePage.courierList.length;i++){
    test(`Shipper: ${WACommercePage.courierList[i]}`, async t => {
        await t
            .setTestSpeed(0.5)
            .takeScreenshot(`${i+1}\. Webstore - Shipper ${WACommercePage.courierList[i]}/1\. main-page`);
        await AdidasPageVer2.selectItem("adidas Originals NMD_V3");
        await AdidasPageVer2.fillDetailItemPage(41,2);
        await t
            .takeScreenshot(`${i+1}\. Webstore - Shipper ${WACommercePage.courierList[i]}/2\. Detail-page`);
        await t
            .click(AdidasPageVer2.checkout_btn);
        await AdidasPageVer2.fillCheckout_ConfirmOrder('avana123');
        await t
            .takeScreenshot(`${i+1}\. Webstore - Shipper ${WACommercePage.courierList[i]}/3\. ConfirmOrder-page`);
        await t
            .click(AdidasPageVer2.checkout_proceed_btn);
        await AdidasPageVer2.fillCheckout_ShippingAddress_BillingAddress();
        await t
            .takeScreenshot(`${i+1}\. Webstore - Shipper ${WACommercePage.courierList[i]}/4\. ShippingAddress-page-BillingAddress`);
        await AdidasPageVer2.fillCheckout_ShippingAddress_Shipper(WACommercePage.courierList[i])
        await t
            .takeScreenshot(`${i+1}\. Webstore - Shipper ${WACommercePage.courierList[i]}/5\. ShippingAddress-page-Shipper`);
        await t
            .click(AdidasPageVer2.checkout_proceed_btn);
        await AdidasPageVer2.assertFillCheckout_ConfrimPayment(`${i+1}\. Webstore - Shipper ${WACommercePage.courierList[i]}/6\. ConfirmPayment-page`);
    });
}
fixture`Compare Detail Transaction From Webstore & WACommerce`

for (let i=0;i<WACommercePage.courierList.length;i++){
    test(`Shipper: ${WACommercePage.courierList[i]} Compare Shipper Rate`, async t => {
        console.log(AdidasPageVer2.dataTransaction_WebStore[i][5]);
        console.log(WACommercePage.dataTransaction_WACommerce[i][5]);
        await t
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][0]).eql(WACommercePage.dataTransaction_WACommerce[i][0],`Name in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][0]}\nName in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][0]}`)
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][1]).eql(WACommercePage.dataTransaction_WACommerce[i][1],`Price in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][1]}\nPrice in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][1]}`)
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][2]).eql(WACommercePage.dataTransaction_WACommerce[i][2],`Size in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][2]}\nSize in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][2]}`)
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][3]).eql(WACommercePage.dataTransaction_WACommerce[i][3],`QTY in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][3]}\nQTY in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][3]}`)
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][4]).eql(WACommercePage.dataTransaction_WACommerce[i][4],`Shipper in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][4]}\nShipper in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][4]}`)
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][5]).eql(WACommercePage.dataTransaction_WACommerce[i][5],`Shipper Rate in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][5]}\nShipper Rate in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][5]}`);
    });
}
for (let i=0;i<WACommercePage.courierList.length;i++){
    test(`Shipper: ${WACommercePage.courierList[i]} Compare Subtotal`, async t => {
        console.log(AdidasPageVer2.dataTransaction_WebStore[i][6]);
        console.log(WACommercePage.dataTransaction_WACommerce[i][6]);
        await t
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][0]).eql(WACommercePage.dataTransaction_WACommerce[i][0],`Name in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][0]}\nName in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][0]}`)
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][1]).eql(WACommercePage.dataTransaction_WACommerce[i][1],`Price in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][1]}\nPrice in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][1]}`)
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][2]).eql(WACommercePage.dataTransaction_WACommerce[i][2],`Size in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][2]}\nSize in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][2]}`)
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][3]).eql(WACommercePage.dataTransaction_WACommerce[i][3],`QTY in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][3]}\nQTY in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][3]}`)
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][4]).eql(WACommercePage.dataTransaction_WACommerce[i][4],`Shipper in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][4]}\nShipper in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][4]}`)
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][6]).eql(WACommercePage.dataTransaction_WACommerce[i][6],`Subtotal in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][6]}\nSubtotal in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][6]}`);
    });
}
for (let i=0;i<WACommercePage.courierList.length;i++){
    test(`Shipper: ${WACommercePage.courierList[i]} Compare Shipper Shipper Rate 2`, async t => {
        console.log(AdidasPageVer2.dataTransaction_WebStore[i][7]);
        console.log(WACommercePage.dataTransaction_WACommerce[i][7]);
        await t
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][0]).eql(WACommercePage.dataTransaction_WACommerce[i][0],`Name in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][0]}\nName in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][0]}`)
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][1]).eql(WACommercePage.dataTransaction_WACommerce[i][1],`Price in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][1]}\nPrice in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][1]}`)
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][2]).eql(WACommercePage.dataTransaction_WACommerce[i][2],`Size in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][2]}\nSize in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][2]}`)
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][3]).eql(WACommercePage.dataTransaction_WACommerce[i][3],`QTY in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][3]}\nQTY in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][3]}`)
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][4]).eql(WACommercePage.dataTransaction_WACommerce[i][4],`Shipper in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][4]}\nShipper in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][4]}`)
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][7]).eql(WACommercePage.dataTransaction_WACommerce[i][7],`Shipper Rate 2 in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][7]}\nShipper Rate 2 in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][7]}`);
    });
}
for (let i=0;i<WACommercePage.courierList.length;i++){
    test(`Shipper: ${WACommercePage.courierList[i]} Compare Shipper Insurance`, async t => {
        console.log(AdidasPageVer2.dataTransaction_WebStore[i][8]);
        console.log(WACommercePage.dataTransaction_WACommerce[i][8]);
        await t
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][0]).eql(WACommercePage.dataTransaction_WACommerce[i][0],`Name in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][0]}\nName in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][0]}`)
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][1]).eql(WACommercePage.dataTransaction_WACommerce[i][1],`Price in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][1]}\nPrice in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][1]}`)
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][2]).eql(WACommercePage.dataTransaction_WACommerce[i][2],`Size in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][2]}\nSize in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][2]}`)
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][3]).eql(WACommercePage.dataTransaction_WACommerce[i][3],`QTY in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][3]}\nQTY in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][3]}`)
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][4]).eql(WACommercePage.dataTransaction_WACommerce[i][4],`Shipper in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][4]}\nShipper in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][4]}`)
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][8]).eql(WACommercePage.dataTransaction_WACommerce[i][8],`Shipper Insurance in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][8]}\nShipper Insurance in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][8]}`);
    });
}
for (let i=0;i<WACommercePage.courierList.length;i++){
    test(`Shipper: ${WACommercePage.courierList[i]} Compare Shipper TAX`, async t => {
        console.log(AdidasPageVer2.dataTransaction_WebStore[i][9]);
        console.log(WACommercePage.dataTransaction_WACommerce[i][9]);
        await t
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][0]).eql(WACommercePage.dataTransaction_WACommerce[i][0],`Name in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][0]}\nName in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][0]}`)
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][1]).eql(WACommercePage.dataTransaction_WACommerce[i][1],`Price in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][1]}\nPrice in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][1]}`)
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][2]).eql(WACommercePage.dataTransaction_WACommerce[i][2],`Size in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][2]}\nSize in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][2]}`)
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][3]).eql(WACommercePage.dataTransaction_WACommerce[i][3],`QTY in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][3]}\nQTY in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][3]}`)
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][4]).eql(WACommercePage.dataTransaction_WACommerce[i][4],`Shipper in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][4]}\nShipper in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][4]}`)
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][9]).eql(WACommercePage.dataTransaction_WACommerce[i][9],`TAX in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][9]}\nTAX in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][9]}`);
    });
}
for (let i=0;i<WACommercePage.courierList.length;i++){
    test(`Shipper: ${WACommercePage.courierList[i]} Compare Disc`, async t => {
        console.log(AdidasPageVer2.dataTransaction_WebStore[i][10]);
        console.log(WACommercePage.dataTransaction_WACommerce[i][10]);
        await t
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][0]).eql(WACommercePage.dataTransaction_WACommerce[i][0],`Name in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][0]}\nName in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][0]}`)
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][1]).eql(WACommercePage.dataTransaction_WACommerce[i][1],`Price in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][1]}\nPrice in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][1]}`)
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][2]).eql(WACommercePage.dataTransaction_WACommerce[i][2],`Size in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][2]}\nSize in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][2]}`)
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][3]).eql(WACommercePage.dataTransaction_WACommerce[i][3],`QTY in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][3]}\nQTY in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][3]}`)
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][4]).eql(WACommercePage.dataTransaction_WACommerce[i][4],`Shipper in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][4]}\nShipper in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][4]}`)
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][10]).eql(WACommercePage.dataTransaction_WACommerce[i][10],`Disc in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][10]}\nDisc in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][10]}`);
    });
}
for (let i=0;i<WACommercePage.courierList.length;i++){
    test(`Shipper: ${WACommercePage.courierList[i]} Compare Total`, async t => {
        console.log(AdidasPageVer2.dataTransaction_WebStore[i][11]);
        console.log(WACommercePage.dataTransaction_WACommerce[i][11]);
        await t
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][0]).eql(WACommercePage.dataTransaction_WACommerce[i][0],`Name in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][0]}\nName in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][0]}`)
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][1]).eql(WACommercePage.dataTransaction_WACommerce[i][1],`Price in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][1]}\nPrice in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][1]}`)
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][2]).eql(WACommercePage.dataTransaction_WACommerce[i][2],`Size in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][2]}\nSize in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][2]}`)
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][3]).eql(WACommercePage.dataTransaction_WACommerce[i][3],`QTY in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][3]}\nQTY in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][3]}`)
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][4]).eql(WACommercePage.dataTransaction_WACommerce[i][4],`Shipper in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][4]}\nShipper in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][4]}`)
            .expect(AdidasPageVer2.dataTransaction_WebStore[i][11]).eql(WACommercePage.dataTransaction_WACommerce[i][11],`Total in WebStore: ${AdidasPageVer2.dataTransaction_WebStore[i][11]}\nTotal in WACommerce: ${WACommercePage.dataTransaction_WACommerce[i][11]}`);
    });
}




    



