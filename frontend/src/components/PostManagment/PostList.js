import { useState } from "react";
import AddPostForm from "./add_post_form";

export default function PostList() {
  const [posts, setPosts] = useState([
    {
      id: "001",
      postId: "P001",
      title: "Post Title 1",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      userId: "001",
      author: "Wayne Bruce",
      status: "Published",
    },
    {
      id: "002",
      postId: "P002",
      title: "Post Title 2",
      content: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      userId: "002",
      author: "Ragnor Lothbrok",
      status: "Draft",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

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

  const handleDelete = (postId) => {
    setPosts(posts.filter((post) => post.postId !== postId));
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Post Management</h1>
          <div className="flex items-center justify-between mb-6">
            <input
              placeholder="Search posts..."
              className="pl-4 pr-4 py-2 rounded-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200 w-full max-w-md"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              onClick={handleAddNewPost}
            >
              Add New Post
            </button>
          </div>
        </div>

        {/* Modal for Add or Edit Post */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-96 rounded-lg shadow-lg p-6 relative">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                onClick={() => setShowModal(false)}
              >
                ✖
              </button>
              <AddPostForm
                editMode={editMode}
                selectedPost={selectedPost}
                onClose={() => setShowModal(false)}
                setPosts={setPosts}
                posts={posts}
              />
            </div>
          </div>
        )}

        {/* Post List Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
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
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.map((post) => (
                <tr key={post.postId} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">{post.postId}</td>
                  <td className="px-6 py-4">{post.title}</td>
                  <td className="px-6 py-4">{post.author}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        post.status === "Published"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex gap-2 justify-end">
                    <button
                      className="text-blue-600 hover:underline flex items-center"
                      onClick={() => handleEdit(post)}
                    >
                      ✎ Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(post.postId)}
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
