export function FareCalculator(distance, time, rateDetails) {
    // Tính giá km cuốc xe
    let gia_mo_cua = parseFloat(rateDetails.min_fare);
    let gia_1km_10 = parseFloat(rateDetails.rate_per_kilometer);
    let gia_1km_10_15 = parseFloat(rateDetails.rate_per_kilometer_10_15);
    let gia_1km_15_30 = parseFloat(rateDetails.rate_per_kilometer_15_30);
    let gia_1km_30_ = parseFloat(rateDetails.rate_per_kilometer_30);
    let price_estimate = gia_mo_cua;
    let khoangcach = parseFloat(distance);

    if (khoangcach >= 0 && khoangcach <= 10) {
        let distance_1 = khoangcach - 1;
        let price_estimate = price_estimate + (gia_1km_10 * distance_1);
    }

    if (khoangcach > 10 && khoangcach <= 15) {
        let distance_2 = khoangcach - 10;
        let price_estimate = price_estimate + (gia_1km_10_15 * distance_2);
    }

    if (khoangcach > 15 && khoangcach <= 30) {
        let distance_3 = khoangcach - 15;
        let price_estimate = price_estimate + (gia_1km_15_30 * distance_3);
    }

    if (khoangcach > 30) {
        let distance_4 = khoangcach - 30;
        let price_estimate = price_estimate + (gia_1km_30_ * distance_4);
    }

    // let baseCalculated = ((parseFloat(rateDetails.rate_per_kilometer) * (parseFloat(distance) / 1000))) + ((parseFloat(rateDetails.rate_per_hour) * (parseFloat(time) / 3600)));

    let baseCalculated = price_estimate;
    let total = baseCalculated;
    let convenienceFee = (total * parseFloat(rateDetails.convenience_fees) / 100);
    let grand = total;

    return {
        totalCost: parseFloat(total.toFixed(2)),
        grandTotal: parseFloat(grand.toFixed(2)),
        convenience_fees: parseFloat(convenienceFee.toFixed(2))
    }
}
