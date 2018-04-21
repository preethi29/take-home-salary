import Calculator from "../utils/Calculator";

test('calculate HRA using amount exceeded over 10 percent of basic pay', () => {
    let hraFromEmployer = 500000;
    let percentFromBasic = 320000;
    let rentOverTenPercentBasic = 19600;
    let metro = false;
    let monthlyRent = 8300;
    let basic = 800000;
    let grossSalary = 800000;
    const expectedHRADetails = {
        hraFromEmployer, percentFromBasic, metro, rentOverTenPercentBasic, monthlyRent,
        defaultHraFromEmployer: 200000,
        hraExempted: rentOverTenPercentBasic
    };
    expect(Calculator.calculateHRA(grossSalary, basic, {
        monthlyRent,
        metro,
        hraFromEmployer
    })).toEqual(expectedHRADetails);

});

test('calculate HRA using 40% of basic for a non metro city', () => {
    let hraFromEmployer = 500000;
    let percentFromBasic = 320000;
    let rentOverTenPercentBasic = 400000;
    let metro = false;
    let monthlyRent = 40000;
    let basic = 800000;
    let grossSalary = 800000;
    const expectedHRADetails = {
        hraFromEmployer, percentFromBasic, metro, rentOverTenPercentBasic, monthlyRent,
        defaultHraFromEmployer: 200000,
        hraExempted: percentFromBasic
    };
    expect(Calculator.calculateHRA(grossSalary, basic, {
        monthlyRent,
        metro,
        hraFromEmployer
    })).toEqual(expectedHRADetails);
});

test('calculate HRA using 50% of basic for a metro city', () => {
    let hraFromEmployer = 600000;
    let percentFromBasic = 400000;
    let rentOverTenPercentBasic = 520000;
    let metro = true;
    let monthlyRent = 50000;
    let basic = 800000;
    let grossSalary = 800000;
    const expectedHRADetails = {
        hraFromEmployer, percentFromBasic, metro, rentOverTenPercentBasic, monthlyRent,
        defaultHraFromEmployer: 200000,
        hraExempted: percentFromBasic
    };
    expect(Calculator.calculateHRA(grossSalary, basic, {
        monthlyRent,
        metro,
        hraFromEmployer
    })).toEqual(expectedHRADetails);
});

test('calculate defaultHRAFromEmployer and HRA using hra received from employer', () => {
    let hraFromEmployer = 300000;
    let percentFromBasic = 400000;
    let rentOverTenPercentBasic = 520000;
    let metro = true;
    let monthlyRent = 50000;
    let basic = 800000;
    let grossSalary = 800000;
    const expectedHRADetails = {
        hraFromEmployer, percentFromBasic, metro, rentOverTenPercentBasic, monthlyRent,
        defaultHraFromEmployer: 200000,
        hraExempted: hraFromEmployer
    };
    expect(Calculator.calculateHRA(grossSalary, basic, {
        monthlyRent,
        metro,
        hraFromEmployer
    })).toEqual(expectedHRADetails);
});

test('should return just values as 0 when monthly rent is 0', () => {
    let grossSalary = 800000;
    let hraFromEmployer = 300000;
    let monthlyRent = 0;
    let percentFromBasic = 400000;
    let metro = true;
    const expectedHRADetails = {
        hraFromEmployer,
        percentFromBasic,
        metro,
        monthlyRent,
        rentOverTenPercentBasic: 0,
        hraExempted: 0,
        defaultHraFromEmployer: 200000,
    };
    expect(Calculator.calculateHRA(grossSalary, 800000, {
        monthlyRent,
        metro,
        hraFromEmployer
    })).toEqual(expectedHRADetails);
});