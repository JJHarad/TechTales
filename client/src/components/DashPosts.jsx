import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log("📢 Fetching dashboard posts for user:", currentUser?._id);

        const res = await fetch(`/api/post/getposts?userId=${currentUser?._id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ Send token
          },
        });

        const data = await res.json();
        console.log("📢 API Response:", data);

        if (!res.ok || !data.posts || data.posts.length === 0) {
          console.warn("❌ No posts found for this user");
          setUserPosts([]);
          return;
        }

        setUserPosts(data.posts);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      } catch (error) {
        console.error("❌ Error fetching posts:", error);
      }
    };

    if (currentUser?._id) {
      fetchPosts();
    }
  }, [currentUser?._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // ✅ Handle Post Deletion
  const handleDeletePost = async () => {
    setShowModal(false);
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("❌ No authentication token found.");
        return;
      }
  
      console.log(`📢 Sending DELETE request: /api/post/deletepost/${postIdToDelete}`);
  
      const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Ensure token is sent
        },
      });
  
      const data = await res.json();
      console.log("📢 Delete API Response:", data);
  
      if (!res.ok) {
        console.error(`❌ Delete failed: ${data.message}`);
        return;
      }
  
      // ✅ Remove the deleted post from UI
      setUserPosts((prev) => prev.filter((post) => post._id !== postIdToDelete));
      console.log("✅ Post deleted successfully!");
  
    } catch (error) {
      console.error("❌ Error deleting post:", error);
    }
  };
  
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3'>
      {currentUser?.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>Edit</Table.HeadCell>
            </Table.Head>

            <Table.Body className='divide-y'>
              {userPosts.map((post) => (
                <Table.Row key={post._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    <Link className='font-medium text-gray-900 dark:text-white' to={`/post/${post.slug}`}>
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    {/* ✅ Opens Confirmation Modal Instead of Directly Calling handleDeletePost */}
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post._id);
                      }}
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link className='text-teal-500 hover:underline' to={`/update-post/${post._id}`}>
                      Edit
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

          {showMore && (
            <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>
              Show more
            </button>
          )}
        </>
      ) : (
        <p className='text-center text-gray-500'>No posts found.</p>
      )}

      {/* ✅ Delete Confirmation Modal */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this post?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeletePost}>
                Yes, Delete
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
