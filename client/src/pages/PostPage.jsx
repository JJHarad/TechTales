import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!postSlug) {
      setError("Post slug is missing.");
      return;
    }

    const fetchPost = async () => {
      try {
        setLoading(true);
        console.log(`📢 Fetching post: /api/post/getposts?slug=${postSlug}`);

        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();

        console.log("📢 API Response:", data);

        if (!res.ok || !data.posts || data.posts.length === 0) {
          console.error("❌ No posts found for slug:", postSlug);
          setError("Post not found.");
          return;
        }

        setPost(data.posts[0]);
      } catch (error) {
        console.error("❌ Error fetching post:", error);
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
        {post?.title || "Untitled"}
      </h1>
      <Link
        to={`/search?category=${post?.category}`}
        className='self-center mt-5'
      >
        <Button color='gray' pill size='xs'>
          {post?.category || "Uncategorized"}
        </Button>
      </Link>
      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <span>{post?.createdAt ? new Date(post.createdAt).toLocaleDateString() : "Unknown Date"}</span>
        <span className='italic'>
          {post?.content ? `${(post.content.length / 1000).toFixed(0)} mins read` : "Unknown"}
        </span>
      </div>
      <div
        className='p-3 max-w-2xl mx-auto w-full post-content'
        dangerouslySetInnerHTML={{ __html: post?.content || "<p>No content available.</p>" }}
      ></div>
      <div className='max-w-4xl mx-auto w-full'>
        <CallToAction />
      </div>
      {post?._id && <CommentSection postId={post._id} />}
    </main>
  );
}
