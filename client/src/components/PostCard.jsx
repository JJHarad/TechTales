import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  if (!post || !post._id) {
    console.warn("⚠️ Invalid post data received in PostCard:", post);
    return null;
  }

  return (
    <div className='group relative w-full border border-teal-500 hover:border-2 h-[200px] overflow-hidden rounded-lg sm:w-[430px] transition-all p-4'>
      <Link to={`/post/${post.slug}`}>
        <h2 className='text-lg font-semibold line-clamp-2'>{post.title}</h2>
      </Link>
      <span className='italic text-sm'>{post.category || "Uncategorized"}</span>
      <Link
        to={`/post/${post.slug}`}
        className='text-teal-500 hover:underline text-sm mt-2 block'
      >
        Read article
      </Link>
    </div>
  );
}
