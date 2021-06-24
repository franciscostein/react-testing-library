import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';

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