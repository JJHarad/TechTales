import toast from 'react-hot-toast';

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent successfully!');
  };

  return (
    <div className='min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3'>
      <h1 className='text-3xl font-semibold'>Contact Us</h1>
      <p className='text-md text-gray-500'>We'd love to hear from you!</p>

      {/* Contact Details */}
      <div className='w-full flex flex-col gap-4'>
        <div className='bg--200 p-4 rounded-lg w-full'>
          <h3 className='text-lg font-semibold'>Email Us</h3>
          <p>mrunaldeshmukh78@gmail.com</p>
        </div>

        <div className='bg--200 p-4 rounded-lg w-full'>
          <h3 className='text-lg font-semibold'>Live Chat</h3>
          <p>Chat with our team during business hours.</p>
        </div>
      </div>

      {/* Contact Form */}

    </div>
  );
}
