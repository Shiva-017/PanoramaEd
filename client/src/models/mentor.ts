interface Mentor {
  _id: string;
  userId: string;
  name: string;
  email: string;
  specializations: string[];
  status: 'online' | 'busy' | 'offline';
  currentStudents: string[];
  maxConcurrentChats: number;
  rating: number;
  totalChats: number;
  bio: string;
  experience: string;
  languages: string[];
  availability?: {
    timezone: string;
    workingHours: {
      start: string;
      end: string;
    };
  };
  createdAt?: string;
  updatedAt?: string;
}
export default Mentor;