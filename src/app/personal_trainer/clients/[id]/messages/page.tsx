'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft, 
  Send, 
  MessageSquare,
  CheckCircle,
  AlertCircle,
  ThumbsUp,
  Target,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';
import { TrainerMessage } from '@/lib/types';

// Mock messages - would come from API in real app
const mockMessages: TrainerMessage[] = [
  {
    id: 'msg-1',
    clientId: 'client-1',
    trainerId: 'trainer-1',
    message: 'Great job on completing Week 5! Your squat form has improved significantly. Focus on keeping your core tight during the heavier sets next week.',
    timestamp: Date.now() - 2 * 60 * 60 * 1000,
    type: 'feedback',
    workoutReference: {
      programSlug: 'sbd-powerbuilding',
      week: 5,
      day: 1,
      exerciseName: 'Back Squat'
    }
  },
  {
    id: 'msg-2',
    clientId: 'client-1',
    trainerId: 'trainer-1',
    message: 'Remember to warm up properly before your deadlift sessions. Take your time with the mobility work!',
    timestamp: Date.now() - 24 * 60 * 60 * 1000,
    type: 'correction'
  },
  {
    id: 'msg-3',
    clientId: 'client-1',
    trainerId: 'trainer-1',
    message: 'You are crushing it! 5-day streak is amazing. Keep up the consistency! 💪',
    timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000,
    type: 'motivation'
  }
];

const messageTypeStyles = {
  feedback: { bg: 'bg-blue-50', border: 'border-blue-200', icon: CheckCircle, iconColor: 'text-blue-500' },
  correction: { bg: 'bg-orange-50', border: 'border-orange-200', icon: AlertCircle, iconColor: 'text-orange-500' },
  motivation: { bg: 'bg-green-50', border: 'border-green-200', icon: ThumbsUp, iconColor: 'text-green-500' },
  general: { bg: 'bg-gray-50', border: 'border-gray-200', icon: MessageSquare, iconColor: 'text-gray-500' }
};

function MessageBubble({ message }: { message: TrainerMessage }) {
  const style = messageTypeStyles[message.type];
  const Icon = style.icon;

  return (
    <div className={`p-4 rounded-lg ${style.bg} ${style.border} border`}>
      <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 mt-0.5 ${style.iconColor}`} />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs">
              {message.type}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {new Date(message.timestamp).toLocaleString('id-ID')}
            </span>
          </div>
          
          {message.workoutReference && (
            <div className="mb-2 text-xs text-muted-foreground">
              Re: {message.workoutReference.week ? `Week ${message.workoutReference.week} ` : ''}
              Day {message.workoutReference.day}
              {message.workoutReference.exerciseName && ` - ${message.workoutReference.exerciseName}`}
            </div>
          )}
          
          <p className="text-sm">{message.message}</p>
        </div>
      </div>
    </div>
  );
}

export default function ClientMessagesPage() {
  const params = useParams();
  const [messages, setMessages] = useState<TrainerMessage[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [messageType, setMessageType] = useState<TrainerMessage['type']>('general');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    setIsLoading(true);
    
    const message: TrainerMessage = {
      id: `msg-${Date.now()}`,
      clientId: params.id as string,
      trainerId: 'trainer-1', // Would come from auth in real app
      message: newMessage,
      timestamp: Date.now(),
      type: messageType
    };
    
    setMessages(prev => [...prev, message]);
    setNewMessage('');
    setMessageType('general');
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Section className="pt-24">
      <Container>
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/personal_trainer/clients/${params.id}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Client
              </Link>
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">Messages</h1>
              <p className="text-muted-foreground">
                Chat dengan Budi Santoso
              </p>
            </div>
          </div>

          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Chat History
              </CardTitle>
            </CardHeader>
            
            {/* Messages Area */}
            <CardContent className="flex-1 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </CardContent>

            {/* Message Input */}
            <div className="border-t p-4 space-y-3">
              <div className="flex gap-2">
                <Select value={messageType} onValueChange={(value) => setMessageType(value as TrainerMessage['type'])}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                    <SelectItem value="motivation">Motivation</SelectItem>
                    <SelectItem value="correction">Correction</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-2">
                <Textarea
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 min-h-[60px] max-h-[120px]"
                />
                <Button 
                  onClick={handleSendMessage} 
                  disabled={!newMessage.trim() || isLoading}
                  className="self-end"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground">
                Press Enter to send, Shift+Enter for new line
              </p>
            </div>
          </Card>

          {/* Quick Message Templates */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Quick Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 md:grid-cols-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setNewMessage('Great work on today\'s session! Keep up the consistency 💪')}
                >
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  General Praise
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setNewMessage('Remember to focus on form over weight. Quality reps are key!')}
                >
                  <Target className="h-4 w-4 mr-2" />
                  Form Reminder
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setNewMessage('How are you feeling about the program so far? Any questions or concerns?')}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Check-in
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setNewMessage('You\'re making excellent progress! I can see the improvement in your numbers.')}
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Progress Update
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </Section>
  );
}