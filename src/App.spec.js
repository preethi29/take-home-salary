import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';


describe('calculate income tax', () => {
    it('should return 0 for if income under non taxable income', () => {
        expect(App._calculateIncomeTax(230000)).toEqual(0);
    });

    it('should calculate income tax for income with 5% slab rate', () => {
        let calculateIncomeTax = App._calculateIncomeTax(300000);
        expect(calculateIncomeTax).toEqual(2500);
    });

    it('should calculate income tax for income with 20% slab rate', () => {
        expect(App._calculateIncomeTax(570000)).toEqual(26500);
    });

    it('should calculate income tax for income with 30% slab rate', () => {
        expect(App._calculateIncomeTax(1570000)).toEqual(283500);
    });


});
