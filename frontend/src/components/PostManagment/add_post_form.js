import { useState } from "react";

export default function AddPostForm({ editMode, selectedPost, onClose, setPosts, posts }) {
  const [formData, setFormData] = useState({
    title: selectedPost?.title || "",
    content: selectedPost?.content || "",
    author: selectedPost?.author || "",
    status: selectedPost?.status || "Draft",
    postId: selectedPost?.postId || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      setPosts(posts.map((post) => (post.postId === formData.postId ? formData : post)));
    } else {
      setPosts([...posts, { ...formData, postId: `P${posts.length + 1}` }]);
    }
    onClose();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        {editMode ? "Edit Post Information" : "Add New Post"}
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter post title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            name="content"
            placeholder="Enter post content"
            value={formData.content}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Author</label>
          <input
            type="text"
            name="author"
            placeholder="Enter author name"
            value={formData.author}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition w-full"
        >
          {editMode ? "Update Post Information" : "Create New Post"}
        </button>
      </form>
    </div>
  );
}
