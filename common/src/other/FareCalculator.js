export function FareCalculator(distance,time,rateDetails){
    // Tính giá km cuốc xe
    if(distance < 10){
        let distance_price = parseFloat(rateDetails.rate_per_kilometer);
    }
    let baseCalculated = ((parseFloat(rateDetails.rate_per_kilometer) * (parseFloat(distance) / 1000))) + ((parseFloat(rateDetails.rate_per_hour) * (parseFloat(time) / 3600)));
    let total = baseCalculated > parseFloat(rateDetails.min_fare) ? baseCalculated : parseFloat(rateDetails.min_fare);
    let convenienceFee = (total*parseFloat(rateDetails.convenience_fees)/100);
    let grand = total + convenienceFee;
        
    return {
        totalCost:parseFloat(total.toFixed(2)),
        grandTotal:parseFloat(grand.toFixed(2)),
        convenience_fees:parseFloat(convenienceFee.toFixed(2))
    }
}
