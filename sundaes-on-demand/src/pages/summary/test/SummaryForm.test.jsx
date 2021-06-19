import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from '../SummaryForm';

describe('checkbox enables button', () => {
    test('initial conditions', () => {
        render(<SummaryForm />);
        const confirmButton = screen.getByRole('button', { name: /confirm order/i });
        const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i });

        expect(checkbox).not.toBeChecked();
        expect(confirmButton).toBeDisabled();
    });

    test('checking checkbox enables button & unchecking disables it', () => {
        render(<SummaryForm />);
        const confirmButton = screen.getByRole('button', { name: /confirm order/i });
        const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i });

        fireEvent.click(checkbox);
        expect(confirmButton).toBeEnabled();

        fireEvent.click(checkbox);
        expect(confirmButton).toBeDisabled();
    });
});