import { useState, useEffect } from "react";
import AddPostForm from "./add_post_form";
import EditPostForm from "./Edit_Post_Form"; // Import the EditPostForm

export default function PostList() {
  const [posts, setPosts] = useState([]); // State for posts
  const [users, setUsers] = useState([]); // State for users data
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  // Fetch posts and users from the backend API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch posts
        const postsResponse = await fetch("http://localhost:5000/api/posts");
        const postsData = await postsResponse.json();
        setPosts(postsData);

        // Fetch users
        const usersResponse = await fetch("http://localhost:5000/api/users");
        const usersData = await usersResponse.json();
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Fetch data only once on component mount

  const handleEdit = (post) => {
    setEditMode(true);
    setSelectedPost(post);
    setShowModal(true);
  };

  const handleAddNewPost = () => {
    setEditMode(false);
    setSelectedPost(null);
    setShowModal(true);
  };

  const handleDelete = async (postId) => {
    try {
      await fetch(`http://localhost:5000/api/posts/${postId}`, {
        method: "DELETE",
      });
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Function to get the author's name based on userId
  const getAuthorName = (userId) => {
    const user = users.find((user) => user._id === userId);
    return user ? user.username : "Unknown Author";
  };

  // Function to format the post creation date to "YYYY-MM-DD"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      <div className="max-w-full md:max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Post Management</h1>
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4 sm:gap-0">
            <input
              placeholder="Search posts..."
              className="pl-4 pr-4 py-2 rounded-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200 w-full sm:w-72"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition w-full sm:w-auto"
              onClick={handleAddNewPost}
            >
              Add New Post
            </button>
          </div>
        </div>

        {/* Modal for Add or Edit Post */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-full sm:w-96 rounded-lg shadow-lg p-6 relative">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                onClick={() => setShowModal(false)}
              >
                ✖
              </button>
              {/* Render EditPostForm when in edit mode, otherwise AddPostForm */}
              {editMode ? (
                <EditPostForm
                  selectedPost={selectedPost}
                  onClose={() => setShowModal(false)}
                  setPosts={setPosts}
                  posts={posts}
                />
              ) : (
                <AddPostForm
                  onClose={() => setShowModal(false)}
                  setPosts={setPosts}
                  posts={posts}
                />
              )}
            </div>
          </div>
        )}

        {/* Post List Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Post ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Created On
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.map((post) => (
                <tr key={post._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-900">{post._id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{post.caption}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {getAuthorName(post.user)} {/* Displaying author's name */}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {formatDate(post.createdAt)} {/* Displaying post creation date */}
                  </td>
                  <td className="px-6 py-4 text-right text-sm flex gap-2 justify-end">
                    <button
                      className="text-blue-600 hover:underline flex items-center"
                      onClick={() => handleEdit(post)}
                    >
                      ✎ Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(post._id)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
