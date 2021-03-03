import { store } from '../store/store';

export function FareCalculator(distance, time, rateDetails) {
    let settings = store.getState().settingsdata.settings;
    // Tính giá km cuốc xe
    let gia_mo_cua = parseFloat(rateDetails.min_fare);
    let gia_1km_10 = parseFloat(rateDetails.rate_per_kilometer);
    let gia_1km_10_15 = parseFloat(rateDetails.rate_per_kilometer_10_15);
    let gia_1km_15_30 = parseFloat(rateDetails.rate_per_kilometer_15_30);
    let gia_1km_30_ = parseFloat(rateDetails.rate_per_kilometer_30);
    var price_estimate = gia_mo_cua;
    var khoangcach = parseFloat(distance);

    let dis_cal = settings.convert_to_mile ? 1000 : 1;

    if (khoangcach >= (1 * dis_cal)) {
        var distance_1 = khoangcach - (1 * dis_cal);
        if (distance_1 <= (9 * dis_cal)) {
            price_estimate = price_estimate + (gia_1km_10 * distance_1 / (1 * dis_cal));
        } else {
            price_estimate = price_estimate + (gia_1km_10 * (9 * dis_cal) / (1 * dis_cal));
        }
    }

    if (khoangcach > (10 * dis_cal)) {
        var distance_2 = khoangcach - (10 * dis_cal);
        if (distance_2 <= (5 * dis_cal)) {
            price_estimate = price_estimate + (gia_1km_10_15 * distance_2 / 1 * dis_cal);
        } else {
            price_estimate = price_estimate + (gia_1km_10_15 * (5 * dis_cal / 1) * dis_cal);
        }

        console.log('price_estimate10 ' + price_estimate);
    }
    if (khoangcach > (15 * dis_cal)) {
        var distance_3 = khoangcach - (15 * dis_cal);
        if (distance_3 <= (15 * dis_cal)) {
            price_estimate = price_estimate + (gia_1km_15_30 * distance_3 / (1 * dis_cal));
        } else {
            price_estimate = price_estimate + (gia_1km_15_30 * (15 * dis_cal) / (1 * dis_cal));
        }

    }
    if (khoangcach > (30 * dis_cal)) {
        var distance_4 = khoangcach - (30 * dis_cal);
        price_estimate = price_estimate + (gia_1km_30_ * distance_4 / (1 * dis_cal));

    }
    console.log('price_estimate 4 ' + price_estimate);
    // let baseCalculated = ((parseFloat(rateDetails.rate_per_kilometer) * (parseFloat(distance) / 1000))) + ((parseFloat(rateDetails.rate_per_hour) * (parseFloat(time) / 3600)));

    let baseCalculated = price_estimate;
    let total = baseCalculated;
    let convenienceFee = 0;
    if (rateDetails.convenience_fee_type && rateDetails.convenience_fee_type == 'flat') {
        convenienceFee = rateDetails.convenience_fees;
    } else {
        convenienceFee = (total * parseFloat(rateDetails.convenience_fees) / 100);
    }

    let grand = total;

    console.log('convenienceFee ' + convenienceFee);

    return {
        totalCost: parseFloat(total.toFixed(2)),
        grandTotal: parseFloat(grand.toFixed(2)),
        convenience_fees: parseFloat(convenienceFee.toFixed(2))
    }
}
