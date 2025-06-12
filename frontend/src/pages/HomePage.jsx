import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import NoteCard from '../components/NoteCard.jsx'
import NotesNotFound from '../components/NotesNotFound.jsx'

const HomePage = () => {
  const [isRateLimited,setIsRateLimited] = React.useState(false);
  const [notes,setNotes] = React.useState([]);
  const [loading,setLoading] = React.useState(true);
  
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/notes');
        const data = response.data;
        console.log(data);
        setNotes(data);
        setIsRateLimited(false);
      } catch (error) {
        console.error('Failed to fetch notes:', error);
        if(error.response && error.response.status === 429) {
          setIsRateLimited(true);
        }
        else {
          toast.error('Failed to fetch notes. Please try again later.');
        }
      } 
      finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
    <Navbar /> 
    {isRateLimited && <RateLimitedUI />}
    {notes.length === 0 && !isRateLimited && <NotesNotFound />}
    <div className="max-w-7xl mx-auto p-4 mt-6">
      {loading && <div className="text-center text-primary py-10">Loading notes...</div>}
      {
        notes.length>0 && !isRateLimited && 
        (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map(note => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}

          </div>
        )
      }
    </div>
    </div>
  )
}

export default HomePage
