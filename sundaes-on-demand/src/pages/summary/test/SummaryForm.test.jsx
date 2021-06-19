import { render, screen } from "@testing-library/react";
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
    test('responds to hover', () => {
        // starts out hidden

        // appears upon mouseover of checkbox label

        // disappears when mouse out
    });
});