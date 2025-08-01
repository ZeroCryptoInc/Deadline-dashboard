// Mock data for deadline tracker
export const mockDeadlines = [
  {
    id: '1',
    name: 'Maria',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
  },
  {
    id: '2', 
    name: 'Carlos',
    dueDate: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(), // 5 hours from now
  },
  {
    id: '3',
    name: 'Ana',
    dueDate: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes from now
  },
  {
    id: '4',
    name: 'Pedro',
    dueDate: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour overdue
  }
];