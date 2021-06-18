import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('button has correct initial color', () => {
	render(<App />);
	const colorButton = screen.getByRole('button', { name: /change to blue/i });	// regex for case insensitive

	expect(colorButton).toHaveStyle({ backgroundColor: 'red' });

	fireEvent.click(colorButton);

	expect(colorButton).toHaveStyle({ backgroundColor: 'blue' });
	expect(colorButton.textContent).toBe('Change to red');
});

test('initial conditions', () => {
	render(<App />);

	const colorButton = screen.getByRole('button', { name: /change to blue/i });
	expect(colorButton).toBeEnabled();

	const checkbox = screen.getByRole('checkbox');
	expect(checkbox).not.toBeChecked();
});

test('when checkbox is checked, button should be disabled', () => {
	render(<App />);
	const checkbox = screen.getByRole('checkbox', { name: /disable button/i });
	const button = screen.getByRole('button', { name: /change to blue/i });

	fireEvent.click(checkbox);
	expect(button).toBeDisabled();

	fireEvent.click(checkbox);
	expect(button).toBeEnabled();
});

test('button turns gray when disabled', () => {
	render(<App />);
	const colorButton = screen.getByRole('button', { name: /change to blue/i });
	const checkbox = screen.getByRole('checkbox', { name: /disable button/i });

	// red -> gray
	fireEvent.click(checkbox);
	expect(colorButton).toHaveStyle({ backgroundColor: 'gray' });

	// gray -> red
	fireEvent.click(checkbox);
	expect(colorButton).toHaveStyle({ backgroundColor: 'red' });

	// red -> blue
	fireEvent.click(colorButton);

	// blue -> gray
	fireEvent.click(checkbox);
	expect(colorButton).toHaveStyle({ backgroundColor: 'gray' });

	// gray -> blue
	fireEvent.click(checkbox);
	expect(colorButton).toHaveStyle({ backgroundColor: 'blue' });
});