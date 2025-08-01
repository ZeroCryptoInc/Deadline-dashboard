// Mock data for deadline tracker
export const mockDeadlines = [
  {
    id: '1',
    name: 'Maria',
    task: 'Complete project presentation slides',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
  },
  {
    id: '2', 
    name: 'Carlos',
    task: 'Submit quarterly report',
    dueDate: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(), // 5 hours from now
  },
  {
    id: '3',
    name: 'Ana',
    task: 'Client meeting prep',
    dueDate: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes from now
  },
  {
    id: '4',
    name: 'Pedro',
    task: 'Review and approve budget proposal for next quarter',
    dueDate: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour overdue
  }
];