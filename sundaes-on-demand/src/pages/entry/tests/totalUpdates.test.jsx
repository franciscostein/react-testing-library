import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

test('update scoop subtotal when scoops change', async () => {
    render(<Options optionType="scoops" />);

    // make sure total starts out at $0.00
    const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
    expect(scoopsSubtotal).toHaveTextContent('0.00');

    // update vanilla scoops to 1 and check the subtotal
    const vanillaInput = await screen.findByRole('spinbutton', { name: /vanilla/i });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');  // $1.00 each
    expect(scoopsSubtotal).toHaveTextContent('2.00');

    // update chocolate scoops to 2 and check subtotal
    const chocolateInput = await screen.findByRole('spinbutton', { name: /chocolate/i });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, '2');  // $2.00 each
    expect(scoopsSubtotal).toHaveTextContent('6.00');
});

test('check and uncheck toppings update subtotal', async () => {
    render(<Options optionType="toppings" />);

    const toppingsSubtotal = screen.getByText('Toppings total: $', { exact: false });
    expect(toppingsSubtotal).toHaveTextContent('0.00');

    const cherriesCheckbox = await screen.findByRole('checkbox', { name: /cherries/i })
    userEvent.click(cherriesCheckbox);
    expect(toppingsSubtotal).toHaveTextContent('1.50');

    const hotFudgeCheckbox = await screen.findByRole('checkbox', { name: /hot fudge/i });
    userEvent.click(hotFudgeCheckbox);
    expect(toppingsSubtotal).toHaveTextContent('3.00');

    userEvent.click(cherriesCheckbox);
    expect(toppingsSubtotal).toHaveTextContent('1.50');
});

describe('grand total', () => {
    test('updates properly if scoop is added first', async () => {
        render(<OrderEntry />);

        const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i });
        expect(grandTotal).toHaveTextContent('0.00');

        const chocolateInput = await screen.findByRole('spinbutton', { name: /chocolate/i });
        userEvent.clear(chocolateInput);
        userEvent.type(chocolateInput, '3');    // $2.00 each
        expect(grandTotal).toHaveTextContent('6.00');

        const hotFudgeCheckbox = await screen.findByRole('checkbox', { name: /hot fudge/i });
        userEvent.click(hotFudgeCheckbox);  // $1.50
        expect(grandTotal).toHaveTextContent('7.50');
    });

    test('updates properly if topping is added first', async () => {
        render(<OrderEntry />);

        const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i });

        const mAndMsCheckbox = await screen.findByRole('checkbox', { name: /M&Ms/i });
        userEvent.click(mAndMsCheckbox);
        expect(grandTotal).toHaveTextContent('1.50');

        const vanillaInput = await screen.findByRole('spinbutton', { name: /vanilla/i });
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '1');
        expect(grandTotal).toHaveTextContent('3.50');
    });

    test('updates properly if item is removed', async () => {
        render(<OrderEntry />);

        const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i });

        const chocolateInput = await screen.findByRole('spinbutton', { name: /chocolate/i });
        userEvent.clear(chocolateInput);
        userEvent.type(chocolateInput, '7');
        expect(grandTotal).toHaveTextContent('14.00');

        const cherriesCheckbox = await screen.findByRole('checkbox', { name: /cherries/i });
        userEvent.click(cherriesCheckbox);
        expect(grandTotal).toHaveTextContent('15.50');

        userEvent.clear(chocolateInput);
        userEvent.type(chocolateInput, '5');
        expect(grandTotal).toHaveTextContent('11.50');

        userEvent.click(cherriesCheckbox);
        expect(grandTotal).toHaveTextContent('10.00');
    });
});