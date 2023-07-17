import React from 'react'
import Link from 'next/link';
const Form = ({type,
post,
setPost,
submitting,
handleSubmit}) => {
    return (
        <section className='w-full max-w-full flex-start flex-col'>
        <h1 className='head_text text-left'>
        <span className='blue_gradient'>
        {type} Post
        </span>
        </h1>
        <p className="desc text-left max-w-md">
            {type} and share amazing propmts with the world and let you imagination run wild with AI-popwered platform
        </p>
        <form className="w-full max-w-2xl flex-col gap-7 mt-10 glassmorphism"  onSubmit={handleSubmit}>
        <label>
            <span className='font-satoshi font-semibold text-base text-gray-700'>Your AI Prompt</span>
        
        <textarea value={post.prompt}  onChange={(e)=> setPost({
            ...post,
            prompt: e.target.value
        })}
            placeholder='Write your prompt here'
            className='form_textarea '
            required
        />
        </label>
        <label>
            <span className='font-satoshi font-semibold text-base text-gray-700'>Tag {" "}
                <span className='font-normal'>(#product, #webdevelopment, #idea) </span>
            </span>
        
        <input value={post.tag}  onChange={(e)=> setPost({
            ...post,
            tag: e.target.value
        })}
            placeholder='#tag'
            className='form_input '
        />
        </label>
        <div className="flex-end mx-3 mb-4 gap-4 ">
            <Link href={"/"}>
                Cancel
            </Link>
            <button type="submit" className="black_btn px-5 py-1.5 tex-sm  rounded-full text-white">
            {submitting ? type + "..." : type }
            </button>
        </div>
        </form>
        </section>
    )
}

export default Form;