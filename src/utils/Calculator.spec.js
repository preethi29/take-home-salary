import Calculator from "../utils/Calculator";

test('calculate HRA using amount exceeded over 10 percent of basic pay', () => {
    expect(Calculator.calculateHRA(800000, 8300, false)).toBe(19600);
    expect(Calculator.calculateHRA(800000, 12500, false)).toBe(70000);
});

test('calculate HRA using 40% of basic for a non metro city', () => {
    expect(Calculator.calculateHRA(800000, 40000, false)).toBe(320000);
});

test('calculate HRA using 50% of basic for a metro city', () => {
    expect(Calculator.calculateHRA(800000, 50000, true)).toBe(400000);
});

test('calculate HRA using hra received from employer', () => {
    expect(Calculator.calculateHRA(800000, 50000, true, 300000)).toBe(300000);
});