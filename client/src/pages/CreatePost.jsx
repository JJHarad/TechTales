import { Alert, Button, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreatePost({ currentUser }) {
  const [formData, setFormData] = useState({ title: "", category: "", content: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ✅ Function to Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        return setError("User is not authenticated. Please log in.");
      }

      console.log("📢 Request Payload:", {
        ...formData,
        userId: currentUser?._id,
      });

      // ✅ Dynamic API URL for deployment
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

      const res = await fetch(`${API_URL}/api/post/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          userId: currentUser?._id,
        }),
      });

      const data = await res.json();
      console.log("📢 API Response:", data);

      setLoading(false);
      if (!res.ok) {
        return setError(data.message || "Failed to create post");
      }

      navigate('/');
    } catch (error) {
      console.error("❌ Error in handleSubmit:", error);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a Post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <Select
            value={formData.category}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, category: e.target.value }))
            }
          >
            <option value="">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
            <option value="nodejs">Node.js</option>
            <option value="cloud-computing">Cloud Computing</option>
            <option value="machine-learning">Machine Learning</option>
            <option value="data-science">Data Science</option>
            <option value="ai">Artificial Intelligence (AI)</option>
            <option value="web-development">Web Development</option>
          </Select>
        </div>

        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          value={formData.content}
          onChange={(value) => {
            setFormData((prev) => ({ ...prev, content: value }));
          }}
        />

        <Button type="submit" gradientDuoTone="purpleToPink">
          {loading ? "Publishing..." : "Publish"}
        </Button>

        {error && (
          <Alert className="mt-5" color="failure">
            {error}
          </Alert>
        )}
      </form>
    </div>
  );
}
