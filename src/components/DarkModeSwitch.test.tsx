import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';

import DarkModeSwitch from './DarkModeSwitch';

describe('DarkModeSwitch component', () => {
    test('renders initially with dark mode off', () => {
        render(<DarkModeSwitch isDarkMode={false} onSwitchChange={() => { }} />);
        const switchElement = screen.getByRole('switch');
        expect(switchElement).toBeInTheDocument();
        expect(switchElement).toHaveAttribute('aria-checked', 'false');
    });

    test('DarkModeSwitch changes mode when clicked', () => {
        const mockOnSwitchChange = jest.fn();
        render(<DarkModeSwitch isDarkMode={false} onSwitchChange={mockOnSwitchChange} />);

        const switchElement = screen.getByRole('switch');
        fireEvent.click(switchElement);

        // Verifique se a função foi chamada pelo menos uma vez
        expect(mockOnSwitchChange).toHaveBeenCalled();

        // Verifique se a função foi chamada com o valor booleano true
        expect(mockOnSwitchChange.mock.calls[0][0]).toBe(true);
    });

    test('renders initially with dark mode on', () => {
        render(<DarkModeSwitch isDarkMode={true} onSwitchChange={() => { }} />);
        const switchElement = screen.getByRole('switch');
        expect(switchElement).toBeInTheDocument();
        expect(switchElement).toHaveAttribute('aria-checked', 'true');
    });

    test('DarkModeSwitch has correct initial styles', () => {
        render(<DarkModeSwitch isDarkMode={false} onSwitchChange={() => { }} />);
        const switchElement = screen.getByRole('switch');

        // Adicione mais expectativas para os estilos conforme necessário
        expect(switchElement).toHaveStyle('position: absolute; top: 10px; left: 10px; background-color: #fff;');
    });
});