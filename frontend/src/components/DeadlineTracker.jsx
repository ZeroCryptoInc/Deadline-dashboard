import React, { useState, useEffect } from 'react';
import { Clock, Plus, X, Edit3, MoreVertical } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Card } from './ui/card';
import { mockDeadlines } from '../mock';

const DeadlineTracker = () => {
  const [deadlines, setDeadlines] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDeadline, setEditingDeadline] = useState(null);
  const [formData, setFormData] = useState({ name: '', task: '', dueDate: '' });
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Load from localStorage or use mock data
    const saved = localStorage.getItem('deadlines');
    if (saved) {
      setDeadlines(JSON.parse(saved));
    } else {
      setDeadlines(mockDeadlines);
      localStorage.setItem('deadlines', JSON.stringify(mockDeadlines));
    }
  }, []);

  useEffect(() => {
    // Update current time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Save to localStorage whenever deadlines change
    if (deadlines.length > 0) {
      localStorage.setItem('deadlines', JSON.stringify(deadlines));
    }
  }, [deadlines]);

  const calculateTimeLeft = (dueDate) => {
    const now = currentTime.getTime();
    const due = new Date(dueDate).getTime();
    const diff = due - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isOverdue: true, totalMs: Math.abs(diff) };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isOverdue: false, totalMs: diff };
  };

  const getProgressColor = (timeLeft, deadline) => {
    if (timeLeft.isOverdue) return 'stroke-red-500';
    
    // Calculate progress based on elapsed time since creation
    const now = currentTime.getTime();
    const created = new Date(deadline.createdAt).getTime();
    const due = new Date(deadline.dueDate).getTime();
    
    const totalDuration = due - created;
    const elapsed = now - created;
    const progress = elapsed / totalDuration;
    
    if (progress < 0.5) return 'stroke-green-500';   // 0-50% elapsed
    if (progress < 0.9) return 'stroke-yellow-500';  // 50-90% elapsed
    return 'stroke-red-500';                         // 90%+ elapsed
  };

  const getProgressPercentage = (timeLeft, deadline) => {
    if (timeLeft.isOverdue) return 0;
    
    // Calculate progress based on elapsed time since creation
    const now = currentTime.getTime();
    const created = new Date(deadline.createdAt).getTime();
    const due = new Date(deadline.dueDate).getTime();
    
    const totalDuration = due - created;
    const elapsed = now - created;
    const progress = elapsed / totalDuration;
    
    // Return remaining percentage (100% - elapsed%)
    return Math.max(0, Math.min(100, (1 - progress) * 100));
  };

  const shouldPulse = (timeLeft, deadline) => {
    if (timeLeft.isOverdue) return true;
    
    // Calculate progress based on elapsed time since creation
    const now = currentTime.getTime();
    const created = new Date(deadline.createdAt).getTime();
    const due = new Date(deadline.dueDate).getTime();
    
    const totalDuration = due - created;
    const elapsed = now - created;
    const progress = elapsed / totalDuration;
    
    return progress >= 0.9; // Pulse when 90%+ elapsed
  };

  const formatDateTime = (date) => {
    const madridTime = new Date(date).toLocaleString('es-ES', {
      timeZone: 'Europe/Madrid',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
    return madridTime.replace(',', '').replace(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})/, '$3-$2-$1T$4:$5');
  };

  const openAddModal = () => {
    setEditingDeadline(null);
    setFormData({ name: '', task: '', dueDate: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (deadline) => {
    setEditingDeadline(deadline);
    setFormData({
      name: deadline.name,
      task: deadline.task || '',
      dueDate: formatDateTime(deadline.dueDate)
    });
    setIsModalOpen(true);
  };

  const handleSaveDeadline = () => {
    if (!formData.name.trim() || !formData.task.trim() || !formData.dueDate) return;

    if (editingDeadline) {
      // Update existing deadline (preserve createdAt)
      const updatedDeadline = {
        ...editingDeadline,
        name: formData.name.trim(),
        task: formData.task.trim(),
        dueDate: new Date(formData.dueDate).toISOString()
      };
      setDeadlines(prev => prev.map(d => d.id === editingDeadline.id ? updatedDeadline : d));
    } else {
      // Add new deadline (set createdAt to now)
      const deadline = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        task: formData.task.trim(),
        createdAt: new Date().toISOString(),
        dueDate: new Date(formData.dueDate).toISOString()
      };
      setDeadlines(prev => [...prev, deadline]);
    }

    setFormData({ name: '', task: '', dueDate: '' });
    setEditingDeadline(null);
    setIsModalOpen(false);
  };

  const handleDeleteDeadline = (id) => {
    setDeadlines(prev => prev.filter(d => d.id !== id));
  };

  const CircularProgress = ({ percentage, color, isOverdue, children }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="currentColor"
            strokeWidth="2"
            fill="transparent"
            className="text-slate-200"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`${color} transition-all duration-300 ${isOverdue ? 'animate-pulse' : ''}`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {children}
        </div>
      </div>
    );
  };

  const truncateText = (text, maxLength = 25) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 tracking-wide">DEADLINES</h1>
        </div>

        {/* Add Deadline Button */}
        <div className="flex justify-center mb-8">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={openAddModal}
                className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Deadline
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-slate-800">
                  {editingDeadline ? 'Edit Deadline' : 'Add New Deadline'}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="name" className="text-slate-700">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter person's name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="task" className="text-slate-700">Task / Description</Label>
                  <Textarea
                    id="task"
                    value={formData.task}
                    onChange={(e) => setFormData(prev => ({ ...prev, task: e.target.value }))}
                    placeholder="What needs to be done?"
                    className="mt-1 min-h-[80px]"
                  />
                </div>
                <div>
                  <Label htmlFor="dueDate" className="text-slate-700">Due Date & Time (Madrid)</Label>
                  <Input
                    id="dueDate"
                    type="datetime-local"
                    value={formData.dueDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button 
                    onClick={handleSaveDeadline}
                    className="flex-1 bg-slate-700 hover:bg-slate-800"
                    disabled={!formData.name.trim() || !formData.task.trim() || !formData.dueDate}
                  >
                    {editingDeadline ? 'Save Changes' : 'Add Deadline'}
                  </Button>
                  <Button 
                    onClick={() => setIsModalOpen(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Deadlines Grid */}
        {deadlines.length === 0 ? (
          <div className="text-center py-16">
            <Clock className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">Nothing to track yet</p>
            <p className="text-slate-400 text-sm mt-2">Add your first deadline to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-items-center">
            {deadlines.map((deadline) => {
              const timeLeft = calculateTimeLeft(deadline.dueDate);
              const progressColor = getProgressColor(timeLeft);
              const progressPercentage = getProgressPercentage(timeLeft);

              return (
                <Card 
                  key={deadline.id} 
                  className="relative p-6 bg-white shadow-md hover:shadow-xl hover:ring-2 hover:ring-slate-300 hover:ring-offset-2 transition-all duration-200 hover:scale-105 cursor-pointer border border-slate-200"
                  onClick={() => openEditModal(deadline)}
                >
                  {/* 3-dot menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-slate-600 hover:bg-slate-700 text-white rounded-full flex items-center justify-center text-xs transition-colors duration-200 shadow-md"
                      >
                        <MoreVertical className="w-3 h-3" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                      <DropdownMenuItem 
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditModal(deadline);
                        }}
                        className="cursor-pointer"
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteDeadline(deadline.id);
                        }}
                        className="cursor-pointer text-red-600 focus:text-red-600"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <div className="flex flex-col items-center space-y-4">
                    {/* Circular Progress */}
                    <CircularProgress 
                      percentage={progressPercentage} 
                      color={progressColor}
                      isOverdue={timeLeft.isOverdue}
                    >
                      <Clock className="w-6 h-6 text-slate-600 mb-1" />
                      <div className="text-center">
                        <div className="text-xs font-mono text-slate-700">
                          {timeLeft.isOverdue ? (
                            <span className="text-red-600 font-semibold">OVERDUE</span>
                          ) : (
                            `${timeLeft.days}d ${timeLeft.hours}h`
                          )}
                        </div>
                        <div className="text-xs font-mono text-slate-500">
                          {timeLeft.isOverdue ? '' : `${timeLeft.minutes}m ${timeLeft.seconds}s`}
                        </div>
                      </div>
                    </CircularProgress>

                    {/* Name and Task */}
                    <div className="text-center">
                      <h3 className="font-semibold text-slate-800 text-lg">{deadline.name}</h3>
                      {deadline.task && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <p className="text-xs text-slate-600 mt-1 cursor-help">
                              {truncateText(deadline.task)}
                            </p>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>{deadline.task}</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                      <p className="text-xs text-slate-500 mt-1">
                        {new Date(deadline.dueDate).toLocaleDateString('es-ES', {
                          timeZone: 'Europe/Madrid',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
    </TooltipProvider>
  );
};

export default DeadlineTracker;