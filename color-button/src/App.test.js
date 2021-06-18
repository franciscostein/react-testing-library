import { render, screen, fireEvent } from '@testing-library/react';
import App, { replaceCamelWithSpaces } from './App';

test('button has correct initial color', () => {
	render(<App />);
	const colorButton = screen.getByRole('button', { name: /change to midnight blue/i });	// regex for case insensitive

	expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed' });

	fireEvent.click(colorButton);

	expect(colorButton).toHaveStyle({ backgroundColor: 'MidnightBlue' });
	expect(colorButton).toHaveTextContent('Change to Medium Violet Red');
});

test('initial conditions', () => {
	render(<App />);

	const colorButton = screen.getByRole('button', { name: /change to midnight blue/i });
	expect(colorButton).toBeEnabled();

	const checkbox = screen.getByRole('checkbox');
	expect(checkbox).not.toBeChecked();
});

test('when checkbox is checked, button should be disabled', () => {
	render(<App />);
	const checkbox = screen.getByRole('checkbox', { name: /disable button/i });
	const button = screen.getByRole('button', { name: /change to midnight blue/i });

	fireEvent.click(checkbox);
	expect(button).toBeDisabled();

	fireEvent.click(checkbox);
	expect(button).toBeEnabled();
});

test('button turns gray when disabled and back to its previous color', () => {
	render(<App />);
	const colorButton = screen.getByRole('button', { name: /change to midnight blue/i });
	const checkbox = screen.getByRole('checkbox', { name: /disable button/i });

	// red -> gray
	fireEvent.click(checkbox);
	expect(colorButton).toHaveStyle({ backgroundColor: 'gray' });

	// gray -> red
	fireEvent.click(checkbox);
	expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed' });

	// red -> blue
	fireEvent.click(colorButton);

	// blue -> gray
	fireEvent.click(checkbox);
	expect(colorButton).toHaveStyle({ backgroundColor: 'gray' });

	// gray -> blue
	fireEvent.click(checkbox);
	expect(colorButton).toHaveStyle({ backgroundColor: 'MidnightBlue' });
});

describe('spaces before camelCase capital letters', () => {
	test('works for no inner capital letters', () => {
		expect(replaceCamelWithSpaces('Red')).toBe('Red');
	});

	test('works for one inner capital letter', () => {
		expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
	});

	test('works for multiple inner capital letter', () => {
		expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
	});
})