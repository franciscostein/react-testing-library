import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import SummaryForm from '../SummaryForm';

describe('checkbox', () => {
    test('initial conditions', () => {
        render(<SummaryForm />);
        const confirmButton = screen.getByRole('button', { name: /confirm order/i });
        const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i });

        expect(checkbox).not.toBeChecked();
        expect(confirmButton).toBeDisabled();
    });

    test('checking enables button & unchecking disables it', () => {
        render(<SummaryForm />);
        const confirmButton = screen.getByRole('button', { name: /confirm order/i });
        const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i });

        userEvent.click(checkbox);
        expect(confirmButton).toBeEnabled();

        userEvent.click(checkbox);
        expect(confirmButton).toBeDisabled();
    });
});

describe('popover', () => {
    test('responds to hover', async () => {
        render(<SummaryForm />);
        const termsAndConditons = screen.getByText(/terms and conditions/i);

        // starts out hidden
        const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
        expect(nullPopover).not.toBeInTheDocument();

        // appears upon mouseover of checkbox label
        userEvent.hover(termsAndConditons);
        const popover = screen.getByText(/no ice cream will actually be delivered/i);
        expect(popover).toBeInTheDocument();

        // disappears when mouse out
        userEvent.unhover(termsAndConditons);
        await waitForElementToBeRemoved(() => screen.queryByText(/no ice cream will actually be delivered/i));
    });
});