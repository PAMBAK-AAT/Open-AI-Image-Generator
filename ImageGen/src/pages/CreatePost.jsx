

import React , { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { preview } from '../assets'
import { getRandomPrompt } from '../utils'
import { FormField , Loader } from '../components'


const CreatePost = () => {

  // it helps to navigate to the homepage if once prompt is created.
  const navigate = useNavigate();

  const [form , setForm] = useState({
    name: '',
    prompt: '',
    photo: ''
  })

  // This is needed when we are sending request to our api and waiting for response.
  const [genImage , setGenImage] = useState(false);
  const [loading , setLoading] = useState(false);

  const generateImage = async () => {
    if (form.prompt) {
        try {
            setGenImage(true);
            const response = await fetch('http://localhost:8080/api/v1/dalle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: form.prompt }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            const data = await response.json();
            setForm({ ...form, photo: `data:image/png;base64,${data.photo}` });
        } catch (error) {
            // console.error('Error:', error);
            alert(error.message || 'An error occurred');
        } finally {
            setGenImage(false);
        }
    } else {
        alert('Please enter a prompt');
    }
  };

  const handleSubmit = async (ele) => {
    ele.preventDefault();

    if (form.prompt && form.photo) {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/api/v1/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            await response.json();
            navigate('/');
        } catch (error) {
            console.error('Error:', error);
            alert(error.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    } else {
        alert('Please enter a prompt and generate an image through Open-AI API ...');
    }
  };


  const handleChange = (ele) => {
    setForm({ ...form , [ele.target.name]: ele.target.value })
  }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm( {...form , prompt: randomPrompt});
  }

  return (
    <section className='max-w-7xl mx-4 my-8 '>

      {/* Description */}
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>
            Create
        </h1>
        <p className='mt-2 text-[#666e75] text-[20px] max-w-[800px]'>Create imaginative and visually stunning images through DALL-E-AI and share them with the community</p>
      </div>

      {/* Form fields */}
      <form className='mt-10 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField 
            LabelName="Your name"
            type="text"
            name="name"
            placeholder="Mohammad Arshad"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField 
            LabelName="Prompt"
            type="text"
            name="prompt"
            placeholder="Make picture of Mosque in a desert with full of People attending prayer!"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img 
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {/* When Image start generating... */}
            {genImage && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}

          </div>
        </div>

        <div className="mt-5 flex gap-5">
            <button
              type="button"
              onClick={generateImage}
              className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto  px-5 py-2.5 text-center"
            >
              {genImage ? 'Generating...' : 'Generate'}
            </button>
        </div>

        <div className="mt-10">
            <p className="mt-2 text-[#666e75] text-[15px]">Once you have created the image you want , you can share it with others in the community</p>
            <button
              type="submit"
              className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto  px-5 py-2.5 text-center"
            >
              {loading ? 'Sharing ...' : 'Share with the community'}
            </button>
        </div>
      </form>

    </section>
  )
}

export default CreatePost
