import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Sidebar from '../SideBar'
// Tests block steps
// #1 Render a component to test
// #2 Find elements in the component
// #3 Interact with the elements
// #4 Confirm results are expected

test('renders patients registered', async () => {
    render(<Sidebar/>)
    const myElement = screen.getByText(/عدد الحلات المسجلة/i)
    expect(myElement).toBeInTheDocument()
})