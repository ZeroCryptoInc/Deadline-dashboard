// Mock data for deadline tracker
export const mockDeadlines = [
  {
    id: '1',
    name: 'Maria',
    task: 'Complete project presentation slides',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // Created 5 days ago
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // Due in 2 days
  },
  {
    id: '2', 
    name: 'Carlos',
    task: 'Submit quarterly report',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // Created 2 days ago
    dueDate: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(), // Due in 5 hours
  },
  {
    id: '3',
    name: 'Ana',
    task: 'Client meeting prep',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // Created 4 hours ago
    dueDate: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // Due in 30 minutes
  },
  {
    id: '4',
    name: 'Pedro',
    task: 'Review and approve budget proposal for next quarter',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // Created 7 days ago
    dueDate: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // Overdue by 1 hour
  }
];