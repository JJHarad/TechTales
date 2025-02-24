import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log("📢 Fetching recent posts: /api/post/getposts?limit=8");

        const res = await fetch('/api/post/getposts?limit=8');
        const data = await res.json();
        
        console.log("📢 API Response:", data);
        
        if (!res.ok || !data.posts || data.posts.length === 0) {
          setError("No posts found.");
          return;
        }
        
        setPosts(data.posts);
      } catch (error) {
        console.error("❌ Error fetching posts:", error);
        setError("Something went wrong.");
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      {/* Header Section */}
      <div className='flex flex-col items-center gap-6 px-6 py-20 max-w-5xl mx-auto text-center'>
  <h1 className='text-3xl font-bold leading-tight lg:text-5xl'>
    Explore the Future of Technology
  </h1>
  <p className='text-lg text-gray-600 dark:text-gray-300 max-w-3xl'>
    Stay ahead of the curve with in-depth analysis, tutorials, and insights into the world of Technology.
  </p>
  <Link
    to='/search'
    className='text-sm sm:text-base text-teal-500 font-bold hover:underline'
  >
    View all posts
  </Link>
</div>

      
      {/* Call to Action */}
      <div className='p-3 bg-amber-100 dark:bg-slate-700'>
        <CallToAction />
      </div>

      {/* Posts Section */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {error && <p className="text-center text-red-500">{error}</p>}
        
        {posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            
            {/* ✅ Grid Layout to Show 2 Posts Per Row (Center-Aligned) */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 justify-center mx-auto'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>

            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
