import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('order phases for happy path', async () => {
    render(<App />);

    // add ice cream scoops and toppings
    const chocolateInput = await screen.findByRole('spinbutton', { name: /chocolate/i });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, '3');

    const hotFudgeCheckbox = await screen.findByRole('checkbox', { name: /hot fudge/i });
    userEvent.click(hotFudgeCheckbox);

    // find and click order button
    const orderButton = screen.getByRole('button', { name: /order sundae!/i });
    userEvent.click(orderButton);

    // check summary information based on order
    const scoopsTotal = screen.getByRole('heading', { name: /scoops: \$/i });
    expect(scoopsTotal).toHaveTextContext('6.00');

    const toppingsTotal = screen.getByRole('heading', { name: /toppings \$/i });
    expect(toppingsTotal).toHaveTextContext('1.50');

    const total = screen.getByRole('heading', { name: /total/i });
    expect(total).toHaveTextContext('7.50');

    // accept terms and conditions and click button to cofirm order
    const termsAndConditionsCheckbox = screen.getByRole('checkbox', { name: /terms and conditions/i });
    userEvent.click(termsAndConditionsCheckbox);

    const confirmButton = screen.getByRole('button', { name: /confirm order/i });
    userEvent.click(confirmButton);

    // confirm order number on confirmation page
    const orderNumber = screen.getByRole('heading', { name: /your order number is \$/i });
    expect(orderNumber).toHaveTextContext('73951087903');

    // click new order button on confirmation page
    const newOrderButton = screen.getByRole('button', { name: /create new order/i });
    userEvent.click(newOrderButton);

    //check that scoops and toppings subtotals have been reset
    const grandTotal = screen.getByRole('heading', { name: /grand total: \&/i });
    expect(grandTotal).toHaveTextContext('0.00');
});