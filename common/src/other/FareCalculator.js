export function FareCalculator(distance,time,rateDetails){
    // Tính giá km cuốc xe
    let gia_mo_cua = parseFloat(rateDetails.min_fare);
    let gia_1km_10 = parseFloat(rateDetails.rate_per_kilometer);
    let gia_1km_10_15 = parseFloat(rateDetails.rate_per_kilometer_10_15);
    let gia_1km_15_30 = parseFloat(rateDetails.rate_per_kilometer_15_30);
    let gia_1km_30_ = parseFloat(rateDetails.rate_per_kilometer_30);
    var price_estimate = gia_mo_cua;
    console.log('khoangcach 1 ' + distance);
    var khoangcach = parseFloat(distance);
    console.log('khoangcach ' + khoangcach);
    if (khoangcach >= 1000) {
        var distance_1 = khoangcach - 1000;
        if (distance_1 <= 9000) {
            price_estimate = price_estimate + (gia_1km_10 * distance_1 / 1000);
        } else {
            price_estimate = price_estimate + (gia_1km_10 * 9000 / 1000);
        }
    }
    console.log('price_estimate ' + price_estimate);

    if (khoangcach > 10000) {
        var distance_2 = khoangcach - 10000;
        if (distance_2 <= 5000) {
            price_estimate = price_estimate + (gia_1km_10_15 * distance_2 / 1000);
        } else {
            price_estimate = price_estimate + (gia_1km_10_15 * 5000 / 1000);
        }

        console.log('price_estimate10 ' + price_estimate);
    }
    console.log('price_estimate 2 ' + price_estimate);
    if (khoangcach > 15000) {
        var distance_3 = khoangcach - 15000;
        if (distance_3 <= 15000) {
            price_estimate = price_estimate + (gia_1km_15_30 * distance_3 / 1000);
        } else {
            price_estimate = price_estimate + (gia_1km_15_30 * 15000 / 1000);
        }

    }
    console.log('price_estimate 3 ' + price_estimate);
    if (khoangcach > 30000) {
        var distance_4 = khoangcach - 30000;
        price_estimate = price_estimate + (gia_1km_30_ * distance_4 / 1000);

    }
    console.log('price_estimate 4 ' + price_estimate);
    // let baseCalculated = ((parseFloat(rateDetails.rate_per_kilometer) * (parseFloat(distance) / 1000))) + ((parseFloat(rateDetails.rate_per_hour) * (parseFloat(time) / 3600)));

    let baseCalculated = price_estimate;
    let total = baseCalculated;
    let convenienceFee = (total * parseFloat(rateDetails.convenience_fees) / 100);
    let grand = total;

    console.log('convenienceFee ' + convenienceFee);









    /*let baseCalculated =  (parseFloat(rateDetails.rate_per_unit_distance) * parseFloat(distance)) + (parseFloat(rateDetails.rate_per_hour) * (parseFloat(time) / 3600));
    if(rateDetails.base_fare>0){
        baseCalculated = baseCalculated + rateDetails.base_fare;
    }
    let total = baseCalculated > parseFloat(rateDetails.min_fare) ? baseCalculated : parseFloat(rateDetails.min_fare);
    let convenienceFee = 0;
    if(rateDetails.convenience_fee_type && rateDetails.convenience_fee_type == 'flat'){
        convenienceFee = rateDetails.convenience_fees;
    }else{
        convenienceFee = (total*parseFloat(rateDetails.convenience_fees)/100);
    }
    let grand = total + convenienceFee;*/
        
    return {
        totalCost:parseFloat(total.toFixed(2)),
        grandTotal:parseFloat(grand.toFixed(2)),
        convenience_fees:parseFloat(convenienceFee.toFixed(2))
    }
}
