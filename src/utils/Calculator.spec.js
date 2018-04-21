import Calculator from "../utils/Calculator";

test('calculate HRA using amount exceeded over 10 percent of basic pay', () => {
    expect(Calculator.calculateHRA(800000, 8300, false, 500000)).toEqual({
        hraFromEmployer: 500000,
        percentFromBasic: 320000,
        metro: false,
        rentOverTenPercentBasic: 19600,
        hraExempted: 19600
    });
    expect(Calculator.calculateHRA(800000, 12500, false, 500000)).toEqual({
        hraFromEmployer: 500000,
        percentFromBasic: 320000,
        metro: false,
        rentOverTenPercentBasic: 70000,
        hraExempted: 70000
    });
});

test('calculate HRA using 40% of basic for a non metro city', () => {
    const expectedHRADetails = {
        hraFromEmployer: 500000,
        percentFromBasic: 320000,
        metro: false,
        rentOverTenPercentBasic: 400000,
        hraExempted: 320000
    };
    expect(Calculator.calculateHRA(800000, 40000, false, 500000)).toEqual(expectedHRADetails);
});

test('calculate HRA using 50% of basic for a metro city', () => {
    const expectedHRADetails = {
        "hraExempted": 400000,
        "hraFromEmployer": 600000,
        "metro": true,
        "percentFromBasic": 400000,
        "rentOverTenPercentBasic": 520000
    };

    expect(Calculator.calculateHRA(800000, 50000, true, 600000)).toEqual(expectedHRADetails);
});

test('calculate HRA using hra received from employer', () => {
    const expectedHRADetails = {
        hraFromEmployer: 300000,
        percentFromBasic: 400000,
        metro: true,
        rentOverTenPercentBasic: 520000,
        hraExempted: 300000
    };
    expect(Calculator.calculateHRA(800000, 50000, true, 300000)).toEqual(expectedHRADetails);
});

test('should return just values as 0 when monthly rent is 0', () => {
    const expectedHRADetails = {
        hraFromEmployer: 300000,
        percentFromBasic: 400000,
        metro: true,
        rentOverTenPercentBasic: 0,
        hraExempted: 0
    };
    expect(Calculator.calculateHRA(800000, 0, true, 300000)).toEqual(expectedHRADetails);
});