import { Alert, Button, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || "https://techtales-11.onrender.com"; 

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
        setLoading(false);
        return setError("User is not authenticated. Please log in.");
      }

      console.log("📢 Request Payload:", { ...formData, userId: currentUser?._id });

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
  <option value="angular">Angular</option>
  <option value="vuejs">Vue.js</option>
  <option value="nodejs">Node.js</option>
  <option value="expressjs">Express.js</option>
  <option value="mongodb">MongoDB</option>
  <option value="mysql">MySQL</option>
  <option value="postgresql">PostgreSQL</option>
  <option value="firebase">Firebase</option>
  <option value="docker">Docker</option>
  <option value="kubernetes">Kubernetes</option>
  <option value="cloud-computing">Cloud Computing</option>
  <option value="aws">AWS</option>
  <option value="azure">Azure</option>
  <option value="gcp">Google Cloud Platform (GCP)</option>
  <option value="blockchain">Blockchain</option>
  <option value="cybersecurity">Cybersecurity</option>
  <option value="devops">DevOps</option>
  <option value="machine-learning">Machine Learning</option>
  <option value="deep-learning">Deep Learning</option>
  <option value="data-science">Data Science</option>
  <option value="ai">Artificial Intelligence (AI)</option>
  <option value="web-development">Web Development</option>
  <option value="mobile-development">Mobile Development</option>
  <option value="android">Android Development</option>
  <option value="ios">iOS Development</option>
  <option value="flutter">Flutter</option>
  <option value="react-native">React Native</option>
  <option value="full-stack">Full-Stack Development</option>
  <option value="frontend">Frontend Development</option>
  <option value="backend">Backend Development</option>
  <option value="testing">Software Testing</option>
  <option value="ci-cd">CI/CD Pipelines</option>
  <option value="git">Git & GitHub</option>
  <option value="open-source">Open Source</option>
  <option value="programming">Programming</option>
  <option value="competitive-programming">Competitive Programming</option>
  <option value="algorithms">Algorithms & Data Structures</option>
  <option value="game-development">Game Development</option>
  <option value="iot">Internet of Things (IoT)</option>
  <option value="robotics">Robotics</option>
  <option value="ar-vr">Augmented Reality (AR) & Virtual Reality (VR)</option>
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
