import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Review from '../Review'

// Mock the sanity module
jest.mock('../../sanity', () => ({
  urlFor: jest.fn(() => ({
    width: jest.fn(function() { return this }),
    height: jest.fn(function() { return this }),
    crop: jest.fn(function() { return this }),
    auto: jest.fn(function() { return this }),
    url: jest.fn(() => 'http://example.com/image.jpg'),
  })),
}))

describe('Review Component', () => {
  const mockReview = {
    _key: 'review-1',
    rating: 5,
    traveller: {
      name: 'John Doe',
      image: { asset: { _ref: 'image-123' } },
    },
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders review with rating and traveller name', () => {
    render(<Review review={mockReview} />)
    
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  test('renders delete button', () => {
    render(<Review review={mockReview} />)
    
    const deleteButton = screen.getByRole('button', { name: /delete review/i })
    expect(deleteButton).toBeInTheDocument()
  })

  test('shows confirmation dialog when delete button is clicked', () => {
    render(<Review review={mockReview} />)
    
    const deleteButton = screen.getByRole('button', { name: /delete review/i })
    fireEvent.click(deleteButton)
    
    const confirmationText = screen.getByText(/are you sure you want to delete this review\?/i)
    expect(confirmationText).toBeInTheDocument()
  })

  test('shows confirm and cancel buttons in confirmation dialog', () => {
    render(<Review review={mockReview} />)
    
    const deleteButton = screen.getByRole('button', { name: /delete review/i })
    fireEvent.click(deleteButton)
    
    const confirmButton = screen.getByRole('button', { name: /^delete$/i })
    const cancelButton = screen.getByRole('button', { name: /cancel/i })
    
    expect(confirmButton).toBeInTheDocument()
    expect(cancelButton).toBeInTheDocument()
  })

  test('calls onDelete callback when confirm button is clicked', () => {
    const mockOnDelete = jest.fn()
    render(<Review review={mockReview} onDelete={mockOnDelete} />)
    
    const deleteButton = screen.getByRole('button', { name: /delete review/i })
    fireEvent.click(deleteButton)
    
    const confirmButton = screen.getByRole('button', { name: /^delete$/i })
    fireEvent.click(confirmButton)
    
    expect(mockOnDelete).toHaveBeenCalledWith('review-1')
  })

  test('closes confirmation dialog when cancel button is clicked', () => {
    render(<Review review={mockReview} />)
    
    const deleteButton = screen.getByRole('button', { name: /delete review/i })
    fireEvent.click(deleteButton)
    
    const confirmationText = screen.getByText(/are you sure you want to delete this review\?/i)
    expect(confirmationText).toBeInTheDocument()
    
    const cancelButton = screen.getByRole('button', { name: /cancel/i })
    fireEvent.click(cancelButton)
    
    expect(confirmationText).not.toBeInTheDocument()
  })

  test('does not call onDelete callback when cancel button is clicked', () => {
    const mockOnDelete = jest.fn()
    render(<Review review={mockReview} onDelete={mockOnDelete} />)
    
    const deleteButton = screen.getByRole('button', { name: /delete review/i })
    fireEvent.click(deleteButton)
    
    const cancelButton = screen.getByRole('button', { name: /cancel/i })
    fireEvent.click(cancelButton)
    
    expect(mockOnDelete).not.toHaveBeenCalled()
  })

  test('closes confirmation dialog after confirming deletion', () => {
    const mockOnDelete = jest.fn()
    render(<Review review={mockReview} onDelete={mockOnDelete} />)
    
    const deleteButton = screen.getByRole('button', { name: /delete review/i })
    fireEvent.click(deleteButton)
    
    const confirmButton = screen.getByRole('button', { name: /^delete$/i })
    fireEvent.click(confirmButton)
    
    const confirmationText = screen.queryByText(/are you sure you want to delete this review\?/i)
    expect(confirmationText).not.toBeInTheDocument()
  })
})
